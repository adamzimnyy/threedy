import { useHass } from "../../hooks";
import { capitalize } from "lodash";

import styles from "./styles";

import { MonitoredCondition, StatusColor } from "../../types";
import { entityFromCondition } from "../../utils";
import { FunctionalComponent } from "preact";

const STATUS_CIRCLE_COLORS: any = {
  Printing: StatusColor.Active,
  unknown: StatusColor.Error,
  Operational: StatusColor.Ok,
};

type HeaderProps = {
  toggleVisibleOverride(): void;
};

const Header: FunctionalComponent<HeaderProps> = ({
  toggleVisibleOverride,
}) => {
  const { config } = useHass();

  const printerStatus = entityFromCondition(MonitoredCondition.Status);

  const statusCircleColor =
    STATUS_CIRCLE_COLORS[printerStatus!.state] || StatusColor.Idle;

  const name =
    config.name !== undefined
      ? config.name!
      : config.base_entity !== undefined
      ? capitalize(config.base_entity!.substring(7).replace(/_/g, " "))
      : "Unknown";

  const togglePowerEntity = () => {
    console.log("Power");
  };
  const toggleLightEntity = () => {
    console.log("Light");
  };

  return (
    <div style={styles.header}>
      <div style={styles.buttonContainer}>
        {config.power_entity !== undefined ? (
          <button style={styles.button} onClick={togglePowerEntity}></button>
        ) : null}
      </div>
      <button style={styles.button} onClick={toggleVisibleOverride}>
        <div style={styles.nameContainer}>
          <div
            style={{
              ...styles.statusCircle,
              backgroundColor: statusCircleColor,
            }}
          ></div>
          <p style={styles.name}>{name}</p>
        </div>
      </button>
      <div style={styles.buttonContainer}>
        {config.light_entity !== undefined ? (
          <button style={styles.button} onClick={toggleLightEntity}></button>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
