window.onload = function() {
    //this could be any date in the future. 
    //just using tomorrow's date as an example;
    var endDate = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
    endDate.setHours(0, 0, 0, 0);

    var timer = new Timer(endDate);

    var remaining = document.querySelector(".remaining");
    var label = document.querySelector(".label");

    var intervalId = setInterval(function() {
        if (!timer.ended()) {
            setText(remaining, timer.remainingTime());
            remaining.className = "remaining";
            label.className = "label";
        } else {
            setText(remaining, "ENDED!");
            setText(label, "");
            clearInterval(intervalId);
        }
    }, 1000);

};

//browser-related property-detection
function setText(el, text) {
    while (element.firstChild !== null)
        element.removeChild(element.firstChild);
    element.appendChild(document.createTextNode(text));
}

/*
 * created a Timer object inside a
 * closure to protect its properties from outside
 */
(function(w) {
    var Timer = w.Timer = function Timer(endDate) {

        //check if it is a date object, if not, fallback to tomorrow's date.
        Object.prototype.toString.call(endDate) !== "[object Date]" ? endDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24) : endDate;

        // checks if the Timer is called using its constructor,
        // if not call explicitly the constructor and return it
        if (!(this instanceof arguments.callee))
            return new Timer(endDate);

        this.endDate = endDate
        this.end = false;
    }

    // returns the remaining time from the endDate
    // to currentDate in the form of 'hours:minutes:seconds'
    Timer.prototype.remainingTime = function remainingTime() {
        var secondsInMillis = 1000,
            minutesInMillis = secondsInMillis * 60,
            hoursInMillis = minutesInMillis * 60,
            daysInMillis = hoursInMillis * 24;

        var diff = this.endDate.getTime() - new Date().getTime();

        var hrs = Math.floor(diff / (hoursInMillis));
        var mins = Math.floor((diff % hoursInMillis) / minutesInMillis);
        var secs = Math.floor((diff % minutesInMillis) / secondsInMillis);

        if (hrs <= 0 && mins <= 0 && secs <= 0)
            this.end = true;

        return hrs + ":" + mins + ":" + secs;
    }

    Timer.prototype.ended = function() {
        return this.end;
    }
})(window);
