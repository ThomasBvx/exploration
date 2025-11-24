import Event from "../ClassEvent.js";
import Expedition from "../../ClassExpedition.js";
import Player from "../../../Player/ClassPlayer.js";

export default class HumanEvent extends Event {

    constructor(expedition_associated, probability){
        super();
        this.name = "human_event";
        this.probability = probability;
        this.energy_cost = 1;
        this.expedition_associated = expedition_associated;
        this.log_message = "Vous avez trouvé un humain. Vous pourrez l'ajouter à vos expeditions une fois rentré au camp."
    }

    applyEvent(){
        this.expedition_associated.addRessource("human", 1);
        this.useEnergy();
        return this.getLogMessage();
    }
}