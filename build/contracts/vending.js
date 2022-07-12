


const abi = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "donutbalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getvendingmachinebalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amt", "type": "uint256" } ], "name": "restock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amt", "type": "uint256" } ], "name": "purchase", "outputs": [], "stateMutability": "payable", "type": "function" } ]

const VendingMachinecontact = (web3)=>{
    return new web3.eth.Contract(
    abi,
    "0x3Be769353B5B7052380C2C71229B6C2467a40608")}

export default VendingMachinecontact