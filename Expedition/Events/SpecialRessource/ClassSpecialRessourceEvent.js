import Player from "../../../Player/ClassPlayer.js";
import Event from "../ClassEvent.js";
import HumanEvent from "./ClassHumanEvent.js";
import AttributePoint from "./ClassAttributePointEvent.js";

export default class SpecialRessourceEvent extends Event {

    events_probability_map = new Map();

    constructor(expedition_associated, probability){
        super();
        this.name = "special_ressource_event";
        this.probability = probability;
        this.expedition_associated = expedition_associated;
    }

    populateEvents(){
        let possible_events = [];


        let nb_human_collected = this.expedition_associated.ressources_collected.get("human") || 0;
        if(nb_human_collected + Player.getNbHumanPerExpedition() < Player.hard_cap_nb_human_per_expedition){
            possible_events.push(new HumanEvent(this.expedition_associated, 0.0));
        }

        let nb_attribute_points_collected = this.expedition_associated.ressources_collected.get("attribute_point") || 0;
        if(nb_human_collected + Player.getAttributePoints() < Player.hard_cap_attribute_points){
            possible_events.push(new AttributePoint(this.expedition_associated, 1.0));
        }
        for (let event of possible_events) {
            let range_start = 0;
            for (let [range, existing_event] of this.events_probability_map.entries()) {
                range_start += range[1] - range[0];
            }
            this.events_probability_map.set([range_start, range_start + event.probability], event);
        }
    }

    generateEvent(){
        const rand = Math.random();
        for (let [range, event] of this.events_probability_map.entries()) {
            if (rand >= range[0] && rand < range[1]) {
                return event;
            }
        }
        return null;
    }

    applyEvent(){
        this.populateEvents();
        const event = this.generateEvent();
        return event.applyEvent();
    }
}