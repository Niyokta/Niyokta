export function returnMonthByNumber(temp:number):String{
    if(temp==1) return "January";
    else if(temp===2) return "February";
    else if(temp===3) return "March";
    else if(temp===4) return "April";
    else if(temp===5) return "May";
    else if(temp===6) return "June";
    else if(temp===7) return "July";
    else if(temp===8) return "August";
    else if(temp===9) return "September";
    else if(temp===10) return "October";
    else if(temp===11) return "November";
    else if(temp===12) return "December";
    else return "Invalid Month"
}

export function returnFullDate(date:number,month:number,year:number){
    return `${date} ${returnMonthByNumber(month)} ${year}`
}