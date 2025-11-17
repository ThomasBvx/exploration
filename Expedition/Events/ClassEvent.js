export default class Event{

    expedition_associated;

    constructor(name, probability, energy_cost){
        this.name = name;
        this.probability = probability;
        this.energy_cost = energy_cost;
    }
}