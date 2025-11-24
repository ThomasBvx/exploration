import Player from "../Player/ClassPlayer.js";
import Class from "./ClassClass.js";

const new_class_button = document.getElementById("new_class_button");
const class_creation_form = document.getElementById("class_creation_form");
const remaining_points = document.getElementById("remaining_points");
const class_name_input = document.getElementById("class_name");
const create_class_button = document.getElementById("create_class_button");
const cancel_class_button = document.getElementById("cancel_class_button");
const modify_class_button = document.getElementById("modify_class_button");

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

let remaining_points_value;
let old_class_name;
let old_class_section = null;

document.getElementById("nb_points_value").innerText = Player.getAttributePoints();
document.getElementById("max_classes_value").innerText = Player.getNbClassAvailable();

function modifyClass(className) {
    old_class_name = className;

    const cls = Player.findClassByName(className);
    new_class_button.style.display = "none";

    const titles = document.querySelectorAll("#class_display_area .title");

    for (const title of titles) {
        if (title.textContent.trim() === className) {
            old_class_section = title.closest(".section");
            break;
        }
    }
    if (old_class_section) {
        old_class_section.style.display = "none";
    } else {
        console.warn(`Aucune section trouvée pour le titre "${className}"`);
    }

    class_creation_form.style.display = "";
    create_class_button.style.display = "none";
    modify_class_button.style.display = "";
    const sum_of_attributes = cls.strength + cls.magic + cls.luck + cls.sense_of_direction + cls.health + cls.hearing + cls.stamina + cls.load + cls.leadership;
    remaining_points_value = Player.getAttributePoints() - sum_of_attributes;
    remaining_points.innerText = remaining_points_value;

    // Populate the form with the current class attributes
    class_name_input.value = cls.name;
    strength_value.innerText = cls.strength;
    magic_value.innerText = cls.magic;
    luck_value.innerText = cls.luck;
    sense_of_direction_value.innerText = cls.sense_of_direction;
    health_value.innerText = cls.health;
    hearing_value.innerText = cls.hearing;
    stamina_value.innerText = cls.stamina;
    load_value.innerText = cls.load;
    leadership_value.innerText = cls.leadership;
}

function linkButtonsOfNewClass() {
    const buttons = document.querySelectorAll("#class_display_area .toggle");
    const delete_buttons = document.querySelectorAll(".delete_class_button");
    const modify_buttons = document.querySelectorAll(".modify_class_button");

    modify_buttons.forEach((btn) => {
        // avoid attaching multiple listeners to the same button
        if (btn.dataset.bound === "true") return;
        btn.addEventListener("click", () => {
            const parent = btn.closest(".section");
            modifyClass(parent.querySelector(".title").innerText);
        });
        btn.dataset.bound = "true";
    });

    delete_buttons.forEach((btn) => {
        // avoid attaching multiple listeners to the same button
        if (btn.dataset.bound === "true") return;
        btn.addEventListener("click", () => {
            const parent = btn.closest(".section");
            const className = parent.querySelector(".title").innerText;
            Player.removeClassByName(className);
            const parentSection = btn.closest(".section");
            parentSection.remove();
        });
        btn.dataset.bound = "true";
    });
    buttons.forEach((btn) => {
            // avoid attaching multiple listeners to the same button
            if (btn.dataset.bound === "true") return;
            btn.addEventListener("click", () => {
                const parent = btn.closest(".section"); // récupère le conteneur
                const info = parent.querySelector(".info"); // cherche .info à l’intérieur
                info.hidden = !info.hidden;
                btn.classList.toggle("open");
                const deleteButton = parent.querySelector(".delete_class_button");
                if (info.hidden) {
                    deleteButton.hidden = true;
                } else {
                    deleteButton.hidden = false;
                }
                const modifyButton = parent.querySelector(".modify_class_button");
                if (info.hidden) {
                    modifyButton.hidden = true;
                } else {
                    modifyButton.hidden = false;
                }
            });
            btn.dataset.bound = "true";
    });
}

