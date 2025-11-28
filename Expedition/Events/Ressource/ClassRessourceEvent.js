export default class RessourceEvent extends Event {

    events_probability_map = new Map();

    constructor(expedition_associated, probability){
        super();
        this.name = "ressource_event";
        this.probability = probability;
        this.expedition_associated = expedition_associated;
    }

    populateEvents(){
        this.events_probability_map.clear();
        let possible_events = [];
        possible_events.push(new StickEvent(this.expedition_associated, Player.probas_ressource_event["stick"]));

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