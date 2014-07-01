window.onload = function() {
    var endDate = new Date(new Date().getTime() + 60 * 60 * 24 * 1000);
    endDate.setHours(0, 0, 0, 0);
    startCountDown(el, endDate.getTime());
};


function startCountDown (el, endDate) {
  
  var ht = endDate;

  setInterval(function() {

  }, 1000);  
};