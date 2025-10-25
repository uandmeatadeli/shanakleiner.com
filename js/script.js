$(function () {

    let menuPath = window.location.pathname.includes("/pages/") ? "../menu.html" : "menu.html";
    let isMenuOpen = false;

    $("#menu-container").load(menuPath, function () {
        const menu = document.getElementById("side-menu");
        const menuBtn = document.getElementById("menu-btn");

        // if we are on the home page have menu open by default
        if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
            const menu = document.getElementById("side-menu");
            if (menu) {
                menu.style.width = "250px";
                isMenuOpen = true;
            }
        }

        // Open Menu
        menuBtn.addEventListener("click", () => {
            if (!isMenuOpen) {
                menu.style.width = "250px";
                isMenuOpen = true;
            } else {
                menu.style.width = "0";
                isMenuOpen = false;
            }
        });

    });

});

