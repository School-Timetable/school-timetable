import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type { PageOrientation, PageSize } from "pdfmake/interfaces";
import { allDaysOfWeek, allHoursOfDay, allProfessors, allSubjects } from "../global_store";
import { classTimetableMap, professorTimetableMap, setSubject } from "$model/timetable/time-table";
import { get } from "svelte/store";
import { HourOfDay } from "$model/timetable/hour-of-day";
import { DayOfWeek } from "$model/timetable/day-of-week";
import { Subject } from "$model/subject/subject";


const PAGESIZE: PageSize = "A3";
const PAGEORIENTATION: PageOrientation = "landscape";

allDaysOfWeek.set([DayOfWeek.of(0, "Monday"), DayOfWeek.of(1, "Tuesday"), DayOfWeek.of(2, "Wednsday"), DayOfWeek.of(3, "Thursday"), DayOfWeek.of(4, "Friday")]);
allHoursOfDay.set([HourOfDay.of(0, "1"), HourOfDay.of(1, "2"), HourOfDay.of(2, "3"), HourOfDay.of(3, "4"), HourOfDay.of(4, "5"), HourOfDay.of(5, "6")]);
pdfMake.vfs = pdfFonts.pdfMake.vfs;

let headerRowDays: any[] = [{text: '    ', rowSpan: 2, colSpan: 1}];
let headerRowHours: any[] = [''];
let colWidth: any[] = ["auto"];
let bodyRows: any[] = [];


get(allProfessors).forEach(professor => {
  if( professorTimetableMap.has(professor.id) ) {
    let profRow = [];
    profRow.push(professor.name + " " + professor.surname);
    let profTimetable = professorTimetableMap.get(professor.id);

    for (let i = 0; i < get(allDaysOfWeek).length; i++) {
      for (let j = 0; j < get(allHoursOfDay).length; j++) {
        if ( profTimetable?.values[i][j] instanceof Subject) {
          // @ts-ignore
          profRow.push(profTimetable!.values[i][j]?.schoolClass.year.value.toString() + profTimetable!.values[i][j]?.schoolClass.section.value.toString());
        } else {
          profRow.push(' ');
        }
      }
  }

    bodyRows.push(profRow);
  }
});

function createHeaderRow() {
    get(allDaysOfWeek).forEach(day => {
        headerRowDays.push({text: day.label, rowSpan: 1, colSpan: get(allHoursOfDay).length, alignment: 'center'});
        for (let i = 0; i < get(allHoursOfDay).length -1; i++) {
          headerRowDays.push('')
        }
    });

    let hours: any[] = [];
    let widths: string[] = [];

    get(allHoursOfDay).forEach(hour => {
        hours.push(hour.label);
        widths.push("*");
    });

    for (let i = 0; i < get(allDaysOfWeek).length; i++) {
        for (let j = 0; j < get(allHoursOfDay).length; j++) {
          headerRowHours.push({text: hours[j], alignment: 'center'});
        }

        colWidth.push(...widths);
    }
}


export function createPDF() {

  createHeaderRow();
    
    let docDefinition = {
        pageSize: PAGESIZE,
        pageOrientation: PAGEORIENTATION,
        content: [
          {
            table: {
              //how many rows should be treated as headers
              headerRows: 2,
              widths: colWidth,
      
              body: [
                headerRowDays,
                headerRowHours,
                ...bodyRows
              ]
            }
          }
        ]
      };



    pdfMake.createPdf(docDefinition).open();
}