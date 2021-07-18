//need to change deployed contract address
export const Backup_ADDRESS = '0x543e6413419b4763345EA27B7B6F32469D17DF1F'
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
