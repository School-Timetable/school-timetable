import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import type { PageOrientation, PageSize } from "pdfmake/interfaces";

let a: PageSize = "A3";
let b: PageOrientation = "landscape";

let headerRow = [ '1', '2', '3', '4', '5','6', '7'];


export function createPDF() {
    
    let docDefinition = {
        pageSize: a,
        pageOrientation: b,
        content: [
          {
            table: {
              //how many rows should be treated as headers
              headerRows: 2,
              widths: [ '*', '*', '*', '*', '*', '*', '*'],
      
              body: [
                headerRow,
                [ 'a', '1', '', '3', '3',' ', '' ],
                [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' , 'ss', ' ', ' ']
              ]
            }
          }
        ]
      };


    //@ts-ignore
    pdfMake.createPdf(docDefinition, pdfFonts.pdfMake.vfs).open();
}