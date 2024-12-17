How to mint Hashmon?

Step 1 mint Hashling Egg UTXO
-> spendable only to specific address, or could be sent as a gift.
-> This egg already contains ERG funds needed for NFT mint.

Step 2 mint Hashling from Hashling Egg UTXO.

- It's like the only option and purpose of that UTXO.

HashEgg UTXO
[sigMiningDaoPayed] - has a static check sigMiningDaoPayed
[uiFeePayed] - has a register for 0.1 ERG ui_fee
[nftSentToTrainer] - has a register for trainer address (address that NFT has to be minted to)

- has a static list of HowEverManyGen1Boxes <= listOfGen1Hashmon
  [validRandomIndex] - randomBox == verifies that index of minted NFT is selfBoxId + nextBlockId % totalHashlings
  [validNFTregisters] - randomBox registers are 1:1 to minted NFT box registers

mintGen1Path:{
sigmaProp(sigMiningDaoPayed && uiFeePayed && validRandomIndex && nftSentToTrainer && validNFTregisters)
AND inputsHaveNoNFT
}else upgradeHashmonPath{
AND inputsHaveTwoNFT AND each is nftIsValidGen1(?)Hashmon
sigmaProp(validNFTregisters && )
}
[validUpgradeBoxIndex] - upgradeBoxNftId is written into description register
