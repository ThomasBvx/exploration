export default class Event{

    name;
    probability;
    energy_cost;
    expedition_associated;
    log_message;

    applyEvent(){
        // To be implemented in subclasses
    }

    useEnergy(){
        this.expedition_associated.setEnergy(this.expedition_associated.getEnergy() - this.energy_cost);
    }

    getLogMessage(){
        return this.log_message;
    }
}