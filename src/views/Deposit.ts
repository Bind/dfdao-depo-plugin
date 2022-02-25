import {
  Artifact,
  ArtifactId,
  artifactNameFromArtifact,
  ArtifactRarityNames,
  ArtifactTypeNames,
  EthAddress,
} from "@darkforest_eth/types";

import { ContractTransaction } from "ethers";
import { Box, Button, LineBreak, Row, Text } from "src/views/basics";
import GameManager from "@df/GameManager";
import { styles } from "src/styles";

declare const df: GameManager;

function getDepositorRow(addr: string, deposits: number) {
  const row = Row();
  row.append(Box(df.getTwitter(addr.toLowerCase() as EthAddress) || addr));
  row.append(Box("" + deposits));
  return row;
}

export const buildDepositorSection = (
  container: HTMLDivElement,
  depositors: { [key: string]: number }
) => {
  const Contributors = document.createElement("div");
  Object.keys(depositors)
    .sort((a, b) => {
      return depositors[b]! - depositors[a];
    })
    .filter((a) => depositors[a] > 0)
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
