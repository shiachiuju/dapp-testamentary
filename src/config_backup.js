//need to change deployed contract address
export const Backup_ADDRESS = '0x0F3B1aA83fdE9e7dEF742fbAbF99a337a30F6C8A'
export const Backup_ABI = [
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
        "constant": false,
        "inputs": [
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
        "name": "setBackup",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "internalType": "string",
            "name": "_email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_password",
            "type": "string"
          },
          {
            "internalType": "address payable",
            "name": "_to",
            "type": "address"
          }
        ],
        "name": "activateBackup",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    
        
]
