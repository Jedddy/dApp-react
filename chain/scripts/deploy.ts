import fs from "fs";
import { ethers } from "hardhat";

async function main() {
  const sociglobe = await ethers.deployContract("SociGlobe");

  await sociglobe.waitForDeployment();

  console.log(`SociGlobe contract deployed to ${sociglobe.target}`);

  saveFrontendFiles(sociglobe);
}

function saveFrontendFiles(contract: any) {
  const contractsDir = "../src/artifacts/contracts";

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ SociGlobe: contract.target }, undefined, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
