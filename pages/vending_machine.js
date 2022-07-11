import Head from 'next/head'
import { useState } from 'react';
import Web3 from 'web3'
import 'bulma/css/bulma.css';
import style from '../styles/VendingMachine.module.css';


const VendingMachine=()=>{
    let web3
    const [error,seterror] = useState("")
    //window.ethereum
    const connectWalletHandler = async() =>{
        if(typeof window !== "undefined" && typeof window.ethereum !=="undefined" ){
           try {
           await window.ethereum.request({method:"eth_requestAccounts"})
           web3 = new Web3(window.ethereum)}
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
                <p>placeholder text</p>
            </div>
        </section>
        <section>
            <div className='container has-text-danger'>
                <p>{error}</p>
            </div>
        </section>
        </div>
    
    )
}
export default VendingMachine; 