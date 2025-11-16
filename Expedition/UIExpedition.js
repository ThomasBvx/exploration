import Player from "../Player/ClassPlayer.js";

document.getElementById("human_available_value").innerText = Player.getNbHumanPerClass();

document.getElementById("create_expedition_button").addEventListener("click", () => {

    if( Player.getClasses().length === 0 ) {
        alert("No classes available. Please create classes first.");
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
        spanClassName.innerText = ` ${classInstance.name}: `;

        
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
});

