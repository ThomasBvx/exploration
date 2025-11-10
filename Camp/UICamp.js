import Camp from "./ClassCamp.js";
import Ressource from "./ClassRessources.js";

const stickValueSpan = document.getElementById('ressource_stick_value');
const stoneValueSpan = document.getElementById('ressource_stone_value');
const plankValueSpan = document.getElementById('ressource_plank_value');
const metalOreValueSpan = document.getElementById('ressource_metal_ore_value');
const metalValueSpan = document.getElementById('ressource_metal_value');

const buildOvenRequirementsSpan = document.getElementById('build_oven_requirements');
const buildSawRequirementsSpan = document.getElementById('build_saw_requirements');
const buildWorkshopRequirementsSpan = document.getElementById('build_workshop_requirements');
const buildHouseRequirementsSpan = document.getElementById('build_house_requirements');

const useOvenRequirementsSpan = document.getElementById('use_oven_requirements');
const useSawRequirementsSpan = document.getElementById('use_saw_requirements');

function updateRessourcesDisplay() {
    stickValueSpan.textContent = Camp.getRessourcesMap().get(Ressource.STICK) || 0;
    stoneValueSpan.textContent = Camp.getRessourcesMap().get(Ressource.STONE) || 0;
    plankValueSpan.textContent = Camp.getRessourcesMap().get(Ressource.PLANK) || 0;
    metalOreValueSpan.textContent = Camp.getRessourcesMap().get(Ressource.METAL_ORE) || 0;
    metalValueSpan.textContent = Camp.getRessourcesMap().get(Ressource.METAL) || 0;
}

function formatRequirements(requirementsMap) {
    let requirementsText = '';
    for (let [ressource, quantity] of requirementsMap) {
        let name_fr;
        if (ressource === Ressource.STICK) name_fr = 'bâton';
        else if (ressource === Ressource.STONE) name_fr = 'caillou';
        else if (ressource === Ressource.PLANK) name_fr = 'planche';
        else if (ressource === Ressource.METAL_ORE) name_fr = 'minerai de métal';
        else if (ressource === Ressource.METAL) name_fr = 'métal';
        requirementsText += `<br>${quantity} ${name_fr}`;
    }
    return requirementsText;
}

function updateBuildButtons() {
    const buildOvenButton = document.getElementById('build_oven_button');
    const buildSawButton = document.getElementById('build_saw_button');
    const buildWorkshopButton = document.getElementById('build_workshop_button');
    const buildHouseButton = document.getElementById('build_house_button');

    const useOvenButton = document.getElementById('use_oven_button');
    const useSawButton = document.getElementById('use_saw_button');

    if (Camp.canBuild(Camp.house_requirements)) {
        buildHouseButton.disabled = false;
    } else {
        buildHouseButton.disabled = true;
    }

    if (Camp.canBuild(Camp.workshop_requirements)) {
        buildWorkshopButton.disabled = false;
    } else {
        buildWorkshopButton.disabled = true;
    }

    if (Camp.canBuild(Camp.oven_requirements)) {
        buildOvenButton.disabled = false;
    } else {
        buildOvenButton.disabled = true;
    }

    if (Camp.canBuild(Camp.saw_requirements)) {
        buildSawButton.disabled = false;
    } else {
        buildSawButton.disabled = true;
    }

    if(Camp.hasOven() && Camp.canBuild(Camp.use_oven_requirements)) {
        useOvenButton.disabled = false;
    } else {
        useOvenButton.disabled = true;
    }

    if(Camp.hasSaw() && Camp.canBuild(Camp.use_saw_requirements)) {
        useSawButton.disabled = false;
    } else {
        useSawButton.disabled = true;
    }
}

function updateButtonsVisibility() {
    if (Camp.hasOven()) {
        document.getElementById('build_oven_button').style.display = 'none';
        document.getElementById('use_oven_button').style.display = 'inline';
        useOvenRequirementsSpan.innerHTML = formatRequirements(Camp.use_oven_requirements);
    } else {
        document.getElementById('build_oven_button').style.display = 'inline';
        document.getElementById('use_oven_button').style.display = 'none';
        buildOvenRequirementsSpan.innerHTML = formatRequirements(Camp.oven_requirements);
    }

    if (Camp.hasSaw()) {
        document.getElementById('build_saw_button').style.display = 'none';
        document.getElementById('use_saw_button').style.display = 'inline';
        useSawRequirementsSpan.innerHTML = formatRequirements(Camp.use_saw_requirements);
    } else {
        document.getElementById('build_saw_button').style.display = 'inline';
        document.getElementById('use_saw_button').style.display = 'none';
        buildSawRequirementsSpan.innerHTML = formatRequirements(Camp.saw_requirements);
    }

    if (Camp.hasWorkshop()) {
        document.getElementById('build_workshop_button').style.display = 'none';
        document.getElementById('use_workshop_button').style.display = 'inline';
    } else {
        document.getElementById('build_workshop_button').style.display = 'inline';
        document.getElementById('use_workshop_button').style.display = 'none';
        buildWorkshopRequirementsSpan.innerHTML = formatRequirements(Camp.workshop_requirements);
    }

    if (Camp.hasHouse()) {
        document.getElementById('build_house_button').style.display = 'none';
        document.getElementById('use_house_button').style.display = 'inline';
    } else {
        document.getElementById('build_house_button').style.display = 'inline';
        document.getElementById('use_house_button').style.display = 'none';
        buildHouseRequirementsSpan.innerHTML = formatRequirements(Camp.house_requirements);
    }
}

document.getElementById('build_oven_button').addEventListener('click', () => {
    Camp.setHasOven(true);
    for (let [ressource, quantity] of Camp.oven_requirements) {
        Camp.removeRessource(ressource, quantity);
    }
    updateUI();
});

document.getElementById('build_saw_button').addEventListener('click', () => {
    Camp.setHasSaw(true);
    for (let [ressource, quantity] of Camp.saw_requirements) {
        Camp.removeRessource(ressource, quantity);
    }
    updateUI();
});

document.getElementById('build_workshop_button').addEventListener('click', () => {
    Camp.setHasWorkshop(true);
    for (let [ressource, quantity] of Camp.workshop_requirements) {
        Camp.removeRessource(ressource, quantity);
    }
    updateUI();
});

document.getElementById('build_house_button').addEventListener('click', () => {
    Camp.setHasHouse(true);
    for (let [ressource, quantity] of Camp.house_requirements) {
        Camp.removeRessource(ressource, quantity);
    }
    updateUI();
});

document.getElementById('use_oven_button').addEventListener('click', () => {
    for (let [ressource, quantity] of Camp.use_oven_requirements) {
        Camp.removeRessource(ressource, quantity);
    }
    Camp.addRessource(Ressource.METAL, 1);
    updateUI();
});

document.getElementById('use_saw_button').addEventListener('click', () => {
    for (let [ressource, quantity] of Camp.use_saw_requirements) {
        Camp.removeRessource(ressource, quantity);
    }
    Camp.addRessource(Ressource.PLANK, 1);
    updateUI();
});

function updateUI() {
    updateRessourcesDisplay();
    updateBuildButtons();
    updateButtonsVisibility();
}

Camp.addRessource(Ressource.STICK, 20);
Camp.addRessource(Ressource.STONE, 15);
Camp.addRessource(Ressource.PLANK, 25);
Camp.addRessource(Ressource.METAL_ORE, 5);
Camp.addRessource(Ressource.METAL, 10);

updateUI();