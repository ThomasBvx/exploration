import Class from "./Class/classes.js";
import Player from "./Player/player.js";

const knight = new Class("knight", 10, 10, 10, 10, 10, 10, 10, 10, 10)
console.log(knight.name)
console.log(knight.leadership)

console.log(Player.getAttributePoints());
Player.setAttributePoints(20);
console.log(Player.getAttributePoints());