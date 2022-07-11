// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VendingMachine {
  //state variable
  address public owner;
  mapping(address=>uint) public donutbalance;

  constructor(){
    owner = msg.sender;
    donutbalance[address(this)] = 100;
  }

  function getvendingmachinebalance() public view returns(uint){
    return donutbalance[address(this)];
    }
  
  function restock(uint amt)public {
    require(msg.sender==owner,'only owner can restock');
    donutbalance[address(this)] += amt;
  }
  
  function purchase( uint amt) public payable{
   require(msg.value >= amt * 2 ether, 'you mush have to pay 2 ethers per donut');
   require(donutbalance[address(this)] >= amt, 'not enough dont in  stock');
  donutbalance[address(this)] -= amt;
  donutbalance[msg.sender] += amt;
  }
}
