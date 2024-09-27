const hre = require("hardhat");

   async function main() {
     // Get the contract factory
     const MyToken = await hre.ethers.getContractFactory("MyToken");
     
     // For simplicity, we'll use the first account to deploy and interact
     const [owner] = await hre.ethers.getSigners();

     // Deploy the contract
     console.log("Deploying contract...");
     const myToken = await MyToken.deploy(hre.ethers.utils.parseEther("1000000"));
     await myToken.deployed();
     console.log("MyToken deployed to:", myToken.address);

     // Check the balance of the owner
     const balance = await myToken.balanceOf(owner.address);
     console.log("Owner balance:", hre.ethers.utils.formatEther(balance));

     // Transfer some tokens
     const transferAmount = hre.ethers.utils.parseEther("1000");
     await myToken.transfer(hre.ethers.Wallet.createRandom().address, transferAmount);
     
     // Check the balance again
     const newBalance = await myToken.balanceOf(owner.address);
     console.log("Owner balance after transfer:", hre.ethers.utils.formatEther(newBalance));
   }

   main()
     .then(() => process.exit(0))
     .catch((error) => {
       console.error(error);
       process.exit(1);
     });