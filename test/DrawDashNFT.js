const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DrawDashNFT", function () {
  let DrawDashNFT, drawDashNFT, owner, player;

  beforeEach(async function () {
    [owner, player] = await ethers.getSigners();

    // Deploy DrawDashNFT
    DrawDashNFT = await ethers.getContractFactory("DrawDashNFT");
    drawDashNFT = await DrawDashNFT.deploy();
  });

  it("Should mint an NFT to the correct address with a token URI", async function () {
    const tokenUri = "https://example.com/metadata/1";
    const tokenId = await drawDashNFT.mintNFT(player.address, tokenUri);
    expect(await drawDashNFT.tokenURI(tokenId.value)).to.equal(tokenUri);
  });
});
