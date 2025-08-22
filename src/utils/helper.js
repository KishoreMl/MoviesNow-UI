export function checkDay(day, month) {
        const months = {1: 31,2: 28, 3: 31,4: 30, 5: 31, 6: 30, 7: 31,8: 31, 9: 30, 10: 31, 11: 30, 12: 31 }
        if (day > months[month])
            return 1;
        else
            return day;
    }
    
export function checkMonth(day, month) {
        const months = {1: 31,2: 28,3: 31, 4: 30,5: 31,6: 30,7: 31,8: 31,9: 30,10: 31, 11: 30, 12: 31}
        if (day >= months[month])
        {
            if (month === 12)
                return 1;
            else
                return month + 1;
        }
        else
            return month;
}
    
export function assignMonth(month) {
       const months = {
            1: "JAN",
            2: "FEB",
            3: "MAR",
            4: "APR",
            5: "MAY",
            6: "JUN",
            7: "JUL",
            8: "AUG",
            9: "SEP",
            10: "OCT",
            11: "NOV",
            12: "DEC"
        }
        return months[month]
    }
