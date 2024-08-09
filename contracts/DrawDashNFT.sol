// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract DrawDashNFT is ERC721URIStorage {
    uint256 private _tokenIdCounter = 0;

    constructor() ERC721("Draw Dash NFT", "DDASH") {}

    function mintNFT(address recipient, string memory tokenUri) public returns (uint256) {
        _tokenIdCounter += 1;
        uint256 newTokenId = _tokenIdCounter;
        _safeMint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenUri);
        return newTokenId;
    }
}