function addNewClassToDisplay(newClass) {
    const classList = document.getElementById("class_display_area");
    const classItem = document.createElement("div");
    classItem.classList.add("section");
    classItem.innerHTML = `
        <button class="toggle">▶</button>
        <div class="title" style="display: inline;">${newClass.name}</div>
        <div class="info" hidden>
            <div>Force : ${newClass.strength}</div>
            <div>Magie : ${newClass.magic}</div>
            <div>Chance : ${newClass.luck}</div>
            <div>Sens de l'orientation : ${newClass.sense_of_direction}</div>
            <div>Santé : ${newClass.health}</div>
            <div>Ouïe : ${newClass.hearing}</div>
            <div>Endurance : ${newClass.stamina}</div>
            <div>Charge : ${newClass.load}</div>
            <div>Leadership : ${newClass.leadership}</div>
        </div>
        <button class="delete_class_button" hidden>Supprimer la classe</button>
        <button class="modify_class_button" hidden>Modifier la classe</button>
    `;
    classList.appendChild(classItem);
    linkButtonsOfNewClass();
}

new_class_button.addEventListener("click", function() {
    if(Player.nb_class_available <= Player.getClasses().length) {
        alert("Le nombre maximum de classes a été atteint.");
        return;
    }
    class_creation_form.style.display = "";
    create_class_button.style.display = "";
    modify_class_button.style.display = "none";
    remaining_points_value = Player.getAttributePoints();
    remaining_points.innerText = remaining_points_value;
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
    resetAttributes();
    class_creation_form.style.display = "none";
    addNewClassToDisplay(newClass);
});

cancel_class_button.addEventListener("click", function() {
    resetAttributes();
    class_creation_form.style.display = "none";
    if (old_class_section) {
        old_class_section.style.display = "";
        old_class_section = null;
    }
    new_class_button.style.display = "";
});

modify_class_button.addEventListener("click", function() {
    const new_class_name = class_name_input.value;
    if (new_class_name.trim() === "") {
        alert("Veuillez entrer un nom de classe valide.");
        return;
    }
    if (new_class_name !== old_class_name && Player.classes.some(c => c.name === new_class_name.trim())) {
        alert("Une classe avec ce nom existe déjà.");
        return;
    }
    if (new_class_name.trim() === old_class_name.trim()) {
        let old_class = Player.findClassByName(old_class_name);
        old_class.strength = parseInt(strength_value.innerText);
        old_class.magic = parseInt(magic_value.innerText);
        old_class.luck = parseInt(luck_value.innerText);
        old_class.sense_of_direction = parseInt(sense_of_direction_value.innerText);
        old_class.health = parseInt(health_value.innerText);
        old_class.hearing = parseInt(hearing_value.innerText);
        old_class.stamina = parseInt(stamina_value.innerText);
        old_class.load = parseInt(load_value.innerText);
        old_class.leadership = parseInt(leadership_value.innerText);
    } else {
        Player.removeClassByName(old_class_name);
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
        let modifiedClass = new Class(new_class_name, attributes.strength, attributes.magic, attributes.luck, attributes.sense_of_direction, attributes.health, attributes.hearing, attributes.stamina, attributes.load, attributes.leadership);
        Player.appendClass(modifiedClass);
    }
    resetAttributes();
    class_creation_form.style.display = "none";

    // Refresh the class display area
    const classDisplayArea = document.getElementById("class_display_area");
    classDisplayArea.innerHTML = "";
    Player.getClasses().forEach(cls => {
        addNewClassToDisplay(cls);
    });
    new_class_button.style.display = "";
});

function resetAttributes() {
    remaining_points_value = Player.getAttributePoints();
    remaining_points.innerText = remaining_points_value;

    class_name_input.value = "";

    strength_value.innerText = "0";
    magic_value.innerText = "0";
    luck_value.innerText = "0";
    sense_of_direction_value.innerText = "0";
    health_value.innerText = "0";
    hearing_value.innerText = "0";
    stamina_value.innerText = "0";
    load_value.innerText = "0";
    leadership_value.innerText = "0";
}

plus_strength.addEventListener("click", function() {
    let current_value = parseInt(strength_value.innerText);
    if (remaining_points_value > 0) {
        strength_value.innerText = current_value + 1;
        remaining_points_value -= 1;
        remaining_points.innerText = remaining_points_value;
    }
});

minus_strength.addEventListener("click", function() {
    let current_value = parseInt(strength_value.innerText);
    if (current_value > 0) {
        strength_value.innerText = current_value - 1;
        remaining_points_value += 1;
        remaining_points.innerText = remaining_points_value;
    }
});

plus_magic.addEventListener("click", function() {
    let current_value = parseInt(magic_value.innerText);
    if (remaining_points_value > 0) {
        magic_value.innerText = current_value + 1;
        remaining_points_value -= 1;
        remaining_points.innerText = remaining_points_value;
    }
});

