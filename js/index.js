/**
 * a simple cross-browser prop detection function for
 * setting a textnode to an element.
 *
 * @param {[type]} el
 * @param {[type]} text
 */

function setText(el, text) {
    while (el.firstChild !== null)
        el.removeChild(el.firstChild);
    el.appendChild(document.createTextNode(text));
}

/**
 * This is just an exact copy of the library I created:
 * More info here: https://github.com/alexcera/c4timer.js
 * C4Timer is just a cheesy name, don't mind it :)
 */
(function(w) {

    var _endDate = tomorrow(),
        _onTick = function() {},
        _onEnd = function() {},
        _ended = false;

    function tomorrow() {
        var tomorrowMidnight = new Date(new Date().getTime() + 86400000);
        tomorrowMidnight.setHours(0, 0, 0, 0);
        return tomorrowMidnight;
    }

    function validDate(d) {
        if (!d || Object.prototype.toString.call(d) !== "[object Date]")
            return tomorrow();
        else
            return d;
    }

    function checkEnded(isEnded) {
        _ended = isEnded;
    }

    function remainingTime() {
        var diff = _endDate.getTime() - new Date().getTime();

        var hrs = Math.floor(diff / 3600000);
        var mins = Math.floor((diff % 3600000) / 60000);
        var secs = Math.floor((diff % 60000) / 1000);

        checkEnded(hrs <= 0 && mins <= 0 && secs <= 0);

        return hrs + ":" + mins + ":" + secs;
    }

    var C4Timer = w.C4Timer = function(props) {
        if (props) {
            _endDate = validDate(props.endDate);
            _onTick = props.onTick || _onTick;
            _onEnd = props.onEnd || _onEnd;
            _ended = false;
        }
    };

    C4Timer.prototype.start = function() {
        var id = setInterval(function() {
            if (!_ended) {
                _onTick(remainingTime());
            } else {
                _onEnd();
                clearInterval(id);
            }
        }, 1000);
    };

    return C4Timer;
})(window);


window.onload = function() {

    //if you don't wanna wait until midnight,
    //you can pass this variable to the endDate which is currently set to null
    var testEndDate = new Date(new Date().getTime() + 10000);

    var remaining = document.querySelector(".remaining"),
        label = document.querySelector(".label"),
        c4Timer = new C4Timer({
            endDate: null,
            onTick: function(remainingTime) {
                setText(remaining, remainingTime);
                remaining.className = "remaining";
                label.className = "label";
            },
            onEnd: function() {
                setText(remaining, "ENDED!");
                setText(label, "");
            }
        });

    c4Timer.start();
};
