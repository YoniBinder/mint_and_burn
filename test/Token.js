const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Token contract", function () {

    async function deployTokenFixture() {
        const Token = await ethers.getContractFactory("Token");
        const [owner] = await ethers.getSigners();
    
        const hardhatToken = await Token.deploy();
    
        await hardhatToken.deployed();
    
        // Fixtures can return anything you consider useful for your tests
        return { Token, hardhatToken, owner };
      }

      it("Should assign the total supply of tokens to the owner", async function () {
        const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
    
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
      });

  it("Should mint 50 tokens", async function() {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    // Minting 50 tokens 
    await hardhatToken.mint(50);
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(1000050);

  });

  it("Should mint and then burn 50 tokens", async function() {
    const { hardhatToken, owner } = await loadFixture(deployTokenFixture);

    //mint and then burn 50 tokens 
    await hardhatToken.mint(50);
    await hardhatToken.burn(50);
    expect(await hardhatToken.balanceOf(owner.address)).to.equal(1000000);
  });
});