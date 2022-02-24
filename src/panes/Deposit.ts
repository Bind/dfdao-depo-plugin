import {
  Artifact,
  ArtifactId,
  artifactNameFromArtifact,
  ArtifactRarityNames,
  ArtifactTypeNames,
  EthAddress,
} from "@darkforest_eth/types";
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
  onClick: (artifactId: ArtifactId) => void
): HTMLDivElement {
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
      onClick(artifact.id);
    })
  );
  return row;
}

export const buildDepositArtifactPane = (
  container: HTMLDivElement,
  myArtifacts: Artifact[],
  onRowClick: (artifactId: ArtifactId) => void
) => {
  myArtifacts
    .map((a) => {
      return getArtifactDepositRow(a, onRowClick);
    })
    .forEach((r) => container.append(r));
};
