const menu_div = document.getElementById("menu");
const class_tab_button = document.getElementById("menu_classes_button");
const camp_tab_button = document.getElementById("menu_camp_button");

class_tab_button.addEventListener("click", () => {
    document.getElementById("class_tab").style.display = "block";
    document.getElementById("camp_tab").style.display = "none";
});

camp_tab_button.addEventListener("click", () => {
    document.getElementById("class_tab").style.display = "none";
    document.getElementById("camp_tab").style.display = "block";
});