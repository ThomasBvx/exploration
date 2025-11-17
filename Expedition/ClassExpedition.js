import Event from "./Events/ClassEvent.js";
import HumanEvent from "./Events/ClassHumanEvent.js";

export default class Expedition {
    class_map = new Map();
    static num = 0;
    energy = 10;
    events_probability_map = new Map();

    constructor(class_map) {
        this.id = Expedition.num;
        Expedition.num += 1;
        this.class_map = class_map;
    }

    populateEvents() {
        this.events_probability_map.set(new HumanEvent(this), [0,1]);
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

    *startExpedition() {
        yield "end"
        while(this.energy > 0) {
            yield "test"
            this.energy -= 1; // Example energy consumption
        }
        yield "end"
    }
}