import {
  Artifact,
  ArtifactId,
  artifactNameFromArtifact,
  ArtifactRarityNames,
  ArtifactTypeNames,
} from "@darkforest_eth/types";
import { ContractTransaction } from "ethers";
import { Button, Row } from "src/views/basics";
import GameManager from "@df/GameManager";

declare const df: GameManager;

export const buildNoWithdrawlPane = (container: HTMLDivElement) => {
  container.innerText = "No Artifacts in the Depo";
};

function getArtifactWithdrawRow(
  artifact: Artifact,
  executeWithdrawl: (artifactId: ArtifactId) => Promise<ContractTransaction>
): HTMLDivElement {
  const row = Row();

  row.append(
    (document.createElement("text").innerHTML = `${artifactNameFromArtifact(
      artifact
    )} ${ArtifactRarityNames[artifact.rarity]} ${
      ArtifactTypeNames[artifact.artifactType]
    }`)
  );

  const b = Button("withdraw me");
  b.onclick = async () => {
    b.disabled = true;
    const tx = await executeWithdrawl(artifact.id);
    b.innerHTML = "Submitting";
    await tx.wait();
    b.innerHTML = "confirmed";
    df.hardRefreshArtifact(artifact.id);
  };

  row.append(b);
  return row;
}

export const buildWithdrawlPane = (
  container: HTMLDivElement,
  depoArtifacts: (Artifact | undefined)[],
  executeWithdrawl: (artifactId: ArtifactId) => Promise<ContractTransaction>
) => {
  depoArtifacts
    .filter((a) => !!a)
    .map((a: Artifact) => getArtifactWithdrawRow(a, executeWithdrawl))
    .forEach((r) => container.append(r));
};
