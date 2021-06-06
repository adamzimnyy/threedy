import { HomeAssistant } from "custom-card-helpers";
import { ThreedyCard } from "./ThreedyCard";

export interface CustomCard {
  type: string;
  name: string;
  description: string;
  preview: boolean;
}

export interface HassWindow extends Window {
  customCards: CustomCard[];
}

export enum MonitoredCondition {
  Status = "Status",
  ETA = "ETA",
  Elapsed = "Elapsed",
  Hotend = "Hotend",
  Bed = "Bed",
  Remaining = "Remaining",
  Percentage = "Percentage",
}

export enum TemperatureUnit {
  F = "F",
  C = "C",
  K = "K",
}

export type SuffixesType = {
  [key: string]: {
    [MonitoredCondition.Bed]: string;
    [MonitoredCondition.ETA]: string;
    [MonitoredCondition.Elapsed]: string;
    [MonitoredCondition.Hotend]: string;
    [MonitoredCondition.Status]: string;
    [MonitoredCondition.Remaining]: string;
    [MonitoredCondition.Percentage]: string;
  };
};

export enum StatusColor {
  Active = "#4caf50",
  Error = "#f44336",
  Ok = "#00bcd4",
  Idle = "#ffc107",
}

export interface ThreedyConfig {
  monitored: MonitoredCondition[];
  base_entity?: string;

  name?: string;
  use_mqtt?: boolean;
  use_24hr?: boolean;
  exact_time?: boolean;
  round_percentage?: boolean;
  round_temperature?: boolean;
  temperature_unit?: TemperatureUnit;
  light_entity?: string;
  power_entity?: string;
}

export interface HassContextValues {
  hass: HomeAssistant | undefined;
  config: ThreedyConfig | undefined;
  card: ThreedyCard | undefined;
}

export interface Hass {
  hass: HomeAssistant;
  config: ThreedyConfig;
  card: ThreedyCard;
}
