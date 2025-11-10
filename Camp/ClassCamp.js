import Ressource from "./ClassRessources.js";

export default class Camp {
    static has_oven = false;
    static has_saw = false;
    static has_workshop = false;
    static has_house = false;
    static ressources_map = new Map();

    static oven_requirements = new Map([
        [Ressource.STONE, 10]
    ]);

    static saw_requirements = new Map([
        [Ressource.STICK, 2],
        [Ressource.METAL, 1]
    ]);

    static workshop_requirements = new Map([
        [Ressource.PLANK, 5],
        [Ressource.METAL, 3],
        [Ressource.STONE, 5]
    ]);

    static house_requirements = new Map([
        [Ressource.PLANK, 20],
        [Ressource.STONE, 15],
        [Ressource.METAL, 5]
    ]);

    static use_oven_requirements = new Map([
        [Ressource.STICK, 1],
        [Ressource.METAL_ORE, 1]
    ]);

    static use_saw_requirements = new Map([
        [Ressource.STICK, 3]
    ]);

    static hasWorkshop() {
        return this.has_workshop;
    }

    static setHasWorkshop(hasWorkshop) {
        this.has_workshop = hasWorkshop;
    }

    static hasHouse() {
        return this.has_house;
    }

    static setHasHouse(hasHouse) {
        this.has_house = hasHouse;
    }

    static hasOven() {
        return this.has_oven;
    }

    static setHasOven(hasOven) {
        this.has_oven = hasOven;
    }

    static hasSaw() {
        return this.has_saw;
    }

    static setHasSaw(hasSaw) {
        this.has_saw = hasSaw;
    }

    static getRessourcesMap() {
        return this.ressources_map;
    }

    static addRessource(ressource, quantity) {
        if (this.ressources_map.has(ressource)) {
            this.ressources_map.set(ressource, this.ressources_map.get(ressource) + quantity);
        } else {
            this.ressources_map.set(ressource, quantity);
        }
    }

    static removeRessource(ressource, quantity) {
        if (this.ressources_map.has(ressource)) {
            const currentQuantity = this.ressources_map.get(ressource);
            const newQuantity = currentQuantity - quantity;
            this.ressources_map.set(ressource, newQuantity);
        }
    }

    static hasEnoughRessource(ressource, quantity) {
        return this.ressources_map.has(ressource) && this.ressources_map.get(ressource) >= quantity;
    }

    static canBuild(requirementsMap) {
        for (let [ressource, quantity] of requirementsMap) {
            if (!this.hasEnoughRessource(ressource, quantity)) {
                return false;
            }
        }
        return true;
    }
}