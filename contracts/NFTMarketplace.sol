// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplace is Ownable, ReentrancyGuard {
    struct Listing {
        uint256 price;
        address seller;
    }

    uint256 public listingPrice = 0.01 ether;
    mapping(address => mapping(uint256 => Listing)) public listings;
    mapping(address => uint256) public earnings;

    event NFTListed(address indexed nftContract, uint256 indexed tokenId, uint256 price, address indexed seller);
    event NFTBought(address indexed nftContract, uint256 indexed tokenId, uint256 price, address indexed buyer, address seller);
    event EarningsWithdrawn(address indexed seller, uint256 amount);
    event ListingPriceUpdated(uint256 oldPrice, uint256 newPrice);

    // Function to update listing price
    function setListingPrice(uint256 _listingPrice) external onlyOwner {
        uint256 oldPrice = listingPrice;
        listingPrice = _listingPrice;
        emit ListingPriceUpdated(oldPrice, listingPrice);
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 price) external payable nonReentrant {
        require(price > 0, "Price must be greater than zero");
        require(msg.value >= listingPrice, "Insufficient listing price");
        
        IERC721 nft = IERC721(nftContract);
        require(nft.ownerOf(tokenId) == msg.sender, "You are not the owner");
        require(nft.getApproved(tokenId) == address(this) || nft.isApprovedForAll(msg.sender, address(this)), "Marketplace is not approved");

        listings[nftContract][tokenId] = Listing(price, msg.sender);

        emit NFTListed(nftContract, tokenId, price, msg.sender);
    }

    function buyNFT(address nftContract, uint256 tokenId) external payable nonReentrant {
        Listing memory listedItem = listings[nftContract][tokenId];
        require(listedItem.price > 0, "NFT is not for sale");
        require(msg.value >= listedItem.price, "Insufficient payment");

        // Transfer the NFT to the buyer
        IERC721(nftContract).safeTransferFrom(listedItem.seller, msg.sender, tokenId);

        // Update earnings for the seller
        earnings[listedItem.seller] += msg.value;

        // Remove the listing
        delete listings[nftContract][tokenId];

        emit NFTBought(nftContract, tokenId, listedItem.price, msg.sender, listedItem.seller);
    }

    function withdrawEarnings() external nonReentrant {
        uint256 amount = earnings[msg.sender];
        require(amount > 0, "No earnings to withdraw");

        earnings[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        emit EarningsWithdrawn(msg.sender, amount);
    }

    function withdrawListingFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Transfer failed");
    }

    function getListing(address nftContract, uint256 tokenId) external view returns (Listing memory) {
        return listings[nftContract][tokenId];
    }
}
