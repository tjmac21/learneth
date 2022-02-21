import _ from "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";
import { expect } from "chai";

describe("Testing Hello World", () => {
    it("should get the hello world", async () => {
        const HW = await ethers.getContractFactory("HelloWorld");
        const hello = await HW.deploy(); // deploys to a network (hardhat creates a test network and destroys it after)

        expect(await hello.hello()).to.equal("Hello, World");
    });
});