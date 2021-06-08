import { HomeAssistant } from "custom-card-helpers";
import { render } from "preact";
import Root from "./components/Root";

export class ThreedyCard extends HTMLElement {
  _hass: HomeAssistant | undefined;
  _config: any;

  _render() {
    render(<Root hass={this._hass} config={this._config} card={this} />, this);
  }
  _derender() {
    this.innerHTML = "";
    render("", this);
  }

  connectedCallback() {
    this._render();
  }

  disconnectedCallback() {
    this._derender();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._render();
  }

  setConfig(config: any) {
    this._config = config;
    this._render();
  }

  getCardSize() {
    return 2;
  }
}
