const { expect } = require("chai");
const { fixture } = deployments;

const { printGas } = require("./utils");

describe("Greeter", () => {
  before(async function () {
    ({ deployer, user } = await getNamedAccounts());

    deployerSigner = await ethers.provider.getSigner(deployer);
    userSigner = await ethers.provider.getSigner(user);

    // Deploy contracts
    await fixture(["Greeter"]);
    greeter = await ethers.getContract("Greeter");
  });

  it("should get correct initial greet", async function () {
    expect(await greeter.greet()).to.be.equal("First Greet");
  });

  it("only admin should be able to change greet", async function () {
    await expect(greeter.connect(userSigner).setGreeting("Hello, World!"))
      .reverted;

    const tx = await greeter
      .connect(deployerSigner)
      .setGreeting("Hello, World!");

    await printGas(tx);

    expect(await greeter.greet()).to.be.equal("Hello, World!");
  });
});
