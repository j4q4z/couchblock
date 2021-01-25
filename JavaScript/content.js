// // Script that is run upon page reload

// console.log("content.js running...");

// // website to redirect to
// const redirectHref = "http://127.0.0.1:5500/redirect.html";


// // see if work session expired
// chrome.storage.sync.get(['endTime'],function(data){

//     // Current time of day
//     let date = new Date();
//     // console.log(date);

//     let currHours = date.getHours();
//     let currMinutes = date.getMinutes();
//     let endTime = data.endTime;
//     let endHours = parseInt(endTime.slice(0,2),10);
//     let endMinutes = parseInt(endTime.slice(3,5),10);

//     console.log(currHours);
//     console.log(endHours);

//     console.log(currMinutes);
//     console.log(endMinutes);

//     // session still running, block website
//     if(currHours<endHours || currHours===endHours && currMinutes<endMinutes){
//         blockWebsite();
//     }

   

// })

// function blockWebsite(){

//     chrome.storage.sync.get(['array'],function(data){
//         const websiteArray = data;
//         console.log(websiteArray);
//         let websiteAllowed = false;
        
//         // check if current website is allowed
//         console.log(location.hostname);
//         if (websiteArray){
//             for(website of websiteArray.array){
//                 if(location.hostname===website){
//                     websiteAllowed = true;
//                 }
//             }
//         }


//         // website isnt allowed
//         if(!websiteAllowed && location.href != redirectHref){
//             location.replace(redirectHref);
//         }

//     });
// }
