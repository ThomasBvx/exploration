// import Class from "../Class/ClassClass.js";

export default class Player {
    static attribute_points = 10;
    static nb_class_available = 1;
    static nb_human_per_class = 3;
    static classes = [];

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

    static getNbHumanPerClass() {
        return this.nb_human_per_class;
    }

    static setNbHumanPerClass(nb) {
        this.nb_human_per_class = nb;
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
}