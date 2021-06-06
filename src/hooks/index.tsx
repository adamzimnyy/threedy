import { useContext } from "preact/hooks";
import { HassContext } from "../contexts";
import { Hass, HassContextValues } from "../types";

export const useHass = (): Hass => {
  const hass: Partial<HassContextValues> = useContext(HassContext);
  return hass as Hass;
};
