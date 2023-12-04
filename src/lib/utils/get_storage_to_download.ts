import { browser } from "$app/environment";


export function readStoragetoDownload(): string[]
{
    if(browser)
    {
        let arrayData: string[] = [] ;
        let dataToSave= localStorage.getItem("data.tdf") || "";
        let timeTableToSave= localStorage.getItem("timetable.tdf") || "";
        arrayData.push(dataToSave);
        arrayData.push(timeTableToSave);
    
        return arrayData;
    }
    else return []
}
export function writeToStorage(datatdf:string,timetable:string): void
{
    if(browser && datatdf!="" && timetable !="")
    {
        localStorage.setItem("data.tdf",datatdf);
        localStorage.setItem("timetable.tdf",timetable)
    }

}

export function checkBase64(str1: string, str2: string): boolean {
    const regex = /([A-Z]{1}\:(.*\;)+.*\n*)/;
  
    try {
      str1 = atob(str1);
      str2 = atob(str2);
  
  
      const isValidStr1 = regex.test(str1);
      const isValidStr2 = regex.test(str2);
      console.log(isValidStr1,isValidStr2);
  
  
      return isValidStr1 && isValidStr2;
    } catch (error) {
      return false;
    }
}  


