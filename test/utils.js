exports.toWei = (num) => String(ethers.utils.parseEther(String(num)));
exports.fromWei = (num) => Number(ethers.utils.formatEther(num));
exports.printGas = async (tx) => {
  const receipt = await tx.wait();

  console.log("\tGas Used:", Number(receipt.gasUsed));
};
exports.increaseBlocks = async (amt) => {
  for (let i = 0; i < amt; i++) {
    await ethers.provider.send("evm_mine");
  }
};
exports.increaseTime = async (sec) => {
  await ethers.provider.send("evm_increaseTime", [sec]);
  await ethers.provider.send("evm_mine");
};
exports.currentTime = async () => {
  const { timestamp } = await ethers.provider.getBlock();
  return timestamp;
};
exports.toDays = (amt) => 60 * 60 * 24 * amt;