minus_magic.addEventListener("click", function() {
    let current_value = parseInt(magic_value.innerText);
    if (current_value > 0) {
        magic_value.innerText = current_value - 1;
        remaining_points_value += 1;
        remaining_points.innerText = remaining_points_value;
    }
});

plus_luck.addEventListener("click", function() {
    let current_value = parseInt(luck_value.innerText);
    if (remaining_points_value > 0) {
        luck_value.innerText = current_value + 1;
        remaining_points_value -= 1;
        remaining_points.innerText = remaining_points_value;
    }
});

minus_luck.addEventListener("click", function() {
    let current_value = parseInt(luck_value.innerText);
    if (current_value > 0) {
        luck_value.innerText = current_value - 1;
        remaining_points_value += 1;
        remaining_points.innerText = remaining_points_value;
    }
});

plus_sense_of_direction.addEventListener("click", function() {
    let current_value = parseInt(sense_of_direction_value.innerText);
    if (remaining_points_value > 0) {
        sense_of_direction_value.innerText = current_value + 1;
        remaining_points_value -= 1;
        remaining_points.innerText = remaining_points_value;
    }
});

minus_sense_of_direction.addEventListener("click", function() {
    let current_value = parseInt(sense_of_direction_value.innerText);
    if (current_value > 0) {
        sense_of_direction_value.innerText = current_value - 1;
        remaining_points_value += 1;
        remaining_points.innerText = remaining_points_value;
    }
});

plus_health.addEventListener("click", function() {
    let current_value = parseInt(health_value.innerText);
    if (remaining_points_value > 0) {
        health_value.innerText = current_value + 1;
        remaining_points_value -= 1;
        remaining_points.innerText = remaining_points_value;
    }
});

minus_health.addEventListener("click", function() {
    let current_value = parseInt(health_value.innerText);
    if (current_value > 0) {
        health_value.innerText = current_value - 1;
        remaining_points_value += 1;
        remaining_points.innerText = remaining_points_value;
    }
});

plus_hearing.addEventListener("click", function() {
    let current_value = parseInt(hearing_value.innerText);
    if (remaining_points_value > 0) {
        hearing_value.innerText = current_value + 1;
        remaining_points_value -= 1;
        remaining_points.innerText = remaining_points_value;
    }
});

minus_hearing.addEventListener("click", function() {
    let current_value = parseInt(hearing_value.innerText);
    if (current_value > 0) {
        hearing_value.innerText = current_value - 1;
        remaining_points_value += 1;
        remaining_points.innerText = remaining_points_value;
    }
});

plus_stamina.addEventListener("click", function() {
    let current_value = parseInt(stamina_value.innerText);
    if (remaining_points_value > 0) {
        stamina_value.innerText = current_value + 1;
        remaining_points_value -= 1;
        remaining_points.innerText = remaining_points_value;
    }
});

minus_stamina.addEventListener("click", function() {
    let current_value = parseInt(stamina_value.innerText);
    if (current_value > 0) {
        stamina_value.innerText = current_value - 1;
        remaining_points_value += 1;
        remaining_points.innerText = remaining_points_value;
    }
});

plus_load.addEventListener("click", function() {
    let current_value = parseInt(load_value.innerText);
    if (remaining_points_value > 0) {
        load_value.innerText = current_value + 1;
        remaining_points_value -= 1;
        remaining_points.innerText = remaining_points_value;
    }
});

minus_load.addEventListener("click", function() {
    let current_value = parseInt(load_value.innerText);
    if (current_value > 0) {
        load_value.innerText = current_value - 1;
        remaining_points_value += 1;
        remaining_points.innerText = remaining_points_value;
    }
});

plus_leadership.addEventListener("click", function() {
    let current_value = parseInt(leadership_value.innerText);
    if (remaining_points_value > 0) {
        leadership_value.innerText = current_value + 1;
        remaining_points_value -= 1;
        remaining_points.innerText = remaining_points_value;
    }
});

minus_leadership.addEventListener("click", function() {
    let current_value = parseInt(leadership_value.innerText);
    if (current_value > 0) {
        leadership_value.innerText = current_value - 1;
        remaining_points_value += 1;
        remaining_points.innerText = remaining_points_value;
    }
});


let classTest = new Class("mage", 0, 8, 0, 0, 0, 0, 0, 0, 0);
Player.appendClass(classTest);
addNewClassToDisplay(classTest);