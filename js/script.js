$(function(){

    let menuPath = window.location.pathname.includes("/pages/") ? "../menu.html" : "menu.html";

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

