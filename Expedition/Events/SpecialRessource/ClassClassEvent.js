import Event from "../ClassEvent.js";

export default class ClassEvent extends Event {

    constructor(expedition_associated, probability){
        super();
        this.name = "class_event";
        this.probability = probability;
        this.energy_cost = 1;
        this.expedition_associated = expedition_associated;
        this.log_message = "Vous avez trouvé un emplacement de classe. Vous pourrez créer une nouvelle classe une fois rentré au camp."
    }

    applyEvent(){
        this.expedition_associated.addRessource("class", 1);
        this.useEnergy();
        return this.getLogMessage();
    }
}