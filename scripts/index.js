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
            remaining["innerHTML" || "textContent"] = timer.remainingTime();
            remaining.className = "remaining";
            label.className = "label";
        } else {
            remaining["innerHTML" || "textContent"] = "ENDED!";
            label["innerHTML" || "textContent"] = "";
            clearInterval(intervalId);
        }
    }, 1000);
};

(function(w) {    

    var Timer = w.Timer = function Timer(endDate) {
            if (!(this instanceof arguments.callee))
                return new Timer(endDate);
            this.endDate = endDate
            this.end = false;
        }

    Timer.prototype.remainingTime = function remainingTime() { 

        var secondsInMillis = 1000;
        var minutesInMillis = secondsInMillis * 60;
        var hoursInMillis = minutesInMillis * 60;
        var daysInMillis = hoursInMillis * 24;

        var diff = this.endDate.getTime()
            - new Date().getTime();
        
        var hrs = Math.floor(diff / hoursInMillis);
        var mins = Math.floor((diff % hoursInMillis) / minutesInMillis);
        var secs = Math.floor((diff % minutesInMillis) / secondsInMillis);

        if (hrs == 0 && mins == 0 && secs == 0) {
            this.end = true;
        }

        return hrs + ":" + mins + ":" + secs;
    }

    Timer.prototype.ended = function() {
        return this.end;
    }
})(window);