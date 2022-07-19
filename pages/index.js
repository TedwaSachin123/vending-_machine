import Head from 'next/head'
import { useState , useEffect} from 'react';
import Web3 from 'web3'
import 'bulma/css/bulma.css';
import style from '../styles/VendingMachine.module.css';
import VendingMachinecontact from '../build/contracts/vending.js';


const VendingMachine=()=>{
    
    const [error,seterror] = useState("");
    const [success, setsuccess] = useState("");
    const [inventory,getinventory] = useState("");
    const [mydonutcount,getmydonutcount] = useState("");
    const [buydonut, setbuydonut] = useState("");
    const [web3,setweb3] = useState(null);
    const [address,setAddress] = useState(null);
    const [vmcontract, setvmcontract] = useState(null);
    const [load, setLoadingScreen] = useState("")

    useEffect(()=>{
        
        if(vmcontract) getinventoryhandler() //useeffect will run the function once page get fully load
        if(vmcontract && address) getmydonutcounthandler()
    },[vmcontract, address])

    const getinventoryhandler = async()=>{
        const inventory = await vmcontract.methods.getvendingmachinebalance().call();
        getinventory(inventory)
    }

    const getmydonutcounthandler = async()=>{
        
        const count = await vmcontract.methods.donutbalance(address).call();
        getmydonutcount(count)
    }
    const  updatedonutquantity = async(event)=>{
        setbuydonut(event.target.value)
        
    }

    
    const buydonuthandler=async()=> {
      
        try{setLoadingScreen('Transaction Pending !!');
            let e = await vmcontract.methods.purchase(buydonut).send({
                from:address,
                value: web3.utils.toWei('2','ether')*buydonut
            })
            setLoadingScreen('')
            setsuccess('donut purchase !!')
            seterror('')
            getinventoryhandler()
            getmydonutcounthandler()
            setbuydonut("")
        } catch(err){
            seterror(err.message)
        }
         
        
     }

    //window.ethereum
    const connectWalletHandler = async() =>{
        //check metamask is available 
        if(typeof window !== "undefined" && typeof window.ethereum !=="undefined" ){
           try {
           await window.ethereum.request({method:"eth_requestAccounts"}) //request wallet connect

           web3 = new Web3(window.ethereum) //set web3 instance

           setweb3(web3) 
           const accounts = await web3.eth.getAccounts();
           
           setAddress(accounts[0]) //get list of accounts

           const vm = VendingMachinecontact(web3)//create local contract copy
           setvmcontract(vm)
           }
           catch(err){
            seterror(err.message);
           }
        } else{
            //metamask not install
            console.log('please install metamask')
        }
    }
    return (
        <div className={style.main}>
        <Head>
        <title>Vending Machine</title>
        <meta name="description" content="A blockchain vending machine app" />
        </Head>

        <nav className="navbar mt-4 mb-4">
            <div className='container'>
                <div className='navbar-brand'>
                    <h1>Vending Machine</h1>
                </div>
                <div className='navbar-end'>
                    <button onClick={connectWalletHandler} className='button is-primary'>Connect Wallet </button>
                </div>
            </div>
        </nav>

        <section>
            <div className='container'>
                <h2>Vending Machine Inventory: {inventory}</h2>
            </div>
        </section>
        <section>
            <div className='container'>
                <h2>My Donut: {mydonutcount}</h2>
            </div>
        </section>
        <section className='mt-5'>
            <div className='container'>
                <div className='field'>
                    <label className='label'>Buy Donut</label>
                    <div className='control'>
                        <input value={buydonut} onChange={updatedonutquantity} className='input' type="number" placeholder='enter amount'></input>
                    </div>
                    <button onClick={buydonuthandler} className='button is-primary mt-2'>Buy </button>

                </div>
            </div>
        </section>
        <section>
            <div className='container has-text-danger'>
                <p>{error}</p>
            </div>
        </section>
        <section>
            <div className='container has-text-success'>
                <p>{success}</p>
            </div>
        </section>
        <section>
            <div className='container has-text'>
                <p>{load}</p>
            </div>
        </section>
        
        </div>
    
    )
}
export default VendingMachine; 