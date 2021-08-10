//need to change deployed contract address
export const Activatebackup_ADDRESS = '0x654f483C54C2D5289a72A3AB06F4CB93B7cA3d6f'
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
    "name": "activateBackup",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }   
]
