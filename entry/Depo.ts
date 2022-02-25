import GameManager from "@df/GameManager";
import GameUIManager from "@df/GameUIManager";

declare const df: GameManager;
declare const ui: GameUIManager;
import { styles } from "../src/styles";
import { Artifact } from "@darkforest_eth/types";
import { autorun, toJS } from "mobx";
import { initializeContract } from "../src/lib";
import { Button, wipe, LineBreak } from "../src/views/basics";
import { DepoState } from "src/state";
import { DepoStateStatus } from "src/types";
import {
  buildDepositArtifactPane,
  buildDepositorSection,
  buildNoArtifactsToDepositPane,
} from "src/views/Deposit";
import { buildNoWithdrawlPane, buildWithdrawlPane } from "src/views/Withdraw";
type Pane = "withdraw" | "deposit";

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
    df.refreshTwitters();
    this.PaneController = document.createElement("div");
    this.PaneParent = document.createElement("div");
    this.DepositPane = document.createElement("div");
    this.WithdrawPane = document.createElement("div");
    this.LoadingPane = document.createElement("div");
    this.LoadingPane.innerText = "...loading...";
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
      const d = Button("Deposit", () => {
        this.togglePane("deposit");
      });
      styles.tabButton(d);
      this.PaneController?.append(d);
      const w = Button("Withdraw", () => {
        this.togglePane("withdraw");
      });
      styles.tabButton(w);
      this.PaneController?.append(w);
      this.PaneController?.append(LineBreak());
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

  setDepositPaneContent() {
    wipe(this.DepositPane);

    const myArtifacts = df
      .getMyArtifacts()
      .filter(isNotShip)
      .filter(isInWallet);
    if (myArtifacts.length === 0) {
      buildNoArtifactsToDepositPane(this.DepositPane);
    } else {
      buildDepositArtifactPane(
        this.DepositPane,
        myArtifacts,
        this.deposit,
        () => {
          this.refresh(this.state!);
        }
      );
    }
    if (!this.state?.depositors) return;
    buildDepositorSection(this.DepositPane, this.state.depositors);
  }

  setWithdrawPaneContent(state: DepoState) {
    wipe(this.WithdrawPane);
    const depoArtifacts = df
      .getArtifactsWithIds(Array.from(state.armory))
      .filter((a) => typeof a != "undefined");
    if (this.state?.armory.size == 0) {
      buildNoWithdrawlPane(this.WithdrawPane);
    } else {
      buildWithdrawlPane(this.WithdrawPane, depoArtifacts, this.withdraw);
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
