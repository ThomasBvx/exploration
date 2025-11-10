import Player from "../Player/ClassPlayer.js";

document.getElementById("human_available_value").innerText = Player.getNbHumanPerClass();

document.getElementById("create_expedition_button").addEventListener("click", () => {
    document.getElementById("expedition_creation_area").hidden = false;
    let nbHumansRemaining = Player.getNbHumanPerClass();
    document.getElementById("human_remaining_value").innerText = nbHumansRemaining;
    for(const classInstance of Player.getClasses()) {
        let classDiv = document.createElement("div");
        classDiv.id = `${classInstance.name}_choice_div`;
        document.getElementById("existing_classes").appendChild(classDiv);
    }
});

