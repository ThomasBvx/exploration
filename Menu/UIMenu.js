import { initializeUI as initializeUIClassCreation } from "../Class/UIClassCreation.js";
import { updateUI as initializeUICamp } from "../Camp/UICamp.js";
import { updateExpeditionCreationUI as initializeUIExpedition } from "../Expedition/UIExpeditionCreation.js";

const class_tab_button = document.getElementById("menu_classes_button");
const camp_tab_button = document.getElementById("menu_camp_button");
const expedition_tab_button = document.getElementById("menu_expedition_button");

const tabs = [
	{ button: class_tab_button, tabId: "class_tab", init: initializeUIClassCreation },
	{ button: camp_tab_button, tabId: "camp_tab", init: initializeUICamp },
	{ button: expedition_tab_button, tabId: "expedition_tab", init: initializeUIExpedition },
];

tabs.forEach(({ button, tabId, init }) => {
	button.addEventListener("click", () => {
		tabs.forEach(t => {
			document.getElementById(t.tabId).style.display = "none";
		});
		document.getElementById(tabId).style.display = "block";
		if (typeof init === "function") init();
	});
});