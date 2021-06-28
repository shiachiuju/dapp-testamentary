import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      // if (typeof web3 !== 'undefined') {
      //   Promise.web3Provider = web3.currentProvider
      //   web3 = new Web3(web3.currentProvider)
      // } else {
      //   window.alert("Please connect to Metamask.")
      // }
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.eth_requestAccounts;
          // Accounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        // Promise.web3Provider = web3.currentProvider
        // window.web3 = new Web3(web3.currentProvider)
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        // const provider = new Web3.providers.HttpProvider(
        //   "http://127.0.0.1:7545"
        // );
        // const web3 = new Web3(provider);
        
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;

