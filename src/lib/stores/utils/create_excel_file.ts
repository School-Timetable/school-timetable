import { Workbook, type Row, type Worksheet, type BorderStyle } from 'exceljs';
import fs from 'file-saver';
import { get } from "svelte/store";
import { allClassrooms, allDaysOfWeek, allHoursOfDay, allProfessors, allSubjects } from '../global_store';
import { getProfessorTimetableOf, setSubject } from '$model/timetable/time-table';
import { Subject } from '$model/subject/subject';
import { HourOfDay } from '$model/timetable/hour-of-day';
import { DayOfWeek } from '$model/timetable/day-of-week';
import { getClassTimetableOf } from '$model/timetable/time-table'; 


const hoursPerDay = get(allHoursOfDay).length
const daysOfWeek = get(allDaysOfWeek).length
const professors = get(allProfessors).sort((a, b) => a.surname.value.localeCompare(b.surname.value))
const classes = get(allClassrooms).sort((a, b) => {
  if(a.section.value < b.section.value)
    return -1
  else if(a.section.value > b.section.value)
    return 1
  else if(a.year.value < b.year.value)
  return -1
  return 1
})


function decorateRow(row: Row, border: BorderStyle) {
  row.eachCell((cell) => {
    cell.border = {
      top: { style: border, color: { argb: 'FF000000' } },
      left: { style: border, color: { argb: 'FF000000' } },
      bottom: { style: border, color: { argb: 'FF000000' } },
      right: { style: border, color: { argb: 'FF000000' } }
    }
    cell.font = {
      bold: true,
      size: 13
    }
    cell.alignment = {
      horizontal: 'center'
    }
  });
}


function addHeader(worksheet: Worksheet) {
  
  let dayColumn = 2, hourColumn = 2
  let headerRow = worksheet.getRow(1)
  let secondHeaderRow = worksheet.getRow(2)

  for(let d = 0; d < daysOfWeek; d++) {
    headerRow.getCell(dayColumn).value = get(allDaysOfWeek)[d].label
    worksheet.mergeCells(1, dayColumn, 1, dayColumn + hoursPerDay - 1)
    dayColumn += hoursPerDay 

    for(let h = 0; h < hoursPerDay; h++) {
      secondHeaderRow.getCell(hourColumn).value = h + 1
      hourColumn++
    }
  }
  decorateRow(headerRow, 'thick')
  decorateRow(secondHeaderRow, 'thick') 
}


function fillProfessorTimetable(worksheet: Worksheet) {
  professors.forEach((prof, index) => {
    let professorRow = []
    professorRow.push(prof.surname + " " + prof.name)
    let professorTimetable = getProfessorTimetableOf(prof)

    for (let i = 0; i < daysOfWeek; i++) {
      for (let j = 0; j < hoursPerDay; j++) {
        if (professorTimetable?.values[i][j] instanceof Subject) {
          // @ts-ignore
          professorRow.push(professorTimetable!.values[i][j]?.schoolClass.toString());
        } else {
          professorRow.push(" ");
        }
      }
    }
    let profRow = worksheet.addRow(professorRow);
    decorateRow(profRow, 'thin')
  });
}


function fillClassTimetable(worksheet: Worksheet) {
  classes.forEach((schoolClass, index) => {
    let classRow = []
    classRow.push(schoolClass.toString())
    let classTimetable = getClassTimetableOf(schoolClass)

    for (let i = 0; i < daysOfWeek; i++) {
      for (let j = 0; j < hoursPerDay; j++) {
        if (classTimetable?.values[i][j] instanceof Subject) {
          // @ts-ignore
          let abbr = classTimetable!.values[i][j].abbreviation.value
          classRow.push(abbr);
        } else {
          classRow.push(" ");
        }
      }
    }
    let clRow = worksheet.addRow(classRow);
    decorateRow(clRow, 'thin')
  });
}


function decorateTimetable(worksheet: Worksheet, columnWidth: number, numItems: number) {
  worksheet.columns.forEach((sheetColumn) => {
    sheetColumn.width = columnWidth;
  });

  for(let i = 0; i < numItems; i++) {
    worksheet.getCell(i + 3, 1).border = {
      top: { style: 'thick', color: { argb: 'FF000000' } },
      left: { style: 'thick', color: { argb: 'FF000000' } },
      bottom: { style: 'thick', color: { argb: 'FF000000' } },
      right: { style: 'thick', color: { argb: 'FF000000' } }
    }

    for (let d = 0; d < daysOfWeek; d++) {
      worksheet.getCell(i + 3, (d * hoursPerDay) + hoursPerDay + 1).border = {
        right: { style: 'thick', color: { argb: 'FF000000' } },
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
      }
    }
  }
} 


function buildWorksheet(workbook: Workbook, title: string, timetableType: string) {
  let worksheet = workbook.addWorksheet(title)
  addHeader(worksheet)

  if(timetableType === "Professor") {
    fillProfessorTimetable(worksheet)
    decorateTimetable(worksheet, 5, professors.length)
    
    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(1).alignment = {
      horizontal: 'left'
    }
  }
  else if(timetableType === "Class") {
    fillClassTimetable(worksheet)
    decorateTimetable(worksheet, 10, classes.length)
  }
}


export function createExcel(timetableType: string) {
  // PER TESTARE L'EXPORT IN EXCEL, DECOMMENTARE QUESTE RIGHE
  /*setSubject(0, 0, get(allSubjects)[1])
  setSubject(5, 3, get(allSubjects)[2])
  setSubject(2, 2, get(allSubjects)[0])
  setSubject(2, 5, get(allSubjects)[3])
  setSubject(1, 4, get(allSubjects)[0])*/

  let date: Date = new Date(Date.now())
  let month: number = date.getMonth() + 1
  let filename: string = timetableType + "Timetable_" + 
  date.getFullYear() + "_" + 
  month + "_" + 
  date.getDate()

  let workbook = new Workbook()
  buildWorksheet(workbook, "Timetable", timetableType)

  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, filename + '.xlsx');
  })
}