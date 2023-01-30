const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const getDate = (month, day, year) => {
    const date = new Date(`${month}-${day}-${year}`);
    return {
        date,
        isSameMonth: month-1 === date.getMonth(),
    }
}

const getDaysAmount = (month, year) => {
    const { isSameMonth: has31Days } = getDate(month, 31, year);
    const { isSameMonth: has30Days } = getDate(month, 30, year);
    const { isSameMonth: has29Days } = getDate(month, 29, year);
    return has31Days ? 31 : has30Days ? 30 : has29Days ? 29 : 28;
}

const getCalendarInfo = (year) => (
    months.map((_, index) => {
        // Month
        const iterationMonth = months[index];
        const iterationMonthNumber = index + 1;
        const iterationPreviousMonth = months[index-1] ? months[index-1] : 'december';
        const iterationNextMonth = months[iterationMonthNumber] ? months[iterationMonthNumber] : 'january';
        const iterationNextMonthNumber = months.findIndex((v) => v === iterationNextMonth) + 1;
        const firstDayName = days[getDate(iterationMonthNumber, 1, year).date.getDay()]; 
        const daysAmount = getDaysAmount(iterationMonthNumber, year);
        const lastDayName = days[getDate(iterationMonthNumber, daysAmount, year).date.getDay()]; 

        // Grid
        const gridStartsAt = getDate(iterationMonthNumber, 1, year).date.getDay() + 1;
        const emptyGridItems = (7 * 6) - daysAmount;

        const fillStartValues = [];
        const previousMonthNumber = months.findIndex((v) => v === iterationPreviousMonth) + 1;
        const previousMonthDaysAmount = getDaysAmount(previousMonthNumber, iterationMonthNumber === 1 ? year - 1 : year);

        for (let number = 0; number < gridStartsAt - 1; number++) {
            fillStartValues.push(previousMonthDaysAmount-number);
        }
        
        const startEmptyGridItems = {
            amount: gridStartsAt - 1,
            fillValues: fillStartValues.map((day, i) => {
                const fillYear = iterationMonthNumber === 1 ? year - 1 : year;
                return getDate(previousMonthNumber, day, fillYear).date.toISOString()
            })
        }
        
        const fillEndValues = [];
        for(let number = 0; number < (emptyGridItems - startEmptyGridItems.amount); number++) {
            fillEndValues.push(number + 1);
        }

        const endEmptyGridItems = {
            amount: emptyGridItems - startEmptyGridItems.amount,
            fillValues: fillEndValues.map((day, i) => {
                const fillYear = iterationMonthNumber === 12 ? year + 1 : year;
                return getDate(iterationNextMonthNumber, day, fillYear).date.toISOString();
            })
        }

        const gridInfo = {
            year,
            month: iterationMonth,
            firstDayName,
            lastDayName,
            daysAmount,
            gridInformation: {
                gridStartsAt,
                emptyGridItems,
                startEmptyGridItems,
                endEmptyGridItems,
            }
        }

        return gridInfo;
    })
)

const monthDaysInfo = getCalendarInfo(2023)
console.log(monthDaysInfo);