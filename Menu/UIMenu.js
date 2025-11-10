const menu_div = document.getElementById("menu");
const class_tab_button = document.getElementById("menu_classes_button");
const camp_tab_button = document.getElementById("menu_camp_button");
const expedition_tab_button = document.getElementById("menu_expedition_button");

const array_tab_buttons = [class_tab_button, camp_tab_button];

class_tab_button.addEventListener("click", () => {
    document.getElementById("class_tab").style.display = "block";
    document.getElementById("camp_tab").style.display = "none";
    document.getElementById("expedition_tab").style.display = "none";
});

camp_tab_button.addEventListener("click", () => {
    document.getElementById("class_tab").style.display = "none";
    document.getElementById("camp_tab").style.display = "block";
    document.getElementById("expedition_tab").style.display = "none";
});

expedition_tab_button.addEventListener("click", () => {
    document.getElementById("class_tab").style.display = "none";
    document.getElementById("camp_tab").style.display = "none";
    document.getElementById("expedition_tab").style.display = "block";
});