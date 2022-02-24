import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";

declare const df: GameManager;
declare const ui: GameUIManager;

import {
  Artifact,
  ArtifactTypeNames,
  artifactNameFromArtifact,
  ArtifactRarityNames,
  EthAddress,
} from "@darkforest_eth/types";
import { autorun, toJS } from "mobx";
import { initializeContract } from "../src/lib";
import { Button, Row, wipe, Text, LineBreak } from "../src/views/basics";
import { DepoState } from "src/state";
import { DepoStateStatus } from "src/types";
type Pane = "withdraw" | "deposit" | "loading";

const isNotShip = (artifact: Artifact) => {
  return artifact.artifactType < 10;
};
const isInWallet = (artifact: Artifact) => {
  return !artifact.onPlanetId;
};

class Plugin {
  state: DepoState | undefined;
  container: HTMLDivElement | undefined;
  PaneController: HTMLDivElement;
  PaneParent: HTMLDivElement;
  DepositPane: HTMLDivElement;
  WithdrawPane: HTMLDivElement;
  LoadingPane: HTMLDivElement;
  withdraw: any;
  deposit: any;
  pane: Pane = "deposit";
  status: DepoStateStatus = "LOADING";
  constructor() {
    this.PaneController = document.createElement("div");
    this.PaneParent = document.createElement("div");
    this.DepositPane = document.createElement("div");
    this.WithdrawPane = document.createElement("div");
    this.LoadingPane = document.createElement("div");
    this.LoadingPane.innerText = "...loading...";
    this.getArtifactWithdrawRow = this.getArtifactWithdrawRow.bind(this);
    this.getArtifactDepositRow = this.getArtifactDepositRow.bind(this);
    this.setPaneParentContent = this.setPaneParentContent.bind(this);
    this.refresh = this.refresh.bind(this);
    this.initialize = this.initialize.bind(this);
    this.initialize();
  }
  async initialize() {
    const { state, withdraw, deposit } = await initializeContract();
    autorun(() => {
      this.refresh(toJS(state));
      this.state = toJS(state);
    });
    this.status = "READY";
    this.state = toJS(state);
    this.withdraw = withdraw;
    this.deposit = deposit;
    this.refresh(this.state);
    //@ts-ignore
    window.depoState = state;
  }

  togglePane(pane: Pane) {
    this.pane = pane;
    this.setPaneParentContent();
  }

  setPaneControllerContent() {
    if (this.state?.userPermissions == "CAPTAIN") {
      this.PaneController!.innerHTML = "";
      this.PaneController?.append(
        Button("Deposit", () => {
          this.togglePane("deposit");
        })
      );
      this.PaneController?.append(
        Button("Withdraw", () => {
          this.togglePane("withdraw");
        })
      );
    }
  }
  setPaneParentContent() {
    wipe(this.PaneParent);
    if (this.status == "LOADING") {
      this.PaneParent.append(this.LoadingPane);
    } else if (this.pane == "deposit") {
      this.setDepositPaneContent();
      this.PaneParent.append(this.DepositPane);
    } else {
      this.setWithdrawPaneContent(this.state!);
      this.PaneParent.append(this.WithdrawPane);
    }
  }
  getDepositorRow(addr: string, deposits: number) {
    const row = Row();
    row.append(`${df.getTwitter(addr as EthAddress) || addr} ${deposits}`);
    return row;
  }
  getArtifactDepositRow(artifact: Artifact): HTMLDivElement {
    const row = Row();

    row.append(
      (document.createElement("text").innerHTML = `${artifactNameFromArtifact(
        artifact
      )} ${ArtifactRarityNames[artifact.rarity]} ${
        ArtifactTypeNames[artifact.artifactType]
      }`)
    );
    row.append(
      Button("deposit me", () => {
        this.deposit(artifact.id);
      })
    );
    return row;
  }

  setDepositPaneContent() {
    wipe(this.DepositPane);
    const myArtifacts = df
      .getMyArtifacts()
      .filter(isNotShip)
      .filter(isInWallet);
    if (myArtifacts.length === 0) {
      this.DepositPane.innerText = "No Artifacts to deposit";
    } else {
      myArtifacts
        .map(this.getArtifactDepositRow)
        .forEach((r) => this.DepositPane.append(r));
    }
    const Contributors = document.createElement("div");
    if (!this.state?.depositors) return;
    Object.keys(this.state.depositors)
      .sort((a, b) => {
        return this.state!.depositors[b]! - this.state!.depositors[a];
      })
      .map((addr) => this.getDepositorRow(addr, this.state!.depositors[addr]))
      .forEach((row) => Contributors.append(row));
    this.DepositPane.append(LineBreak());
    this.DepositPane.append(LineBreak());

    this.DepositPane.append(Text("Top Artifact Contributors", "center"));
    this.DepositPane.append(LineBreak());
    this.DepositPane.append(Contributors);
  }
  getArtifactWithdrawRow(artifact: Artifact): HTMLDivElement {
    const row = Row();

    row.append(
      (document.createElement("text").innerHTML = `${artifactNameFromArtifact(
        artifact
      )} ${ArtifactRarityNames[artifact.rarity]} ${
        ArtifactTypeNames[artifact.artifactType]
      }`)
    );

    row.append(
      Button("withdraw me", () => {
        this.withdraw(artifact.id);
      })
    );
    return row;
  }

  setWithdrawPaneContent(state: DepoState) {
    wipe(this.WithdrawPane);
    const deposited = df.getArtifactsWithIds(Array.from(state.armory));
    if (this.state?.armory.size == 0) {
      this.WithdrawPane.innerText = "No Artifacts in the Depo";
    } else {
      deposited
        .map(this.getArtifactWithdrawRow)
        .forEach((r) => this.WithdrawPane.append(r));
    }
  }

  refresh(state: DepoState) {
    this.state = state;
    this.setPaneControllerContent();
    this.setPaneParentContent();
  }
  /**
   * Called when plugin is launched with the "run" button.
   */
  async render(container: HTMLDivElement) {
    this.container = container;
    container.style.width = "380px";
    this.setPaneControllerContent();
    this.setPaneParentContent();

    container.append(this.PaneController!);
    container.append(this.PaneParent!);
    // df.getMyArtifacts().filter((a: Artifact) => );
  }

  /**
   * Called when plugin modal is closed.
   */
  destroy() {
    delete this.state;
  }
}

/**
 * And don't forget to export it!
 */
export default Plugin;
