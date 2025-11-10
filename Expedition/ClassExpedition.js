export default class Expedition {
    class_map = new Map();
    
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
}