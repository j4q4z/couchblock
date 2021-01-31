
// Array containing all the websites
let websiteArray = [];


class Ui {
    
    // adds new website input to table
    static addwebsite(e){
        let tableBody = document.getElementById("website-loc");
        let row = tableBody.insertRow(-1);
        row.innerHTML = 
        `<td class = "website-input"><input type = 'text' placeholder = "Enter website"></input></td>
        <td class = "button-data"><h4 class = delete-button>X<\h4></td>`;
    }

    // deletes website row
    static deletewebsite(e){
        if (e.target.classList.contains('delete-button')){
            // Delete row
            e.target.parentElement.parentElement.remove();
        }
    }

    static addedWebsiteSuccess(){

    }
}

class data{

    // submit the website and session time
    static submit(e){
        // submit the websites
        let rows = document.querySelector('table').rows;
        for(let i = 1;i<rows.length;i++){
            let website = rows[i].children[0].firstChild.value;
            websiteArray.push(website);
        }
        // chrome.storage.sync.set({'array':websiteArray});
        console.log("website Stored");

        // submit the session time
        const sessionTimeEnd = document.getElementById("time-input").value;
        // chrome.storage.sync.set({'endTime':sessionTimeEnd});
        data.deleteTableBody();
        data.deleteTimeInput();


        chrome.runtime.sendMessage({websiteArray: websiteArray,sessionTimeEnd:sessionTimeEnd},response => console.log(response));
        
    }

    static deleteTableBody(){
        document.getElementById('website-loc').innerHTML = " ";
    }

    static deleteTimeInput(){
        document.getElementById('time-input').value = "";
    }
    
    static addCurrentWebsite(){
        console.log(location);
        websiteArray.push(location.hostname);
        Ui.addedWebsiteSuccess();
    }

      
}

// event listeners

document.getElementById("add-button").addEventListener("click",Ui.addwebsite)

document.querySelector('table').addEventListener('click',Ui.deletewebsite);

document.getElementById('submit-websites').addEventListener('click',data.submit)

// document.getElementById('add-current').addEventListener('click',data.addCurrentWebsite)



