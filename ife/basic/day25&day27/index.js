function main() {
    init();
}

function leftX(str, num, char = " ") {
    if(typeof str === "number") {
        str = `${str}`;
    }
    let arr = str.split("");
    let result;
    if(arr.length === num) {
        result = str;
    } else if(arr.length < num) {
        while(arr.length < num) {
            arr.unshift(char);
        }
        result = arr.join("");

    } else if (arr.length > num) {
        while(arr.length > num) {
            arr.shift();
        }
        result = arr.join("");
    }
    return result;
}


function isLeapYear(year) {
    return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
}

function showReuslt(dtime, selectedTime) {
    let resultEl = document.querySelector(".result");
    resultEl.innerHTML = `
            现在距离 ${selectedTime.year}年${selectedTime.month}月${selectedTime.day}日 ${leftX(selectedTime.sec, 2, 0)}:${leftX(selectedTime.hour, 2, 0)}:${leftX(selectedTime.hour, 2, 0)} 还有 ${dtime.day} 天 ${dtime.hour} 小时 ${dtime.min} 分 ${dtime.sec} 秒
    `;
}

function init() {

    function Page() {
        this.yearEl = document.querySelector(".year");
        this.monthEl = document.querySelector(".month");
        this.dayEl = document.querySelector(".day");
        this.hourEl = document.querySelector(".hour");
        this.minEl = document.querySelector(".min");
        this.secEl = document.querySelector(".sec");
        this.selectedDate = {
            year: 2000,
            month: 1,
            day: 1,
            hour: 0,
            min: 0,
            sec: 0,
        };
    }

    Page.prototype.makeSelect = function(name, startValue, optionNums) {
        let options = "";
        for(let i = 0; i <= optionNums; i++) {
            let value = startValue + i;
            let op = `<option value="${value}">${value}</option>`;
            options += op;
        }
        let select = `${name}
        <select id="${name}">${options}</select>
        `;
        return select;
    };

    Page.prototype.selectedOption = function(selectEl) {
        let ops = selectEl.querySelectorAll("option");
        for(let o of ops) {
            if(o.selected) {
                return o;
            }
        }
    };

    Page.prototype.notify = function(target) {
        if(target === "month") {
            let currentMonth = page.selectedDate.month;
            let thirtyOneDays = [1, 3, 5, 7, 8, 10, 12];
            let numOfDays;
            if(thirtyOneDays.indexOf(currentMonth) > -1) {
                numOfDays = 31;
            } else if (currentMonth === 2) {
                let currentYear = page.selectedDate.year;
                if(isLeapYear(currentYear)) {
                    numOfDays = 29;
                } else {
                    numOfDays = 28;
                }
            } else {
                numOfDays = 30;
            }
            page.dayEl.innerHTML = page.makeSelect("day-select", 1, numOfDays -1);
        } else if (target === "year") {
            let year = page.selectedDate.year;
            if(isLeapYear(year)) {
                page.notify("month");
            }
        }
    };


    let page = new Page();

    page.yearEl.innerHTML = page.makeSelect("year-select", 2000, 50);
    page.monthEl.innerHTML = page.makeSelect("month-select", 1, 11);
    page.dayEl.innerHTML = page.makeSelect("day-select", 1, 29);
    page.hourEl.innerHTML = page.makeSelect("hour-select", 0, 23);
    page.minEl.innerHTML = page.makeSelect("min-select", 0, 59);
    page.secEl.innerHTML = page.makeSelect("sec-select", 0, 59);

    let namesOfEl = ["year", "month", "day", "hour", "min", "sec"];

    for(let name of namesOfEl) {
        page[name + "El"].onchange = function(e) {
            let selectEl = e.target;
            let op = page.selectedOption(selectEl);
            page.selectedDate[name] = parseInt(op.value);
            page.notify(name);
        };
    }

    (function wrap(){
        function helpCalcYearDays(yearA, yearB) {
            let days = 0;
            let dif = yearA - yearB;
            if(dif < 0) {
                for(let i = 0; i < -dif; i++) {
                    days += helpDaysOfYear(yearB - i);
                }
                days = -days;
            } else if (dif > 0) {
                for(let i = 0; i < dif; i++) {
                    days += helpDaysOfYear(yearB + i);
                }
            }
            return days;
        }

        function helpCalcMonthDays(monthA, yearA, monthB, yearB) {
            let dif = monthA - monthB;
            let days = 0;
            if(dif < 0) {
                for(let i = 0; i < -dif; i++) {
                    days += helpDaysOfMonth(monthB - i, yearB);
                }
                days = -days;
            } else if (dif > 0) {
                for(let i = 0; i < dif; i++) {
                    days += helpDaysOfMonth(monthB + i, yearB);
                }
            }
            return days;
        }


        function helpDaysOfYear(year) {
            return isLeapYear(year) ? 366 : 355;
        }

        function helpDaysOfMonth(mon, year) {
            let thirtyOneDays = [1, 3, 5, 7, 8, 10, 12];
            if(thirtyOneDays.indexOf(mon) > -1) {
                return 31;
            } else if(mon === 2) {
                return isLeapYear(year) ? 29 : 28;
            } else {
                return 30;
            }
        }

        setTimeout(function() {
            let date = new Date();
            let cy = date.getFullYear();
            let cm = date.getMonth() + 1;
            let cd = date.getDate();
            let ch = date.getHours();
            let cmin = date.getMinutes();
            let cs = date.getSeconds();
            
            let daysOfdy = helpCalcYearDays(page.selectedDate.year, cy);
            let daysOfdm = helpCalcMonthDays(page.selectedDate.month, page.selectedDate.year, cm, cy);
            let dd = -(cd - page.selectedDate.day);
            let allDiffDays = daysOfdy + daysOfdm + dd;

            let dh = page.selectedDate.hour - ch;
            if(dh < 0 && allDiffDays > 0) {
                allDiffDays -= 1;
                dh = 24 + dh;
            }

            let dmin = page.selectedDate.min - cmin;
            if(dmin < 0 && dh > 0) {
                dh -= 1;
                dmin = 60 + dmin;
            }

            let ds = -(cs - page.selectedDate.sec);
            if(ds < 0 && dmin > 0) {
                dmin -=1;
                ds = 60 + ds;
            }
            


            
            showReuslt({
                day: allDiffDays,
                hour: dh,
                min: dmin,
                sec: ds,
            }, page.selectedDate);
            
            wrap();
        }, 1000);
    })();

}

main();