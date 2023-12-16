export function TemporarySaving(): void {
    const timetableString = localStorage.getItem('timetable.tdf') || "";
    localStorage.setItem('timetable_tmp.tdf',timetableString);
}

export function confirmSaving(): void {
    if(localStorage.getItem("timetable_tmp.tdf")!="")
    {
        localStorage.removeItem("timetable_tmp.tdf");
    }
}
  
export function revertChanges(): void {
    const timetableString = localStorage.getItem('timetable_tmp.tdf') || "";

    if(timetableString!="")
    {

        localStorage.setItem("timetable.tdf",timetableString);
        localStorage.removeItem("timetable_tmp.tdf");
        window.location.reload();
    }
}

export function deleteTmp(): void {
    const timetableString = localStorage.getItem('timetable_tmp.tdf') || "";

    if(timetableString!="")
    {

        localStorage.removeItem("timetable_tmp.tdf");
    }
}
