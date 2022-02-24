import {
  Artifact,
  ArtifactId,
  artifactNameFromArtifact,
  ArtifactRarityNames,
  ArtifactTypeNames,
  EthAddress,
} from "@darkforest_eth/types";
import { ContractTransaction } from "ethers";
import { Button, LineBreak, Row, Text } from "src/views/basics";
import GameManager from "@df/GameManager";

declare const df: GameManager;

function getDepositorRow(addr: string, deposits: number) {
  const row = Row();
  row.append(`${df.getTwitter(addr as EthAddress) || addr} ${deposits}`);
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

  container.append(Text("Top Artifact Contributors", "center"));
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
  myArtifacts
    .map((a) => {
      return getArtifactDepositRow(a, executeDeposit, forceRefresh);
    })
    .forEach((r) => container.append(r));
};
