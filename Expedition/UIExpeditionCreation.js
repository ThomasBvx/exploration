import Player from "../Player/ClassPlayer.js";
import Expedition from "./ClassExpedition.js";

function updateExpeditionCreationUI() {
    document.getElementById("human_available_value").innerText = Player.getNbHumanPerClass();
    document.getElementById("new_expedition_number").innerText = Expedition.num.toString();
    document.getElementById("current_expedition_number").innerText = (Expedition.num - 1).toString();
}

updateExpeditionCreationUI();

document.getElementById("create_expedition_button").addEventListener("click", () => {

    if(Player.getClasses().length === 0) {
        alert("No classes available. Please create classes first.");
        return;
    }

    if(Player.expeditionRunning) {
        alert("An expedition is already running. Please wait for it to finish before creating a new one.");
        return;
    }

    document.getElementById("start_expedition_button").style.display = "block";
    document.getElementById("create_expedition_button").hidden = true;

    document.getElementById("expedition_creation_area").hidden = false;
    let nbHumansRemaining = Player.getNbHumanPerClass();
    document.getElementById("human_remaining_value").innerText = nbHumansRemaining;
    for(const classInstance of Player.getClasses()) {
        let classDiv = document.createElement("div");
        classDiv.id = `${classInstance.name}_choice_div`;
        document.getElementById("existing_classes").appendChild(classDiv);
        
        let buttonDecrease = document.createElement("button");
        buttonDecrease.id = `decrease_${classInstance.name}_button`;
        buttonDecrease.innerText = "-";
        classDiv.appendChild(buttonDecrease);

        let spanClassName = document.createElement("span");
        spanClassName.id = `${classInstance.name}_expedition_name`;
        spanClassName.innerText = ` ${classInstance.name} : `;

        
        let spanValue = document.createElement("span");
        spanValue.id = `${classInstance.name}_expedition_value`;
        spanValue.innerText = "0 ";
        spanClassName.appendChild(spanValue);
        classDiv.appendChild(spanClassName);

        let buttonIncrease = document.createElement("button");
        buttonIncrease.id = `increase_${classInstance.name}_button`;
        buttonIncrease.innerText = "+";
        classDiv.appendChild(buttonIncrease);

        buttonIncrease.addEventListener("click", () => {
            let currentValue = parseInt(spanValue.innerText);
            if(nbHumansRemaining > 0) {
                currentValue += 1;
                nbHumansRemaining -= 1;
                spanValue.innerText = `${currentValue.toString()} `;
                document.getElementById("human_remaining_value").innerText = nbHumansRemaining.toString();
            }
        });    

        buttonDecrease.addEventListener("click", () => {
            let currentValue = parseInt(spanValue.innerText);
            if(currentValue > 0) {
                currentValue -= 1;
                nbHumansRemaining += 1;
                spanValue.innerText = `${currentValue.toString()} `;
                document.getElementById("human_remaining_value").innerText = nbHumansRemaining.toString();
            }
        });
    }
});

document.getElementById("start_expedition_button").addEventListener("click", () => {
    if(parseInt(document.getElementById("human_remaining_value").innerText) === Player.getNbHumanPerClass()) {
        alert("No humans assigned to the expedition. Please assign at least one human.");
        return;
    }
    let expeditionClasses = new Map();
    for(const classInstance of Player.getClasses()) {
        let spanValue = document.getElementById(`${classInstance.name}_expedition_value`);
        let quantity = parseInt(spanValue.innerText);
        if(quantity > 0) {
            expeditionClasses.set(classInstance, quantity);
        }
    }
    // Here you can create the expedition with the expeditionClasses map
    let expedition = new Expedition(expeditionClasses);
    Player.appendExpedition(expedition);
    Player.expeditionRunning = true;

    // Reset UI
    document.getElementById("existing_classes").innerHTML = "";
    document.getElementById("expedition_creation_area").hidden = true;
    document.getElementById("create_expedition_button").hidden = false;
    document.getElementById("start_expedition_button").style.display = "none";
    document.getElementById("expedition_in_progress").style.display = "block";
    updateExpeditionCreationUI();

    let expeditionLog = expedition.startExpedition();
    document.getElementById("expedition_log").value = "";
    let txt = expeditionLog.next();
    while(txt !== "end") {
        document.getElementById("expedition_log").value += txt.value + "\n";
        txt = expeditionLog.next();
    }
    document.getElementById("expedition_log").value += "Expedition ended.\n";
    Player.expeditionRunning = false;
    // document.getElementById("expedition_in_progress").style.display = "none";
});

