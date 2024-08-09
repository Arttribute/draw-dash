// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract DrawDashGameVault is ERC4626, Ownable {
    using SafeERC20 for IERC20;
    using Math for uint256;

    address public gameContract;
    uint256 public totalProfit;  // Tracks total profit earned by the vault

    event ProfitDistributed(uint256 profit, uint256 totalAssets);

    constructor(
        IERC20 _asset,
        string memory _name,
        string memory _symbol,
        address _gameContract
    ) ERC4626(_asset) ERC20(_name, _symbol) {
        gameContract = _gameContract;
    }

    modifier onlyGameContract() {
        require(msg.sender == gameContract, "Caller is not the game contract");
        _;
    }

    function setGameContract(address _gameContract) external onlyOwner {
        gameContract = _gameContract;
    }

    // Function to provide liquidity to the game
    function provideLiquidity(uint256 amount) external onlyGameContract {
        require(amount <= totalAssets(), "Insufficient assets in the vault");
        IERC20(asset()).safeTransfer(gameContract, amount);
    }

    // Function to receive funds back from the game (e.g., when a player loses)
    function receiveFunds(uint256 amount, bool isProfit) external onlyGameContract {
        IERC20(asset()).safeTransferFrom(gameContract, address(this), amount);
        if (isProfit) {
            totalProfit += amount;
            emit ProfitDistributed(amount, totalAssets());
        }
    }

    function _deposit(address caller, address receiver, uint256 assets, uint256 shares) internal override {
        super._deposit(caller, receiver, assets, shares);
    }

    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 shares
    ) internal override {
        super._withdraw(caller, receiver, owner, assets, shares);
    }

    // Distribute profits to vault participants
    function distributeProfit() external onlyOwner {
        require(totalProfit > 0, "No profit to distribute");
        uint256 profitPerShare = totalProfit.mulDiv(1e18, totalSupply());
        for (uint256 i = 0; i < totalSupply(); i++) {
            address account = accountAt(i);
            uint256 share = balanceOf(account);
            uint256 reward = share.mul(profitPerShare).div(1e18);
            IERC20(asset()).safeTransfer(account, reward);
        }
        totalProfit = 0;
    }

    // Helper function to get account address at index (for profit distribution)
    function accountAt(uint256 index) internal view returns (address) {
        return ERC20.ownerOf(index);
    }
}
