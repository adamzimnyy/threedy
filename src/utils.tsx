import { MonitoredCondition, SuffixesType } from "./types";
import { HassEntity } from "home-assistant-js-websocket";
import { useHass } from "./hooks";

export const SUFFIXES: SuffixesType = {
  MQTT: {
    [MonitoredCondition.Bed]: "_bed_temperature",
    [MonitoredCondition.ETA]: "_print_time_left",
    [MonitoredCondition.Status]: "_print_status",
    [MonitoredCondition.Hotend]: "_tool_0_temperature",
    [MonitoredCondition.Elapsed]: "_print_time",
    [MonitoredCondition.Remaining]: "_print_time_left",
    [MonitoredCondition.Percentage]: "_print_progress",
  },
  OctoPrint: {
    [MonitoredCondition.Bed]: "_actual_bed_temp",
    [MonitoredCondition.ETA]: "_time_remaining",
    [MonitoredCondition.Status]: "_current_state",
    [MonitoredCondition.Hotend]: "_actual_tool0_temp",
    [MonitoredCondition.Elapsed]: "_time_elapsed",
    [MonitoredCondition.Remaining]: "_time_remaining",
    [MonitoredCondition.Percentage]: "_job_percentage",
  },
};

/**
 * Retrieves the corresponding Home Assistant entity of a given condition.
 * @param {MonitoredCondition} condition The condition of which to get the entity for.
 * @return {HassEntity | undefined} The Home Assistant entity if found.
 */
export const entityFromCondition = (
  condition: MonitoredCondition
): HassEntity | undefined => {
  const { hass, config } = useHass();

  const suffix = SUFFIXES[config.use_mqtt ? "MQTT" : "OctoPrint"][condition];
  const entityId = `${config.base_entity}${suffix}`;

  return hass.states[entityId];
};
