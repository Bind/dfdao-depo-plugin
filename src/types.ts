import { ArtifactType } from "@darkforest_eth/types";

export type UserPermission = "MAA" | "CAPTAIN" | "CADET";
export type DepoStateStatus = "LOADING" | "READY";
export type ArtifactCounter = {
  [key: ArtifactType]: number;
};
