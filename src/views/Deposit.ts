import {
  Artifact,
  ArtifactId,
  artifactNameFromArtifact,
  ArtifactRarityNames,
  ArtifactType,
  ArtifactTypeNames,
  EthAddress,
} from "@darkforest_eth/types";

import { ContractTransaction } from "ethers";
import { Box, Button, LineBreak, Row, Text } from "src/views/basics";
import GameManager from "@df/GameManager";
import { styles, s } from "src/styles";
import { ArtifactCounter } from "src/types";
import { _isComputed } from "mobx/dist/internal";

declare const df: GameManager;

function countArtifacts(counter: ArtifactCounter) {
  return Object.keys(counter).reduce((acc, k) => acc + counter[k], 0);
}

function countWH(counter: ArtifactCounter) {
  return counter?.[ArtifactType.Wormhole] || 0;
}
function countNotWH(counter: ArtifactCounter) {
  return Object.keys(counter)
    .filter((k) => k != ArtifactType.Wormhole.toString())
    .reduce((acc, k) => acc + counter[k], 0);
}

function getDepositorRow(addr: string, deposits: ArtifactCounter) {
  const row = Row();
  row.append(
    Box(
      df.getTwitter(addr.toLowerCase() as EthAddress) ||
        addr.slice(0, 5).concat("...")
    )
  );
  let bookend = Row();
  let whs = countWH(deposits);
  if (whs > 0) {
    bookend.append(
      styles.emph(Box(whs + (whs > 1 ? " wormholes" : " wormhole")))
    );
  }
  bookend.append(
    styles.space(Box(countNotWH(deposits) + " other"), "left", "12px")
  );
  row.append(bookend);

  return row;
}

export const buildDepositorSection = (
  container: HTMLDivElement,
  depositors: { [key: string]: ArtifactCounter }
) => {
  const Contributors = document.createElement("div");
  Object.keys(depositors)
    .sort((a, b) => {
      return countArtifacts(depositors[b])! - countArtifacts(depositors[a]);
    })
    .filter((a) => countArtifacts(depositors[a]) > 0)
    .map((addr) => getDepositorRow(addr, depositors[addr]))
    .forEach((row) => Contributors.append(row));
  container.append(LineBreak());
  container.append(LineBreak());
  const header = styles.header(Text("Top Artifact Contributors", "center"));
  container.append(header);
  container.append(LineBreak());
  container.append(Contributors);
};

export const buildNoArtifactsToDepositPane = (container: HTMLDivElement) => {
  container.innerText = "No Artifacts to deposit";
  return container;
};

function getArtifactDepositRow(
  artifact: Artifact,
  executeDeposit: (artifactId: ArtifactId) => Promise<ContractTransaction>,
  forceRefresh: () => void
): HTMLDivElement {
  const row = Row();

  row.append(
    (document.createElement("text").innerHTML = `${artifactNameFromArtifact(
      artifact
    )} ${ArtifactRarityNames[artifact.rarity]} ${
      ArtifactTypeNames[artifact.artifactType]
    }`)
  );
  const b = Button("deposit me");
  b.onclick = async () => {
    b.disabled = true;
    const tx = await executeDeposit(artifact.id);
    b.innerHTML = "Submitting";
    await tx.wait();
    b.innerHTML = "confirmed";
    await df.hardRefreshArtifact(artifact.id);
    forceRefresh();
  };

  row.append(b);
  return row;
}

export const buildDepositArtifactPane = (
  container: HTMLDivElement,
  myArtifacts: Artifact[],
  executeDeposit: (artifactId: ArtifactId) => Promise<ContractTransaction>,
  forceRefresh: () => void
) => {
  const header = styles.header(Text("Wormholes will help the most!"));
  container.append(header);
  container.append(LineBreak());
  myArtifacts
    .map((a) => {
      return getArtifactDepositRow(a, executeDeposit, forceRefresh);
    })
    .forEach((r) => container.append(r));
};
