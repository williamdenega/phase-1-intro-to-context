// Your code here
function createEmployeeRecord(arry){

    let worker = {
        firstName : arry[0],
        familyName: arry[1],
        title:arry[2],
        payPerHour :arry[3],
        timeInEvents : [],
        timeOutEvents : []
    }
    
    return worker
    
}


function createEmployeeRecords(arry){
   
    // let mySet = new Set()
    
    // for(arr of arry){
    //     mySet.add(arr[0])
    // }
    // let employeeRecords = Array.from(mySet)
    return arry.map(function(person){
        return createEmployeeRecord(person)
    })
}



function createTimeInEvent(record,date){
    
    //let type = 'TimeIn'
    let dateArry = date.split(" ", 2)

    record.timeInEvents.push({
        type:"TimeIn",
        hour: parseInt(dateArry[1],10),
        date: dateArry[0]
    })
    
    return record
}

function createTimeOutEvent(record,date){
    let dateArry = date.split(" ",2)
 
    record.timeOutEvents.push({
   type:"TimeOut",
    hour: parseInt(dateArry[1],10),
    date: dateArry[0]
    })
    return record
}

function hoursWorkedOnDate(record,workDate){

    let clockIn =  record.timeInEvents.find(function(e){
        return e.date === workDate
    })
    let clockOut = record.timeOutEvents.find(function(e){
        return e.date === workDate
    })
    return (clockOut.hour-clockIn.hour)/100

}

function wagesEarnedOnDate(record, workDate){

    let wage = hoursWorkedOnDate(record,workDate)*record.payPerHour

   // let hourlyPay = record.payPerHour

   

    //totalPay = hourlyPay*hours

    return parseFloat(wage.toString())

}

function allWagesFor(employee){

    //employee.timeInEvents.forEach(day => wagesEarnedOnDate(record,day))
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = dates.reduce(function(memo, d ){
        return memo + wagesEarnedOnDate(employee,d)
    }, 0)
    return payable
}

function calculatePayroll(arry){
    return arry.reduce(function(total,employee){
     return total + allWagesFor(employee)
    },0)

    


}