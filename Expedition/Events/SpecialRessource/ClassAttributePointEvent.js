import Event from "../ClassEvent.js";
import Expedition from "../../ClassExpedition.js";
import Player from "../../../Player/ClassPlayer.js";

export default class AttributePoint extends Event {

    constructor(expedition_associated, probability){
        super();
        this.name = "attribute_point_event";
        this.probability = probability;
        this.energy_cost = 1;
        this.expedition_associated = expedition_associated;
        this.log_message = "Vous avez trouvé un point d'attribut. Vous pourrez l'utiliser lors de la construction de vos classes une fois rentré au camp."
    }

    applyEvent(){
        this.expedition_associated.addRessource("attribute_point", 1);
        this.useEnergy();
        return this.getLogMessage();
    }
}