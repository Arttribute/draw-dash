const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DrawDashPlayToEarn", function () {
  let DrawDashPlayToEarn, drawDashPlayToEarn, assetToken, owner, vault, player;

  beforeEach(async function () {
    [owner, vault, player] = await ethers.getSigners();

    // Deploy mock ERC20 token
    const AssetToken = await ethers.getContractFactory("DrawMockToken");
    assetToken = await AssetToken.deploy();

    // Deploy DrawDashGameVault (mock implementation)
    const DrawDashGameVault = await ethers.getContractFactory(
      "DrawDashGameVault"
    );
    vaultContract = await DrawDashGameVault.deploy(
      assetToken.address,
      "Vault",
      "VAULT",
      owner.address
    );

    // Deploy DrawDashPlayToEarn
    DrawDashPlayToEarn = await ethers.getContractFactory("DrawDashPlayToEarn");
    drawDashPlayToEarn = await DrawDashPlayToEarn.deploy(
      assetToken.address,
      vaultContract.address,
      500
    ); // 5% house edge

    // Approve spending for the player
    await assetToken.transfer(player.address, ethers.utils.parseEther("100"));
    await assetToken
      .connect(player)
      .approve(drawDashPlayToEarn.address, ethers.utils.parseEther("100"));
  });

  it("Should transfer the correct amount to the vault when player loses", async function () {
    await drawDashPlayToEarn
      .connect(player)
      .playGame(ethers.utils.parseEther("10"), false);
    expect(await assetToken.balanceOf(vaultContract.address)).to.equal(
      ethers.utils.parseEther("10")
    );
  });

  it("Should transfer winnings to the player when they win", async function () {
    await drawDashPlayToEarn
      .connect(player)
      .playGame(ethers.utils.parseEther("10"), true);
    const winnings = ethers.utils.parseEther("19"); // Considering 5% house edge
    expect(await assetToken.balanceOf(player.address)).to.equal(winnings);
  });

  it("Should only allow the owner to set house edge", async function () {
    await expect(
      drawDashPlayToEarn.connect(player).setHouseEdge(1000)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await drawDashPlayToEarn.connect(owner).setHouseEdge(1000);
    expect(await drawDashPlayToEarn.houseEdgeBasisPoints()).to.equal(1000);
  });
});
