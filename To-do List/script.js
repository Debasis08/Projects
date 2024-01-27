const house = document.querySelector(".house");
const firstDiv = document.querySelector(".firstDiv");
const input = document.querySelector(".input");
const addButton = document.querySelector(".addButton");
const memoBox = document.getElementById("memoBox");
const clear = document.querySelector(".clear");

let count = function () {
    
    if (memoBox.children.length > 0) {
        memoBox.style.display = "flex";
        clear.style.display = "flex";
    } else {
        memoBox.style.display = "none";
        clear.style.display = "none";
    }
} 

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask(); // Call the addTask function
        event.preventDefault(); // Prevent form submission (if applicable)
    }
});

function addTask() {


    
    if(input.value.trim() === "") {
        alert("You must write something !");
    } else {

        // Div creation
        let memo = document.createElement("div");
        memo.className = "memo";

        // console.log("Step-1");

        // Checkbox creation
        let check = document.createElement("input");
        check.type = "checkbox";
        check.className = "check";

        // console.log("Step-2");

        // Delete Creation
        let del = document.createElement("button");
        del.className = "delete";

        // console.log("Step-3");

        // Delete Icon Creation & Placement
        let img = document.createElement("img");
        img.src = "delete.png";
        del.appendChild(img);
        del.onclick = function() {
        del.parentElement.remove (memo);
        // memoBox.removeChild(memo);
        count(); //children count
        }

        // console.log("Step-4");

        //Input value Placement in SPAN
        let span = document.createElement("span");
        span.className = "span";
        span.textContent = input.value;
        span.contentEditable = "true";
        span.style.fontSize = "1.5vw";
        span.style.overflow = "auto";
        
        span.addEventListener(("click"), function(){
            span.style.outline = "double";
            span.style.outlineColor = "lightblue";
            span.style.transition = "0.5s";
        })
        

        // console.log("Step-5");


        //sorting
        memo.appendChild(check);
        memo.appendChild(span);
        memo.appendChild(del);

        // console.log("Step-6");

        memoBox.appendChild(memo);
        // console.log("Step-7");

        count(); //children count

    }

    // console.log("Step-8");

    input.value = "";
    saveData();
}


clear.addEventListener("click", () => {
    memoBox.innerHTML = ""; // Clear the contents of memoBox
    count();
});


function saveData() {
    localStorage.setItem("data", memoBox.innerHTML);
}


function showTask() {
    memoBox.innerHTML = localStorage.getItem("data");
}

showTask();