const timer = (id, deadline) =>{

    const timeRemain = (endTime) => {
        const t = Date.parse(endTime) - new Date(),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours =  Math.floor((t / 1000 / 60 / 60) % 24),
            days = Math.floor(t / 1000 / 60 / 60 / 24);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const addZero = (num) => {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    };

    const setTimer = (selector, endTime) => {
        const timer = document.querySelector(selector),
            daysSelector = timer.querySelector('#days'),
            hoursSelector = timer.querySelector('#hours'),
            minutesSelector = timer.querySelector('#minutes'),
            secondsSelector = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTimer, 1000);

        updateTimer();
        
        function updateTimer() {
            const t = timeRemain(endTime);

            daysSelector.textContent = addZero(t.days);
            hoursSelector.textContent = addZero(t.hours);
            minutesSelector.textContent = addZero(t.minutes);
            secondsSelector.textContent = addZero(t.seconds);

            if (t.total < 0) {
                daysSelector.textContent = "00";
                hoursSelector.textContent = "00";
                minutesSelector.textContent = "00";
                secondsSelector.textContent = "00";
                clearInterval(timeInterval);
            }
        }
    };

    setTimer(id, deadline);
};

export default timer;