import { HassEntity } from "home-assistant-js-websocket";
import { MonitoredCondition } from "../../types";
import { entityFromCondition } from "../../utils";
import {
  renderDuration,
  renderETA,
  renderPercentage,
  renderTemperature,
} from "./renderers";

const RENDERERS = {
  [MonitoredCondition.Bed]: renderTemperature,
  [MonitoredCondition.ETA]: renderETA,
  [MonitoredCondition.Status]: (e: HassEntity) => e.state,
  [MonitoredCondition.Hotend]: renderTemperature,
  [MonitoredCondition.Elapsed]: (e: HassEntity) => renderDuration(e, 1),
  [MonitoredCondition.Remaining]: (e: HassEntity) => renderDuration(e, -1),
  [MonitoredCondition.Percentage]: (e: HassEntity) => renderPercentage(e),
};

/**
 * Function to get the rendered value of a given condition.
 * @param {MonitoredCondition} condition The condition to render.
 * @return {string} The rendered condition string.
 */
export const display = (condition: MonitoredCondition) => {
  const entity = entityFromCondition(condition);
  const renderer = RENDERERS[condition];

  if (entity === undefined) return "Unknown";

  return renderer(entity);
};
