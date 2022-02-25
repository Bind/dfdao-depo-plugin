import { ArtifactId, ArtifactType, EthAddress } from "@darkforest_eth/types";
import { makeAutoObservable } from "mobx";
import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";
import { DepoStateStatus, UserPermission } from "./types";

declare const df: GameManager;
declare const ui: GameUIManager;

type ArtifactCounter = {
  [key: ArtifactType]: number;
};
export class DepoState {
  // Folks who have deposited & how many artifacts
  depositors: { [key: string]: ArtifactCounter } = {};
  // current deposits
  armory: Set<ArtifactId> = new Set();

  // df.getAccount() pemissions with the depo
  userPermissions: UserPermission = "CADET";

  // has the store processed all past events
  status: DepoStateStatus = "LOADING";

  constructor() {
    makeAutoObservable(this);
  }
  addDepositor(addr: string, type: ArtifactType) {
    if (!this.depositors[addr]) this.depositors[addr] = {};
    this.depositors[addr][type] = (this.depositors[addr]?.[type] || 0) + 1;
  }
  addWithdrawl(addr: string, type: ArtifactType) {
    if (!this.depositors[addr]) this.depositors[addr] = {};
    this.depositors[addr][type] = (this.depositors[addr][type] || 0) - 1;
  }
  removeArtifact(artifactId: ArtifactId) {
    this.armory.delete(artifactId);
  }
  addArtifact(artifactId: ArtifactId) {
    console.log("add artifact", artifactId);
    this.armory.add(artifactId);
  }
  setUserPermissions(permission: UserPermission) {
    this.userPermissions = permission;
  }
  setStatus(status: DepoStateStatus) {
    this.status = status;
  }
}
