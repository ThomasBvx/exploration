import Player from "../Player/ClassPlayer.js";
import Expedition from "./ClassExpedition.js";
import EmptyEvent from "./Events/ClassEmptyEvent.js";

function updateExpeditionCreationUI() {
    document.getElementById("human_available_value").innerText = Player.getNbHumanPerExpedition();
    document.getElementById("new_expedition_number").innerText = Expedition.current_expedition_number.toString();
    document.getElementById("current_expedition_number").innerText = (Expedition.current_expedition_number - 1).toString();
    document.getElementById("create_expedition_button").style.display = Player.expeditionRunning ? "none" : "block";
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
    document.getElementById("expedition_in_progress").style.display = "none";

    document.getElementById("expedition_creation_area").hidden = false;
    let nbHumansRemaining = Player.getNbHumanPerExpedition();
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


function waitForAnyButton(buttonIds) {
    return new Promise((resolve) => {

        const handlers = {};

        buttonIds.forEach((id) => {
            const btn = document.getElementById(id);

            handlers[id] = () => {
                // Retirer tous les listeners pour éviter plusieurs triggers
                buttonIds.forEach((otherId) => {
                    document.getElementById(otherId)
                            .removeEventListener("click", handlers[otherId]);
                });

                // Résoudre en renvoyant le bouton pressé
                resolve(id);
            };

            btn.addEventListener("click", handlers[id]);
        });
    });
}

document.getElementById("start_expedition_button").addEventListener("click", () => {
    if(parseInt(document.getElementById("human_remaining_value").innerText) === Player.getNbHumanPerExpedition()) {
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
    // document.getElementById("create_expedition_button").hidden = true;
    document.getElementById("start_expedition_button").style.display = "none";
    document.getElementById("expedition_in_progress").style.display = "block";
    updateExpeditionCreationUI();

    expedition.populateEvents();
    let expeditionLog = expedition.startExpedition();
    document.getElementById("expedition_log").value = "";
    // Use async/await with a delay Promise so the event loop isn't blocked.
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    (async function consumeExpeditionLog(gen) {
        while (true) {
            const res = gen.next();
            // If generator finished or explicit end marker, finalize
            if (res.done || res.value === "end") {
                document.getElementById("expedition_log").value += "Expedition ended.\n";
                Player.expeditionRunning = false;
                updateExpeditionCreationUI();
                break;
            }

            // Append the current log entry and show current energy
            document.getElementById("expedition_log").value += res.value + "\n";
            console.log("energy: " + expedition.getEnergy());

            // Wait 1s before processing next entry
            if(res.value === EmptyEvent.prototype.log_message) {
                await delay(500);
            } else {
                document.getElementById("continue_expedition_button").style.display = "block";
                document.getElementById("end_expedition_button").style.display = "block";
                const pressed = await waitForAnyButton(["continue_expedition_button", "end_expedition_button"]);
                if(pressed === "end_expedition_button") {
                    successMessage = expedition.endExpedition();
                    document.getElementById("expedition_log").value += successMessage + "\n";
                    Player.expeditionRunning = false;
                    updateExpeditionCreationUI();
                    break;
                }
                document.getElementById("continue_expedition_button").style.display = "none";
                document.getElementById("end_expedition_button").style.display = "none";
            }
        }
    })(expeditionLog);
    // document.getElementById("expedition_in_progress").style.display = "none";
    // document.getElementById("create_expedition_button").hidden = false;
});

