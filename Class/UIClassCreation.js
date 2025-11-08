import Player from "../Player/ClassPlayer.js";
import Class from "./ClassClass.js";

const new_class_button = document.getElementById("new_class_button");
const class_creation_form = document.getElementById("class_creation_form");
const remaining_points = document.getElementById("remaining_points");
const class_name_input = document.getElementById("class_name");
const create_class_button = document.getElementById("create_class_button");

const strength_value = document.getElementById("strength_value");
const magic_value = document.getElementById("magic_value");
const luck_value = document.getElementById("luck_value");
const sense_of_direction_value = document.getElementById("sense_of_direction_value");
const health_value = document.getElementById("health_value");
const hearing_value = document.getElementById("hearing_value");
const stamina_value = document.getElementById("stamina_value");
const load_value = document.getElementById("load_value");
const leadership_value = document.getElementById("leadership_value");

const plus_strength = document.getElementById("increase_strength");
const minus_strength = document.getElementById("decrease_strength");
const plus_magic = document.getElementById("increase_magic");
const minus_magic = document.getElementById("decrease_magic");
const plus_luck = document.getElementById("increase_luck");
const minus_luck = document.getElementById("decrease_luck");
const plus_sense_of_direction = document.getElementById("increase_sense_of_direction");
const minus_sense_of_direction = document.getElementById("decrease_sense_of_direction");
const plus_health = document.getElementById("increase_health");
const minus_health = document.getElementById("decrease_health");
const plus_hearing = document.getElementById("increase_hearing");
const minus_hearing = document.getElementById("decrease_hearing");
const plus_stamina = document.getElementById("increase_stamina");
const minus_stamina = document.getElementById("decrease_stamina");
const plus_load = document.getElementById("increase_load");
const minus_load = document.getElementById("decrease_load");
const plus_leadership = document.getElementById("increase_leadership");
const minus_leadership = document.getElementById("decrease_leadership");

new_class_button.addEventListener("click", function() {
    class_creation_form.style.display = "";
    remaining_points.innerText = Player.getAttributePoints();
});

create_class_button.addEventListener("click", function() {
    const className = class_name_input.value;
    if (className.trim() === "") {
        alert("Veuillez entrer un nom de classe valide.");
        return;
    }
    if(Player.classes.some(c => c.name === className.trim())) {
        alert("Une classe avec ce nom existe déjà.");
        return;
    }
    const attributes = {
        strength: parseInt(strength_value.innerText),
        magic: parseInt(magic_value.innerText),
        luck: parseInt(luck_value.innerText),
        sense_of_direction: parseInt(sense_of_direction_value.innerText),
        health: parseInt(health_value.innerText),
        hearing: parseInt(hearing_value.innerText),
        stamina: parseInt(stamina_value.innerText),
        load: parseInt(load_value.innerText),
        leadership: parseInt(leadership_value.innerText)
    };
    let newClass = new Class(className, attributes.strength, attributes.magic, attributes.luck, attributes.sense_of_direction, attributes.health, attributes.hearing, attributes.stamina, attributes.load, attributes.leadership);
    Player.appendClass(newClass);
    class_creation_form.style.display = "none";
});

