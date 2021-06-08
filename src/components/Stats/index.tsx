import styles from "./styles";
import { useHass } from "../../hooks";
import { FunctionalComponent } from "preact";
import { MonitoredCondition } from "../../types";
import { display } from "./utils";
import { renderDuration, renderETA, renderTemperature } from "./renderers";
import { HassEntity } from "home-assistant-js-websocket";
import { useRef } from "preact/hooks";

type StatProps = {
  condition: MonitoredCondition;
};

const Stat: FunctionalComponent<StatProps> = ({ condition }) => {
  return (
    <div style={styles.stat}>
      <p style={styles.statName}>{condition}</p>
      <p style={styles.statValue}>{display(condition)}</p>
    </div>
  );
};

const Stats = () => {
  const { config } = useHass();

  const conditionEntities: any = useRef({
    [MonitoredCondition.Bed]: null,
    [MonitoredCondition.ETA]: null,
    [MonitoredCondition.Status]: null,
    [MonitoredCondition.Hotend]: null,
    [MonitoredCondition.Elapsed]: null,
    [MonitoredCondition.Remaining]: null,
    [MonitoredCondition.Percentage]: null,
  });

  return (
    <div style={styles.stats}>
      <p style={styles.percentage}>{display(MonitoredCondition.Percentage)}</p>
      {config.monitored
        ?.filter((t) => t !== null && t !== undefined)
        .map((monitoredCondition) => (
          <Stat condition={monitoredCondition} />
        ))}
    </div>
  );
};

export default Stats;
