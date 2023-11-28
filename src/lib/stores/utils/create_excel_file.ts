import { Workbook, type Row, type Worksheet } from 'exceljs';
import fs from 'file-saver';
import { get } from "svelte/store";
import { allClassrooms, allDaysOfWeek, allHoursOfDay, allProfessors, allSubjects } from '../global_store';
import { professorTimetableMap, setSubject } from '$model/timetable/time-table';
import { Subject } from '$model/subject/subject';
import { HourOfDay } from '$model/timetable/hour-of-day';
import { DayOfWeek } from '$model/timetable/day-of-week';


// allDaysOfWeek.set([DayOfWeek.of(0, "Monday"), DayOfWeek.of(1, "Tuesday"), DayOfWeek.of(2, "Wednesday"), DayOfWeek.of(3, "Thursday"), DayOfWeek.of(4, "Friday"), DayOfWeek.of(5, "Saturday")]);
// allHoursOfDay.set([HourOfDay.of(0, "1"), HourOfDay.of(1, "2"), HourOfDay.of(2, "3"), HourOfDay.of(3, "4"), HourOfDay.of(4, "5"), HourOfDay.of(5, "6")]);

const hoursPerDay = get(allHoursOfDay).length
const daysOfWeek = get(allDaysOfWeek).length
const professors = get(allProfessors).sort((a, b) => a.surname.value.localeCompare(b.surname.value))


function decorateRow(row: Row) {
  row.eachCell((cell) => {
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF000000' } },
      left: { style: 'thin', color: { argb: 'FF000000' } },
      bottom: { style: 'thin', color: { argb: 'FF000000' } },
      right: { style: 'thin', color: { argb: 'FF000000' } }
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
  decorateRow(headerRow)
  decorateRow(secondHeaderRow) 
}


function buildWorksheet(workbook: Workbook, title: string) {
  let worksheet = workbook.addWorksheet(title)
  addHeader(worksheet)

  professors.forEach((prof, index) => {
    let professorRow = []
    professorRow.push(prof.surname + " " + prof.name)
    let professorTimetable = professorTimetableMap.get(prof.id)

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
    decorateRow(profRow)
  });

  worksheet.columns.forEach((sheetColumn) => {
    sheetColumn.width = 5;
  });

  worksheet.getColumn(1).width = 30;
  worksheet.getColumn(1).alignment = {
    horizontal: 'left'
  }
}

export function createExcel() {
  /*setSubject(0, 0, get(allSubjects)[1])
  setSubject(5, 3, get(allSubjects)[2])
  setSubject(2, 2, get(allSubjects)[0])
  setSubject(2, 5, get(allSubjects)[4])
  setSubject(1, 4, get(allSubjects)[0])*/

  let date: Date = new Date(Date.now())
  let month: number = date.getMonth() + 1
  let filename: string = "Timetable_" + 
  date.getFullYear() + "_" + 
  month + "_" + 
  date.getDate()

  let workbook = new Workbook()
  console.log("timetable")
  console.log(professorTimetableMap)
  buildWorksheet(workbook, "Timetable")

  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    fs.saveAs(blob, filename + '.xlsx');
  })
}