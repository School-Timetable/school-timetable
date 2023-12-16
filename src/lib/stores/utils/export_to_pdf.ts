import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import type { PageOrientation, PageSize } from "pdfmake/interfaces";
import { allClassrooms, allDaysOfWeek, allHoursOfDay, allProfessors, allSubjects, classTimeTableMap, professorTimeTableMap } from "../global_store";
import { get } from "svelte/store";
import { Subject } from "$model/subject/subject";

const PAGEORIENTATION: PageOrientation = "landscape";


pdfMake.vfs = pdfFonts.pdfMake.vfs;



function createProfessorView() {
  
  let bodyRows: any[] = [];
  
  get(allProfessors).forEach(professor => {
    if( get(professorTimeTableMap).has(professor.id) ) {
      let profRow = [];
      profRow.push(professor.name + " " + professor.surname);
      let profTimetable = get(professorTimeTableMap).get(professor.id);
      
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
  
  return bodyRows;
}

function createClassView() {
    
    let bodyRows: any[] = [];
    
    get(allClassrooms).forEach(classroom => {
      if(get(classTimeTableMap).has(classroom.id) ) {
        let classRow = [];
        classRow.push(classroom.year.value.toString() + classroom.section.value.toString());
        let classTimetable = get(classTimeTableMap).get(classroom.id);
        
        for (let i = 0; i < get(allDaysOfWeek).length; i++) {
          for (let j = 0; j < get(allHoursOfDay).length; j++) {
            if ( classTimetable?.values[i][j] instanceof Subject) {
              // @ts-ignore
              classRow.push(classTimetable!.values[i][j]?.abbreviation.value);
            } else {
              classRow.push(' ');
            }
          }
        }
        
        bodyRows.push(classRow);
      }
    });
    return bodyRows;
}

function createHeaderRow() {

  let headerRowDays: any[] = [{text: '    ', rowSpan: 2, colSpan: 1}];
  let headerRowHours: any[] = [''];
  let colWidth: any[] = ["auto"];

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

    return {headerRowDays, headerRowHours, colWidth};
}

export function createPDFProfView() {
  createPDF(createProfessorView());
}

export function createPDFClassView() {
  createPDF(createClassView());
}


function createPDF(bodyRows: any) {

  let PAGESIZE: PageSize = "A3";
    if(get(allDaysOfWeek).length * get(allHoursOfDay).length > 30)
      PAGESIZE = "A2";

  let data = createHeaderRow();
    
    let docDefinition = {
        pageSize: PAGESIZE,
        pageOrientation: PAGEORIENTATION,
        content: [
          {
            table: {
              //how many rows should be treated as headers
              headerRows: 2,
              widths: data.colWidth,
      
              body: [
                data.headerRowDays,
                data.headerRowHours,
                ...bodyRows
              ]
            }
          }
        ]
      };



    pdfMake.createPdf(docDefinition).open();

}