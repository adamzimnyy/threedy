import { createContext } from "preact";
import { HassContextValues } from "../types";

export const HassContext = createContext<Partial<HassContextValues>>({});
