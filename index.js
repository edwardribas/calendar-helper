const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const getDate = (month, day, year) => {
    const date = new Date(`${month}-${day}-${year}`);
    return {
        date,
        isSameMonth: month-1 === date.getMonth(),
    }
}

const getDayOfTheWeek = (month, day, year) => days[getDate(month, day, year).date.getDay()];

const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

const getCalendarInfo = (year) => {
    if (!(/\d+/g.test(year)) || typeof year !== "number")
        throw new SyntaxError("Parameter `year` must be a number.");

    if (!year || year > 2500)
        throw new RangeError("The number must be between 1 and 2500.");

    return months.map((_, index) => {
        // Iteration month
        const iterationMonth = months[index];
        const iterationMonthNumber = index + 1;

        // Previous month
        const iterationPreviousMonth = months[index-1] ? months[index-1] : 'december';
        const iterationPreviousMonthNumber = months.findIndex((v) => v === iterationPreviousMonth) + 1;
        const previousMonthDaysAmount = getDaysInMonth(iterationPreviousMonthNumber, iterationMonthNumber === 1 ? year - 1 : year);

        // Next month
        const iterationNextMonth = months[iterationMonthNumber] ? months[iterationMonthNumber] : 'january';
        const iterationNextMonthNumber = months.findIndex((v) => v === iterationNextMonth) + 1;

        // Days
        const firstDayName = getDayOfTheWeek(iterationMonthNumber, 1, year);
        const iterationMonthDaysAmount = getDaysInMonth(iterationMonthNumber, year);
        const lastDayName = getDayOfTheWeek(iterationMonthNumber, iterationMonthDaysAmount, year);

        // Grid
        const gridStartsAt = getDate(iterationMonthNumber, 1, year).date.getDay() + 1;
        const gridEmptySlots = (7 * 6) - iterationMonthDaysAmount;
        const gridStartValues = [];
        const gridEndValues = [];

        for (let number = 0; number < gridStartsAt - 1; number++) {
            gridStartValues.push(previousMonthDaysAmount-number);
        }
        
        const gridStartEmptySlots = {
            amount: gridStartsAt - 1,
            fillValues: gridStartValues.map((day) => {
                const fillYear = iterationMonthNumber === 1 ? year - 1 : year;
                return getDate(iterationPreviousMonthNumber, day, fillYear).date.toISOString()
            })
        }
        
        for(let number = 0; number < (gridEmptySlots - gridStartEmptySlots.amount); number++) {
            gridEndValues.push(number + 1);
        }

        const gridEndEmptySlots = {
            amount: gridEmptySlots - gridStartEmptySlots.amount,
            fillValues: gridEndValues.map((day, i) => {
                const fillYear = iterationMonthNumber === 12 ? year + 1 : year;
                return getDate(iterationNextMonthNumber, day, fillYear).date.toISOString();
            })
        }

        return {
            year,
            month: iterationMonth,
            firstDayName,
            lastDayName,
            daysAmount: iterationMonthDaysAmount,
            gridInformation: {
                gridStartsAt,
                gridEmptySlots,
                gridEndEmptySlots,
                gridStartEmptySlots,
            }
        }
    })
}

console.log(getCalendarInfo(2023));