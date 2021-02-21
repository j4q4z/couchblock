console.log("Background script running...");


chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log(request);
    let websiteArray = request.websiteArray;
    let sessionTimeEnd = request.sessionTimeEnd;

    chrome.webRequest.onBeforeRequest.addListener(
      function(details) {
        // check if session running
        console.log(details);
        const sessionRunning = checkTime(sessionTimeEnd);
        // check if the website should be blocked
        const websiteBlocked = checkWebsite(details.url,websiteArray);
        if(sessionRunning&&websiteBlocked){
            return {redirectUrl:chrome.runtime.getURL("HTML/redirect.html")};
        }
      },
      {urls: ["http://*/*","https://*/*"],types:["main_frame"]},
      ["blocking"]
    );
    return true;
  });




  function checkWebsite(currUrl,websiteArray){
    let websiteBlocked = true;
    // check if current website is allowed
    for(website of websiteArray){
            if(currUrl.indexOf(website)!=-1){
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
        sessionRunning = true;
    }
    return sessionRunning;

}
