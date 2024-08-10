// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract DrawDashGameVault is ERC4626, Ownable {
    using SafeERC20 for IERC20;

    address public gameContract;
    uint256 public totalProfit;

    mapping(address => bool) private _holders;
    address[] private _holdersList;

    event ProfitDistributed(uint256 profit, uint256 totalAssets);

    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol,
        address _gameContract
    ) ERC4626(_asset) ERC20(_name, _symbol)Ownable(msg.sender){
        gameContract = _gameContract;
    }

    modifier onlyGameContract() {
        require(msg.sender == gameContract, "Caller is not the game contract");
        _;
    }

    function provideLiquidity(uint256 amount) external onlyGameContract {
        require(amount <= totalAssets(), "Insufficient assets in the vault");
        IERC20(asset()).safeTransfer(gameContract, amount);
    }

    function receiveFunds(uint256 amount, bool isProfit) external onlyGameContract {
        IERC20(asset()).safeTransferFrom(gameContract, address(this), amount);
        if (isProfit) {
            totalProfit += amount;
            emit ProfitDistributed(amount, totalAssets());
        }
    }

    function distributeProfit() external onlyOwner {
        require(totalProfit > 0, "No profit to distribute");
        uint256 totalSupply = totalAssets();
        for (uint256 i = 0; i < _holdersList.length; i++) {
            address account = _holdersList[i];
            uint256 share = balanceOf(account);
            uint256 reward = (share * totalProfit) / totalSupply;
            if (reward > 0) {
                IERC20(asset()).safeTransfer(account, reward);
            }
        }
        totalProfit = 0;
    }  
}
