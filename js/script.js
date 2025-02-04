/* 
const myHeading = document.querySelector("h1");

myHeading.textContent = "Hello World";


document.querySelector("html").addEventListener("click", () => {
    alert("Ouch! Stop poking me!");
});


const myImage = document.querySelector("img");

myImage.addEventListener("click", () =>{
    const mySrc = myImage.getAttribute("src");

    if(mySrc === "images/headshot.jpg"){
        myImage.setAttribute("src", "images/headshot2.jpg");
    } else {
        myImage.setAttribute("src", "image/headshot.jpg");
    }
});

let myButton = document.querySelector("button");

let myHeading = document.querySelector("h1");

function setUserName() {
    const myName = prompt("Please Enter your Name");

    if (!myName){
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = `Welcome to Shanas Page, ${myName}`;
    }
}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");

    myHeading.textContent = `Welcome to Shanas Page ${storedName}`;
}

myButton.addEventListener("click", () =>{
    setUserName();
});
*/


$(function(){

    let menuPath = window.location.pathname.includes("/pages/") ? "../menu.html" : "menu.html"

    $("#menu-container").load(menuPath, function(){
        const menu = document.getElementById("side-menu");
        const menuBtn = document.getElementById("menu-btn");
        const closeBtn = document.getElementById("close-btn");

        // Open Menu
        menuBtn.addEventListener("click", () => {
            menu.style.width = "250px";
        });

        // Close Menu
        closeBtn.addEventListener("click", () => {
            menu.style.width = "0";
        });
    });
});

