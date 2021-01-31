console.log("Background script running...");


chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log(request);
    let websiteArray = request.websiteArray;
    let sessionTimeEnd = request.sessionTimeEnd;

    chrome.webRequest.onBeforeRequest.addListener(
      function(details) {
        // check if session running and to block website
        const sessionRunning = checkTime(sessionTimeEnd);
        const websiteBlocked = checkWebsite(details.url,websiteArray);
        if(sessionRunning&&websiteBlocked){
            console.log("BLOCK WEBSITE");
            return {redirectUrl:"http://127.0.0.1:5500/HTML/redirect.html"};
        }
      },
      {urls: ["<all_urls>"]},
      ["blocking"]
    );
    return true;
  });




  function checkWebsite(currUrl,websiteArray){
    let websiteBlocked = true;
    // check if current website is allowed
    for(website of websiteArray){
            if(currUrl.indexOf(website)!=-1){
                console.log("BLOCK REJECTED");
                websiteBlocked=false;
            }
        }
    return websiteBlocked;
  }
  
  
  
function checkTime(endTime){
    let sessionRunning = false;
    // Current time of day
    let date = new Date();

    let currHours = date.getHours();
    let currMinutes = date.getMinutes();
    let endHours = parseInt(endTime.slice(0,2),10);
    let endMinutes = parseInt(endTime.slice(3,5),10);



    // session still running, block website
    if(currHours<endHours || (currHours===endHours && currMinutes<endMinutes)){
        console.log("Session running");
        sessionRunning = true;
    }
    else{
    console.log("No session running");
    }
    return sessionRunning;

}
