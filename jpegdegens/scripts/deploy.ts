import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { addEmitHelpers, textChangeRangeIsUnchanged } from "typescript";

const deploy = async () => {
    const HelloWorld = await ethers.getContractFactory("HelloWorld");
    const hello = await HelloWorld.deploy();
    await hello.deployed(); // make sure you wait its been deployed (since its on a public ledger)

    return hello;
}

// @ts-ignore
const sayHello = async (hello) => {
    console.log("Say Hello:", await hello.hello());
}

deploy().then(sayHello);