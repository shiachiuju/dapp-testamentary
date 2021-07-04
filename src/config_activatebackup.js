//need to change deployed contract address
export const Activatebackup_ADDRESS = '0x72237907511459B7940ACD54C452817ee8b55aa4'
export const Activatebackup_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_oneContractAddr",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getbackaddress",
    "outputs": [
      {
        "internalType": "contract Backup",
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address",
        "name": "_contractaddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_password",
        "type": "string"
      }
    ],
    "name": "checkContract",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
        
]
