import { Depo } from "./typechain";
import { DEPO_ABI, DEPO_ADDRESS } from "./constants";
import { BigNumber as EthersBN } from "ethers";
import { DarkForest } from "@darkforest_eth/contracts/typechain";
import { ArtifactId, EthAddress } from "@darkforest_eth/types";
import {
  artifactIdFromEthersBN,
  artifactIdToDecStr,
} from "@darkforest_eth/serde";
import { LogDescription } from "ethers/lib/utils";
import GameManager from "@df/GameManager";
import { DepoState } from "./state";

declare const df: GameManager;

export function initializeState(state: DepoState, events: LogDescription[]) {
  // I bet this gets a bit gnarly if we are depositing a the same artifact multiple times
  events.forEach((e) => {
    if (e.name == "Deposit") {
      const artifactId: ArtifactId = artifactIdFromEthersBN(
        e.args[1] as EthersBN
      );
      state.addArtifact(artifactId);

      state.addDepositor(
        e.args[0],
        df.getArtifactWithId(artifactId)?.artifactType!
      );
      df.hardRefreshArtifact(artifactId);
    } else if (e.name == "Withdrawl") {
      const artifactId: ArtifactId = artifactIdFromEthersBN(
        e.args[1] as EthersBN
      );
      state.removeArtifact(artifactId);
      state.addWithdrawl(
        e.args[0],
        df.getArtifactWithId(artifactId)?.artifactType!
      );
      df.hardRefreshArtifact(artifactId);
    } else if (e.name == "Promote") {
      //@ts-ignore
      if ((e.args[1] as EthAddress) == df.getEthConnection().signer.address) {
        state.setUserPermissions("CAPTAIN");
      }
    }
  });

  return state;
}

export const initializeContract = async () => {
  const depo: Depo = await df.loadContract(DEPO_ADDRESS, DEPO_ABI);
  const state = new DepoState();

  const eventHandlers = {
    ["Deposit"]: (addr: string, rawArtifactId: EthersBN) => {
      const art = artifactIdFromEthersBN(rawArtifactId) as ArtifactId;
      df.hardRefreshArtifact(art);
      state.addArtifact(art);
      state.addDepositor(addr, df.getArtifactWithId(art)?.artifactType!);
      console.log("[NEW] deposit", art);
    },
    ["Withdrawl"]: (addr: string, rawArtifactId: EthersBN) => {
      const art = artifactIdFromEthersBN(rawArtifactId) as ArtifactId;
      state.removeArtifact(art);
      df.hardRefreshArtifact(art);
      df.getArtifactWithId(art)?.artifactType;
      state.addWithdrawl(addr, df.getArtifactWithId(art)?.artifactType!);
      console.log("[NEW] withdrawl", art);
    },
    ["Promote"]: (promotor: string, promoted: string) => {
      if ((promoted as EthAddress) == df.getAccount()) {
        state.setUserPermissions("CAPTAIN");
      }
    },
  };
  const ethConnection = df.getEthConnection();
  const filters = {
    address: DEPO_ADDRESS,

    filters: [
      depo.filters.Deposit(null, null).topics,
      depo.filters.Withdrawl(null, null).topics,
      depo.filters.Promote(null, null).topics,
    ],
  };
  ethConnection.subscribeToContractEvents(depo, eventHandlers, filters);
  const initialState = await df
    .getEthConnection()
    .getProvider()
    .getLogs({ fromBlock: 20744965, toBlock: "latest", ...filters })
    .then((logs) => {
      return logs.map((log) => depo.interface.parseLog(log));
    })
    .then((logs) => {
      return initializeState(state, logs);
    });

  const core: DarkForest = df.getContract();

  //@ts-ignore
  window.depoContract = depo;
  return {
    state: initialState,
    deposit: (artifactId: ArtifactId) => {
      // Transfers Artifact directly to Depo
      return core["safeTransferFrom(address,address,uint256)"](
        df.getAccount()!,
        DEPO_ADDRESS,
        artifactIdToDecStr(artifactId)
      );
    },
    withdraw: (artifactId: ArtifactId) => {
      return depo.withdrawArtifact(artifactIdToDecStr(artifactId));
    },
  };
};
