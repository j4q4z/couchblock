
updateTimer();
setInterval(updateTimer,1000);


function updateTimer(){
    const sessionTimeEnd = window.localStorage.getItem('sessionTimeEnd');

    if(sessionTimeEnd){
        let date = new Date();
        let currHours = date.getHours();
        let currMinutes = date.getMinutes();
        let endHours = parseInt(sessionTimeEnd.slice(0,2),10);
        let endMinutes = parseInt(sessionTimeEnd.slice(3,5),10);
        let hours = endHours - currHours;
        let minutes = endMinutes - currMinutes;
        let timeString;
        console.log(date);
        console.log(sessionTimeEnd);

        // e.g current time is 9:40 and end time is 9:30
        // time difference would be 0 hours and -10 minutes
        if (currHours<endHours || (currHours===endHours && currMinutes<endMinutes)){
            if(minutes<0){
              hours-=1;
              minutes+=60;  
            }
            minutes = minutes < 10 ? '0' + minutes:minutes;
            timeString = `${hours}h ${minutes}m`;
        }
        else{
            timeString = '00:00';
        }
        document.getElementById('countdown').innerText = timeString;
    }
    else{
        document.getElementById('countdown').innerText = '00:00';
    }

}
