$(function () {

    // Use root-relative menu path so it works from any subdirectory
    let menuPath = "/menu.html";
    let isMenuOpen = false;

    $("#menu-container").load(menuPath, function () {
        const menu = document.getElementById("side-menu");
        const menuBtn = document.getElementById("menu-btn");

        // if we are on the home page have menu open by default
        if (window.location.pathname === "/" || window.location.pathname.endsWith("home/")) {
            const menu = document.getElementById("side-menu");
            if (menu) {
                menu.style.width = "200px";
                isMenuOpen = true;
                document.body.classList.add("menu-open");
            }
        }

        // Open Menu
        menuBtn.addEventListener("click", () => {
            if (!isMenuOpen) {
                menu.style.width = "200px";
                isMenuOpen = true;
                document.body.classList.add("menu-open");
            } else {
                menu.style.width = "0";
                isMenuOpen = false;
                document.body.classList.remove("menu-open");
            }
        });

    });

});