plus_strength.addEventListener("click", function() {
    let current_value = parseInt(strength_value.innerText);
    if (Player.getAttributePoints() > 0) {
        strength_value.innerText = current_value + 1;
        Player.setAttributePoints(Player.getAttributePoints() - 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

minus_strength.addEventListener("click", function() {
    let current_value = parseInt(strength_value.innerText);
    if (current_value > 0) {
        strength_value.innerText = current_value - 1;
        Player.setAttributePoints(Player.getAttributePoints() + 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

plus_magic.addEventListener("click", function() {
    let current_value = parseInt(magic_value.innerText);
    if (Player.getAttributePoints() > 0) {
        magic_value.innerText = current_value + 1;
        Player.setAttributePoints(Player.getAttributePoints() - 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

minus_magic.addEventListener("click", function() {
    let current_value = parseInt(magic_value.innerText);
    if (current_value > 0) {
        magic_value.innerText = current_value - 1;
        Player.setAttributePoints(Player.getAttributePoints() + 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

plus_luck.addEventListener("click", function() {
    let current_value = parseInt(luck_value.innerText);
    if (Player.getAttributePoints() > 0) {
        luck_value.innerText = current_value + 1;
        Player.setAttributePoints(Player.getAttributePoints() - 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

minus_luck.addEventListener("click", function() {
    let current_value = parseInt(luck_value.innerText);
    if (current_value > 0) {
        luck_value.innerText = current_value - 1;
        Player.setAttributePoints(Player.getAttributePoints() + 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

plus_sense_of_direction.addEventListener("click", function() {
    let current_value = parseInt(sense_of_direction_value.innerText);
    if (Player.getAttributePoints() > 0) {
        sense_of_direction_value.innerText = current_value + 1;
        Player.setAttributePoints(Player.getAttributePoints() - 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

minus_sense_of_direction.addEventListener("click", function() {
    let current_value = parseInt(sense_of_direction_value.innerText);
    if (current_value > 0) {
        sense_of_direction_value.innerText = current_value - 1;
        Player.setAttributePoints(Player.getAttributePoints() + 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

plus_health.addEventListener("click", function() {
    let current_value = parseInt(health_value.innerText);
    if (Player.getAttributePoints() > 0) {
        health_value.innerText = current_value + 1;
        Player.setAttributePoints(Player.getAttributePoints() - 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

minus_health.addEventListener("click", function() {
    let current_value = parseInt(health_value.innerText);
    if (current_value > 0) {
        health_value.innerText = current_value - 1;
        Player.setAttributePoints(Player.getAttributePoints() + 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

plus_hearing.addEventListener("click", function() {
    let current_value = parseInt(hearing_value.innerText);
    if (Player.getAttributePoints() > 0) {
        hearing_value.innerText = current_value + 1;
        Player.setAttributePoints(Player.getAttributePoints() - 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

minus_hearing.addEventListener("click", function() {
    let current_value = parseInt(hearing_value.innerText);
    if (current_value > 0) {
        hearing_value.innerText = current_value - 1;
        Player.setAttributePoints(Player.getAttributePoints() + 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

plus_stamina.addEventListener("click", function() {
    let current_value = parseInt(stamina_value.innerText);
    if (Player.getAttributePoints() > 0) {
        stamina_value.innerText = current_value + 1;
        Player.setAttributePoints(Player.getAttributePoints() - 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

minus_stamina.addEventListener("click", function() {
    let current_value = parseInt(stamina_value.innerText);
    if (current_value > 0) {
        stamina_value.innerText = current_value - 1;
        Player.setAttributePoints(Player.getAttributePoints() + 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

plus_load.addEventListener("click", function() {
    let current_value = parseInt(load_value.innerText);
    if (Player.getAttributePoints() > 0) {
        load_value.innerText = current_value + 1;
        Player.setAttributePoints(Player.getAttributePoints() - 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

minus_load.addEventListener("click", function() {
    let current_value = parseInt(load_value.innerText);
    if (current_value > 0) {
        load_value.innerText = current_value - 1;
        Player.setAttributePoints(Player.getAttributePoints() + 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

plus_leadership.addEventListener("click", function() {
    let current_value = parseInt(leadership_value.innerText);
    if (Player.getAttributePoints() > 0) {
        leadership_value.innerText = current_value + 1;
        Player.setAttributePoints(Player.getAttributePoints() - 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

minus_leadership.addEventListener("click", function() {
    let current_value = parseInt(leadership_value.innerText);
    if (current_value > 0) {
        leadership_value.innerText = current_value - 1;
        Player.setAttributePoints(Player.getAttributePoints() + 1);
        remaining_points.innerText = Player.getAttributePoints();
    }
});

