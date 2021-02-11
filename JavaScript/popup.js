
// Array containing all the websites
let websiteArray = [];
let sessionTimeEnd;


class Ui {
    
    // adds new website input to table
    static addwebsite(e){
        let list = document.getElementById("website-list");
        let li = document.createElement("li");
        li.innerHTML = 
        `<input type = 'text' placeholder = "Enter website"></input><h4 class = delete-button>X<\h4>`;
        list.appendChild(li);
    }

    // deletes website row
    static deletewebsite(e){
        if (e.target.classList.contains('delete-button')){
            // Delete row
            e.target.parentElement.remove();
        }
    }

    static success(){
        if(!document.querySelector("#success-message")){
            let successElement = document.createElement('label');
            successElement.setAttribute("for", "submit-websites");
            successElement.id = "success-message";
            successElement.className = "message";
            successElement.innerText = "Session has started!";
            document.getElementById("submit-websites").before(successElement);
            setTimeout(()=>{
                successElement.remove();
            },3000);
        }

    }

    static error(message){
        if(!document.querySelector("#error-message")){
            let errorElement = document.createElement('label');
            errorElement.setAttribute("for", "submit-websites");
            errorElement.id = "error-message";
            errorElement.className = "message";
            errorElement.innerText = message;
            document.getElementById("submit-websites").before(errorElement);
            setTimeout(()=>{
                errorElement.remove();
            },3000);
        }
    }
}

class data{

    // submit the website and session time
    static submit(e){        
        // submit the websites
        let elements = document.querySelector('#website-list').getElementsByTagName("li");
        for(let i = 0;i<elements.length;i++){
            let website = elements[i].firstChild.value;
            if (website==""){
                Ui.error("Please fill all website boxes");
                return;
            }
            websiteArray.push(website);
        }

        // submit the session time
        sessionTimeEnd = document.getElementById("time-input").value;
        // check for empty time input
        if(sessionTimeEnd==""){
            Ui.error("Please give a valid time")
            return;
        }

        window.localStorage.setItem('sessionTimeEnd',sessionTimeEnd);

        data.deleteTableBody();
        data.deleteTimeInput();
        chrome.runtime.sendMessage({websiteArray: websiteArray,sessionTimeEnd:sessionTimeEnd},response => console.log(response));
        Ui.success();
        
    }

    static deleteTableBody(){
        document.getElementById('website-list').innerHTML = "";
    }

    static deleteTimeInput(){
        document.getElementById('time-input').value = "";
    }
    
    static addCurrentWebsite(){
        console.log(location);
        websiteArray.push(location.hostname);
    }

    
    
}
// event listeners

document.getElementById("add-button").addEventListener("click",Ui.addwebsite)

document.querySelector('ul').addEventListener('click',Ui.deletewebsite);

document.getElementById('submit-websites').addEventListener('click',data.submit)




