
const convertDate = (unix_timestamp) =>{
    let date = new Date(unix_timestamp*1000);
    let month = convertMonth(date.getMonth())
    let finalDate = `${month} ${date.getDay()} - ${date.getHours()}:${10 > date.getMinutes()?"0"+date.getMinutes(): date.getMinutes()}`
    return finalDate
}

const convertMonth = (month) =>{
    switch (month){
        case 0:
            return 'Jan'
        case 1:
            return 'Feb'
        case 2: 
            return 'Mar'
        case 3:
            return 'Apr'
        case 4:
            return 'May'
        case 5:
            return 'Jun' 
        case 6:
            return 'Jul'
        case 7:
            return 'Aug'
        case 8:
            return 'Sep'
        case 9:
            return 'Out'
        case 10:
            return 'Nov'
        case 11:
            return 'Dec'
    }
}

const float = (money) =>{
    return parseFloat(money)
}

module.exports = {convertDate, float}