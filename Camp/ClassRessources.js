export default class Ressource{
    static STICK = new Ressource("stick");
    static STONE = new Ressource("stone");
    static PLANK = new Ressource("plank");
    static METAL_ORE = new Ressource("metal_ore");
    static METAL = new Ressource("metal");

    constructor(name) {
        this.name = name;
    }
}