import { HassContext } from "../../contexts";
import { FunctionalComponent } from "preact";
import { HassContextValues } from "../../types";

import Loading from "../Loading";
import Threedy from "../Threedy";

const Root: FunctionalComponent<HassContextValues> = ({
  hass,
  card,
  config,
}) => {
  const loaded =
    hass !== undefined && card !== undefined && config !== undefined;

  return (
    <HassContext.Provider value={{ hass, card, config }}>
      {/* @ts-ignore */}
      <ha-card>
        {loaded ? <Threedy /> : <Loading />}
        {/* @ts-ignore */}
      </ha-card>
    </HassContext.Provider>
  );
};

export default Root;
