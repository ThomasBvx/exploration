// import Class from "../Class/ClassClass.js";

export default class Player {
    static attribute_points = 10;
    static nb_class_available = 3;
    static nb_human_per_expedition = 3;

    static hard_cap_attribute_points = 100;
    static hard_cap_nb_class_available = 10;
    static hard_cap_nb_human_per_expedition = 20;
    static classes = [];
    static expeditions = [];
    static expeditionRunning = false;

    static probas_special_ressource_event = {
        "human": 0.3,
        "attribute_point": 0.3,
        "class": 0.4
    };

    static probas_ressource_event = {
        "stick": 1.0
    };

    static probas_event = {
        "special_ressource_event": 0.05,
        "ressource_event": 0.25,
        "empty_event": 0.7
    };

    static getAttributePoints() {
        return this.attribute_points;
    }

    static setAttributePoints(points) {
        this.attribute_points = points;
    }

    static getNbClassAvailable() {
        return this.nb_class_available;
    }

    static setNbClassAvailable(nb) {
        this.nb_class_available = nb;
    }

    static getNbHumanPerExpedition() {
        return this.nb_human_per_expedition;
    }

    static setNbHumanPerExpedition(nb) {
        this.nb_human_per_expedition = nb;
    }

    static getClasses() {
        return this.classes;
    }

    static appendClass(classArray) {
        this.classes.push(classArray);
    }

    static findClassByName(name) {
        return this.classes.find(cls => cls.name === name);
    }

    static removeClassByName(name) {
        this.classes = this.classes.filter(cls => cls.name !== name);
    }

    static appendExpedition(expeditionInstance) {
        this.expeditions.push(expeditionInstance);
    }

    static getExpeditions() {
        return this.expeditions;
    }

    static getExpeditionById(id) {
        return this.expeditions.find(exp => exp.id === id);
    }
}