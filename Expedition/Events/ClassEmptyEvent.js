import Event from "./ClassEvent.js";
import Expedition from "../ClassExpedition.js";
import Player from "../../Player/ClassPlayer.js";

export default class EmptyEvent extends Event {

    constructor(expedition_associated, probability){
        super();
        this.name = "empty_event";
        this.probability = probability;
        this.energy_cost = 1;
        this.expedition_associated = expedition_associated;
        this.log_message = "L'expedition avance dans la grotte..."
    }

    applyEvent(){
        this.useEnergy();
        return this.getLogMessage();
    }
}