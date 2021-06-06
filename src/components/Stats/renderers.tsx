import { useEffect, useState } from "preact/hooks";
import { HassEntity } from "home-assistant-js-websocket";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import { useHass } from "../../hooks";
import { TemperatureUnit } from "../../types";

// Load needed dayjs plugins
dayjs.extend(duration);
dayjs.extend(relativeTime);

// Time Constants
const S_IN_MIN = 60;
const S_IN_HR = 60 * 60;
const S_IN_DAY = 24 * 60 * 60;

/**
 * Mathematical functions to convert between temperature scales.
 * In the format of TEMPERATURE_CONVERSIONS[fromUnit][toUnit]
 * E.g. TEMPERATURE_CONVERSIONS["F"]["C"]
 *      |=> (t: number) => ((t - 32.0) * 5.0) / 9.0
 */
const TEMPERATURE_CONVERSIONS: any = {
  [TemperatureUnit.C]: {
    [TemperatureUnit.F]: (t: number) => (t * 9.0) / 5.0 + 32.0,
    [TemperatureUnit.K]: (t: number) => t + 273.15,
  },
  [TemperatureUnit.F]: {
    [TemperatureUnit.C]: (t: number) => ((t - 32.0) * 5.0) / 9.0,
    [TemperatureUnit.K]: (t: number) => ((t - 32.0) * 5.0) / 9.0 + 273.15,
  },
  /* finger lickin' good */
  [TemperatureUnit.K]: {
    [TemperatureUnit.F]: (t: number) => ((t - 273.15) * 9.0) / 5.0 + 32.0,
    [TemperatureUnit.C]: (t: number) => t - 273.15,
  },
};

/**
 * Renders a temperature string from a given (supported) Home Assistant Entity.
 * @param {HassEntity} entity The temperature entity to render.
 * @return {string} The formatted temperature string with respect to user's configuration.
 */
export const renderTemperature = (entity: HassEntity) => {
  const { config } = useHass();

  const rawTemperature = parseFloat(entity.state);
  const rawUnit = entity.attributes.unit_of_measurement?.substring(1);
  const desiredUnit = config.temperature_unit;

  if (
    desiredUnit === undefined ||
    desiredUnit === rawUnit ||
    !TEMPERATURE_CONVERSIONS[rawUnit!].hasOwnProperty(desiredUnit)
  )
    return `${
      config.round_temperature === true
        ? Math.round(rawTemperature)
        : rawTemperature
    }°${rawUnit}`;

  const convertedTemperature =
    TEMPERATURE_CONVERSIONS[rawUnit!][desiredUnit](rawTemperature);

  return `${
    config.round_temperature === true
      ? Math.round(convertedTemperature)
      : convertedTemperature.toFixed(2)
  }°${config.temperature_unit}`;
};

/**
 * Converts a given duration in seconds to a readable string.
 * @param {number} seconds The duration to format given in seconds.
 * @return {string} The formatted, readable duration string.
 */
const _formatDuration = (seconds: number) => {
  const { config } = useHass();

  // Use dayjs' `humanize` if we don't care about exact time
  if (!config.exact_time) {
    return dayjs
      .duration({
        seconds,
      })
      .humanize();
  }

  // Calculate each component of the time
  const days = Math.floor(seconds / S_IN_DAY);
  seconds %= S_IN_DAY;

  const hours = Math.floor(seconds / S_IN_HR);
  seconds %= S_IN_HR;

  const minutes = Math.floor(seconds / S_IN_MIN);
  seconds %= S_IN_MIN;

  // We conditionally render each part of the string based on whether or not they:
  // a) Are significant (>0)
  // b) Are sub-units of another part (e.g. if hours is 2, hours is rendered. If minutes is 0, we should still render it).
  const daysString = days > 0 ? `${days}d ` : "";
  const hoursString = hours > 0 || daysString.length > 0 ? `${hours}h ` : "";
  const minutesString =
    minutes > 0 || hoursString.length > 0 ? `${minutes}m ` : "";
  const secondsString =
    seconds > 0 || minutesString.length > 0 ? `${seconds}s` : "";

  return secondsString.length > 0
    ? `${daysString}${hoursString}${minutesString}${secondsString}`
    : "None";
};

/**
 * Renders a duration string from a given (supported) Home Assistant entity.
 * Updates every second.
 * @param {HassEntity} entity The duration entity to render.
 * @param {number} dir The "direction" to modify time in. (e.g., a `dir` of 1 will increment, -1 will decrement.
 * @return The formatted duration string with respect to the user's configuration.
 */
export const renderDuration = (entity: HassEntity, dir: number) => {
  const [seconds, setSeconds] = useState(parseInt(entity.state));

  const modTime = () => {
    setSeconds((s) => {
      const ns = s + dir;
      return ns < 0 ? 0 : ns;
    });
  };

  useEffect(() => {
    setSeconds(parseInt(entity.state));
  }, [entity]);

  useEffect(() => {
    const intervalId = setInterval(modTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return _formatDuration(seconds);
};

/**
 * Renders an estimated time of arrival (ETA) string from a (supported) Home Assistant entity.
 * @param {HassEntity} entity The ETA entity to render.
 * @return The formatted ETA string with respect to the user's configuration.
 */
export const renderETA = (entity: HassEntity) => {
  const { config } = useHass();

  return dayjs()
    .add(parseInt(entity.state), "seconds")
    .format(config.use_24hr ? "HH:mm" : "h:mm a");
};

/**
 * Renders a percentage string from a (supported) Home Assistant entity.
 * @param {HassEntity} entity The percentage entity to render.
 * @return The formatted percentage string with respect to the user's configuration.
 */
export const renderPercentage = (entity: HassEntity) => {
  const { config } = useHass();

  const percentage = parseFloat(entity.state);

  return `${
    config.round_percentage === true ? Math.round(percentage) : percentage
  }%`;
};
