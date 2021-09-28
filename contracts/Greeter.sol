//SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

contract Greeter is AccessControlUpgradeable {
	string greeting;

	function initialize(string memory _greeting) external initializer {
		greeting = _greeting;

		__AccessControl_init();

		_setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
	}

	function greet() public view returns (string memory) {
		return greeting;
	}

	function setGreeting(string memory _greeting)
		public
		onlyRole(DEFAULT_ADMIN_ROLE)
	{
		// Hardhat Console Log
		console.log("\tSetting Greeting to:", _greeting);

		greeting = _greeting;
	}
}
