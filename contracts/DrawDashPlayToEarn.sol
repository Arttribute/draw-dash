// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DrawDashPlayToEarn is Ownable {
    IERC20 public immutable asset;
    address public vault;
    uint256 public houseEdgeBasisPoints;

    event GamePlayed(address indexed player, uint256 stake, bool won, uint256 amountWon);

    constructor(IERC20 _asset, address _vault, uint256 _houseEdgeBasisPoints) {
        asset = _asset;
        vault = _vault;
        houseEdgeBasisPoints = _houseEdgeBasisPoints;
    }

    modifier onlyVault() {
        require(msg.sender == vault, "Caller is not the vault");
        _;
    }

    function playGame(uint256 stake, bool win) external {
        require(stake > 0, "Stake must be greater than zero");
        require(asset.balanceOf(msg.sender) >= stake, "Insufficient balance to stake");

        asset.transferFrom(msg.sender, vault, stake);

        if (win) {
            uint256 winnings = (stake * 2 * (10000 - houseEdgeBasisPoints)) / 10000; // Double or lose, minus house edge
            DrawDashGameVault(vault).provideLiquidity(winnings);
            asset.transfer(msg.sender, winnings);
            emit GamePlayed(msg.sender, stake, true, winnings);
        } else {
            uint256 loss = (stake * houseEdgeBasisPoints) / 10000; // House edge is taken from the loss
            uint256 remaining = stake - loss;
            DrawDashGameVault(vault).receiveFunds(remaining, true);
            emit GamePlayed(msg.sender, stake, false, 0);
        }
    }

    function setHouseEdge(uint256 _houseEdgeBasisPoints) external onlyOwner {
        require(_houseEdgeBasisPoints <= 10000, "House edge must be <= 100%");
        houseEdgeBasisPoints = _houseEdgeBasisPoints;
    }
}
