const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DrawDashGameVault", function () {
  let DrawDashGameVault,
    drawDashGameVault,
    assetToken,
    owner,
    gameContract,
    player;

  beforeEach(async function () {
    [owner, gameContract, player] = await ethers.getSigners();

    // Deploy mock ERC20 token
    const AssetToken = await ethers.getContractFactory("DrawMockToken");
    assetToken = await AssetToken.deploy();

    // Deploy DrawDashGameVault
    DrawDashGameVault = await ethers.getContractFactory("DrawDashGameVault");
    drawDashGameVault = await DrawDashGameVault.deploy(
      assetToken.address,
      "Vault",
      "VAULT",
      gameContract.address
    );
  });

  it("Should allow game contract to provide liquidity", async function () {
    await assetToken.transfer(
      drawDashGameVault.address,
      ethers.utils.parseEther("100")
    );
    await drawDashGameVault
      .connect(gameContract)
      .provideLiquidity(ethers.utils.parseEther("50"));
    expect(await assetToken.balanceOf(gameContract.address)).to.equal(
      ethers.utils.parseEther("50")
    );
  });

  it("Should receive funds and distribute profits", async function () {
    await assetToken.transfer(
      gameContract.address,
      ethers.utils.parseEther("50")
    );
    await assetToken
      .connect(gameContract)
      .approve(drawDashGameVault.address, ethers.utils.parseEther("50"));
    await drawDashGameVault
      .connect(gameContract)
      .receiveFunds(ethers.utils.parseEther("50"), true);

    expect(await drawDashGameVault.totalProfit()).to.equal(
      ethers.utils.parseEther("50")
    );
  });

  it("Should allow only the owner to set the game contract", async function () {
    await expect(
      drawDashGameVault.connect(player).setGameContract(player.address)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await drawDashGameVault.connect(owner).setGameContract(player.address);
    expect(await drawDashGameVault.gameContract()).to.equal(player.address);
  });
});
