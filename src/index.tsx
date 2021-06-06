import { ThreedyCard } from "./ThreedyCard";
import { HassWindow } from "./types";

declare let window: HassWindow;

customElements.define("threedy-card", ThreedyCard);

window.customCards.push({
  type: "threedy-card",
  name: "Threedy Card",
  description: "OctoPrint 3D Printer Index",
  preview: false,
});
