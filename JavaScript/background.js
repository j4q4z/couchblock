console.log("Background script running...");


  chrome.webRequest.onBeforeRequest.addListener(
    async function(details) {
      // check if session running and to block website
      const sessionRunning = await checkTime();
      const websiteBlocked = await checkWebsite(details.url);
      if(sessionRunning&&websiteBlocked){
          console.log("BLOCK WEBSITE");
          let p = new Promise(function(resolve,reject){
            resolve({redirectUrl:"http://127.0.0.1:5500/HTML/redirect.html"})
          })
          let resolve = await p;
          return resolve;
      }
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
  );




  async function check(){
    const sessionRunning = await checkTime();
    const websiteBlocked = await checkWebsite(details.url);
    if(sessionRunning && websiteBlocked){
        return true;
    }
    else{
      return false;
    }
  }




async function checkWebsite(currUrl){
  let p = new Promise(function(resolve,reject){
    chrome.storage.sync.get(['array'],function(data){
        	let websiteBlocked = true;
          const websiteArray = data;
          // check if current website is allowed
              for(website of websiteArray.array){
                  if(currUrl.indexOf(website)!=-1){
                      console.log("BLOCK REJECTED");
                      blocked=false;
                  }
              }
          resolve(websiteBlocked);
      });
  })
  let resolve = await p;
  return resolve;

}



async function checkTime(){
  let p = new Promise(function(resolve,reject){
    // see if work session expired
    chrome.storage.sync.get(['endTime'],function(data){
        let sessionRunning = false;
        // Current time of day
        let date = new Date();
        // console.log(date);

        let currHours = date.getHours();
        let currMinutes = date.getMinutes();
        let endTime = data.endTime;
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
        resolve(sessionRunning)
      })
  })
    let resolve = await p;
    return resolve;
}



// function checkTime(){
//   // see if work session expired
//   let sessionRunning = false;
//   chrome.storage.sync.get(['endTime'],function(data){
//       // Current time of day
//       let date = new Date();
//       // console.log(date);

//       let currHours = date.getHours();
//       let currMinutes = date.getMinutes();
//       let endTime = data.endTime;
//       let endHours = parseInt(endTime.slice(0,2),10);
//       let endMinutes = parseInt(endTime.slice(3,5),10);

//       // console.log(currHours);
//       // console.log(currMinutes);
//       // console.log();
//       // console.log(endHours);
//       // console.log(endMinutes);


//       // session still running, block website
//       if(currHours<endHours || (currHours===endHours && currMinutes<endMinutes)){
//           console.log("Session running");
//           sessionRunning = true;
//       }
//     })

//     return sessionRunning;
