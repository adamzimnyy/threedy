import styles from "./styles";
import { useHass } from "../../hooks";
import { FunctionalComponent } from "preact";
import { MonitoredCondition } from "../../types";
import { display } from "./utils";

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

  return (
    <div style={styles.stats}>
      <p style={styles.percentage}>{display(MonitoredCondition.Percentage)}</p>
      {config.monitored.map((monitoredCondition) => (
        <Stat condition={monitoredCondition} />
      ))}
    </div>
  );
};

export default Stats;
