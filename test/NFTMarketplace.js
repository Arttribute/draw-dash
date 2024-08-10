const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarketplace", function () {
  let NFTMarketplace,
    DrawDashNFT,
    nftMarketplace,
    drawDashNFT,
    owner,
    seller,
    buyer;

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners();

    // Deploy DrawDashNFT
    DrawDashNFT = await ethers.getContractFactory("DrawDashNFT");
    drawDashNFT = await DrawDashNFT.deploy();

    // Deploy NFTMarketplace
    NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    nftMarketplace = await NFTMarketplace.deploy();

    // Mint an NFT to the seller
    await drawDashNFT.mintNFT(seller.address, "https://example.com/metadata/1");
  });

  it("Should allow a seller to list an NFT", async function () {
    await drawDashNFT.connect(seller).approve(nftMarketplace.address, 1);
    await nftMarketplace
      .connect(seller)
      .listNFT(drawDashNFT.address, 1, ethers.utils.parseEther("1"), {
        value: ethers.utils.parseEther("0.01"),
      });

    const listing = await nftMarketplace.getListing(drawDashNFT.address, 1);
    expect(listing.price).to.equal(ethers.utils.parseEther("1"));
    expect(listing.seller).to.equal(seller.address);
  });

  it("Should allow a buyer to buy a listed NFT", async function () {
    await drawDashNFT.connect(seller).approve(nftMarketplace.address, 1);
    await nftMarketplace
      .connect(seller)
      .listNFT(drawDashNFT.address, 1, ethers.utils.parseEther("1"), {
        value: ethers.utils.parseEther("0.01"),
      });

    await nftMarketplace
      .connect(buyer)
      .buyNFT(drawDashNFT.address, 1, { value: ethers.utils.parseEther("1") });

    expect(await drawDashNFT.ownerOf(1)).to.equal(buyer.address);
    expect(await nftMarketplace.earnings(seller.address)).to.equal(
      ethers.utils.parseEther("1")
    );
  });

  it("Should allow a seller to withdraw earnings", async function () {
    await drawDashNFT.connect(seller).approve(nftMarketplace.address, 1);
    await nftMarketplace
      .connect(seller)
      .listNFT(drawDashNFT.address, 1, ethers.utils.parseEther("1"), {
        value: ethers.utils.parseEther("0.01"),
      });

    await nftMarketplace
      .connect(buyer)
      .buyNFT(drawDashNFT.address, 1, { value: ethers.utils.parseEther("1") });

    const initialBalance = await ethers.provider.getBalance(seller.address);
    await nftMarketplace.connect(seller).withdrawEarnings();
    const finalBalance = await ethers.provider.getBalance(seller.address);

    expect(finalBalance.sub(initialBalance)).to.be.closeTo(
      ethers.utils.parseEther("1"),
      ethers.utils.parseEther("0.01")
    );
  });
});
