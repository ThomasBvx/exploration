import Event from "./ClassEvent.js";
import Expedition from "../ClassExpedition.js";
import Player from "../../Player/ClassPlayer.js";

export default class HumanEvent extends Event {

    constructor(expedition_associated){
        super("human encounter", 0.1, 1);
        this.expedition_associated = expedition_associated;
    }

    applyEvent(){
        Player.setNbHumanPerClass(Player.getNbHumanPerClass() + 1);
        return "Vous avez trouvé un humain. Vous pouvez désormais l'ajouter à une de vos classes.";
    }
}