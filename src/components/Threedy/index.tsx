import { useState } from "preact/hooks";
import { motion } from "framer-motion";

import styles from "./styles";

import Stats from "../Stats";
import Header from "../Header";

import { MonitoredCondition } from "../../types";
import { entityFromCondition } from "../../utils";

const variants = {
  visible: { opacity: 1, scale: 1, height: "auto" },
  hidden: { opacity: 0, scale: 0, height: 0 },
};

const Threedy = () => {
  const [visibleOverride, setVisibleOverride] = useState(false);

  const printerStatus = entityFromCondition(MonitoredCondition.Status)?.state;

  const visible = printerStatus === "Printing" || visibleOverride;

  const toggleVisibleOverride = () => setVisibleOverride((v) => !v);

  return (
    <div
      style={{
        ...styles.card,
        gap: visible ? 24 : 0,
      }}
    >
      <Header toggleVisibleOverride={toggleVisibleOverride} />
      <motion.div
        transition={{ ease: "easeInOut", duration: 0.25 }}
        style={styles.horizontal}
        variants={variants}
        initial={"hidden"}
        animate={visible ? "visible" : "hidden"}
      >
        <div style={styles.printerView}></div>
        <div style={styles.statsView}>
          <Stats />
        </div>
      </motion.div>
    </div>
  );
};

export default Threedy;
