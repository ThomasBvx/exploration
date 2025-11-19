import Event from "./Events/ClassEvent.js";
import HumanEvent from "./Events/ClassHumanEvent.js";
import EmptyEvent from "./Events/ClassEmptyEvent.js";

export default class Expedition {
    class_map = new Map();
    static current_expedition_number = 0;
    energy = 10;
    events_probability_map = new Map();

    constructor(class_map) {
        this.id = Expedition.current_expedition_number;
        Expedition.current_expedition_number += 1;
        this.class_map = class_map;
    }

    getEnergy() {
        return this.energy;
    }

    setEnergy(energy) {
        this.energy = energy;
    }

    populateEvents() {
        let possible_events = [new HumanEvent(this, 0.2), new EmptyEvent(this, 0.8)];
        for (let event of possible_events) {
            let range_start = 0;
            for (let [range, existing_event] of this.events_probability_map.entries()) {
                range_start += range[1] - range[0];
            }
            this.events_probability_map.set([range_start, range_start + event.probability], event);
        }
        console.log(this.events_probability_map);
        // this.events_probability_map.set([0,1], new HumanEvent(this));
    }
    
    getClassMap() {
        return this.class_map;
    }

    addClassToExpedition(classInstance, quantity) {
        this.class_map.set(classInstance, quantity);
    }

    removeClassFromExpedition(classInstance) {
        this.class_map.delete(classInstance);
    }

    removeQuantityFromClass(classInstance, quantity) {
        if (this.class_map.has(classInstance)) {
            let currentQuantity = this.class_map.get(classInstance);
            if (currentQuantity <= quantity) {
                this.class_map.delete(classInstance);
            } else {
                this.class_map.set(classInstance, currentQuantity - quantity);
            }
        }
    }

    generateEvent(){
        const rand = Math.random();
        for (let [range, event] of this.events_probability_map.entries()) {
            if (rand >= range[0] && rand < range[1]) {
                return event;
            }
        }
        return null;
    }

    *startExpedition() {
        yield "Debut de l'expedition..."
        while(this.energy > 0) {
            const event = this.generateEvent();
            // console.log(event);
            if (event) {
                yield event.applyEvent();
            } else {
                yield "Aucun evenement ne s'est produit.";
            }

        }
        yield "end"
    }
}