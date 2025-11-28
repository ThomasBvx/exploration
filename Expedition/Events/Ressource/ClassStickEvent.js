import Event from "../ClassEvent.js";
import Ressource from "../../../Camp/ClassRessources.js";

export default class StickEvent extends Event {

    constructor(expedition_associated, probability){
        super();
        this.name = "stick_event";
        this.probability = probability;
        this.energy_cost = 1;
        this.expedition_associated = expedition_associated;
        this.log_message = "Vous avez trouvé un baton."
    }

    applyEvent(){
        this.expedition_associated.addRessource(Ressource.STICK, 1);
        this.useEnergy();
        return this.getLogMessage();
    }
}