import { ethers } from "ethers";

const hasSigners = async (): Promise<boolean> => {
    //@ts-ignore
    const metamask = window.ethereum;
    const signers = await (metamask.request({method: 'eth_accounts'}) as Promise<string[]>);
    return signers.length > 0;

};

const requestAccess = async (): Promise<boolean> => {
    //@ts-ignore
    const result = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];
    return result && result.length > 0;

};


const getContract = async () => {
    const address = process.env.CONTRACT_ADDRESS;
    console.log(address);

    if (!(await hasSigners()) && !(await requestAccess())) {
        console.log("You are in trouble, no one wants to play");
    }

    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(
        address,
        [
            "function hello() public pure returns(string memory)",
        ], // abi
        provider
    );

    console.log("We have done it, time to call");
    const loadedContract = await contract.hello();
    console.log(loadedContract);
    document.body.innerHTML = loadedContract;
};

console.log("hi");
getContract();