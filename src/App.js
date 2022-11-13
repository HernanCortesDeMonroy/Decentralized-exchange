import './App.css';
import { useState, useEffect} from 'react';
import {ethers} from 'ethers';
import { GearFill } from 'react-bootstrap-icons';
import { BeatLoader } from 'react-spinners';

import PageButton from './components/PageButton';
import ConnectButton from './components/ConnectButton';
import ConfigModal from './components/ConfigModal';
import CurrencyField from './components/CurrencyField';

import {getWethContract, getUniContract, getPrice, runSwap} from './AlphaRouterService';

function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);

  const [slippageAmount, setSlippageAmount] = useState(2);
  const [deadlineMinutes, setDeadlineMinutes] = useState(10);
  const [showModal, setShowModal] = useState(undefined);

  const [tokenNameIn, setTokenNameIn] = useState(undefined);
  const [tokenNameOut, setTokenNameOut] = useState(undefined);
  const [inputAmount, setInputAmount] = useState(undefined);
  const [outputAmount, setOutputAmount] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);
  const [loading, setLoading] = useState(undefined);
  const [ratio, setRatio] = useState(undefined);
  const [wethContract, setWethContract] = useState(undefined);
  const [uniContract, setUniContract] = useState(undefined);
  const [balanceTokenIn, setBalanceTokenIn] = useState(undefined);
  const [balanceTokenOut, setBalanceTokenOut] = useState(undefined);
  

  const [tokens, setTokens] = useState([
    {id: 1, title: "WrappedEther", body: "WETH"},
    {id: 2, title: "UNISWAP", body: "UNI"}
  ]);
  const [tokenIn, setTokenIn] = useState(undefined);
  const [tokenOut, setTokenOut] = useState(undefined);

  useEffect(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const wethContract = getWethContract()
      setWethContract(wethContract);

      const uniContract = getUniContract()
      setUniContract(uniContract);
    }
    onLoad();
  }, [])

  const getSigner = async provider => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
  }

  const isConnected = () => signer !== undefined;
  const getWalletAddress = async () => {
      let address = await signer.getAddress();
      setSignerAddress(address);

      let wethAddress = await wethContract.balanceOf(address)
      setBalanceTokenIn(Number(ethers.utils.formatEther(wethAddress))); 
      
      let uniAddress = await uniContract.balanceOf(address)
      setBalanceTokenOut(Number( ethers.utils.formatEther(uniAddress)) )
  }

  if(signer !== undefined) {
    getWalletAddress()
  }

  const getSwapPrice =(inputAmount) => {
    setLoading(true);
    setInputAmount(inputAmount);

   // const swap = getPrice(
    getPrice(
      inputAmount,
      slippageAmount,
      Math.floor(Date.now()/1000 + (deadlineMinutes * 60)),
      signerAddress
      ).then(data => {
      setTransaction(data[0]);
      setOutputAmount(data[1]);
      setRatio(data[2]);
      setLoading(false);
    })
  }

  return (
    <div className="App">
      <div className="appNav">
        <div className="my-2 buttonContainer buttonContainerTop">
          <PageButton name={"Swap"} isBold={true} />
          <PageButton name={"Pool"} />
          <PageButton name={"Vote"} />
          <PageButton name={"Charts"} />
        </div>
        <div className='rightNav'>
          <div className='connectButtonContainer'>
            <ConnectButton 
            provider={provider}
            isConnected={isConnected}
            signerAddress={signerAddress}
            getSigner={getSigner}
            />
          </div>
          <div className='my-2 buttonContainer'>
            <div className="btn">
              <span className="pageButtonBold">
                ...
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='appBody'>
        <div className='swapContainer'>
          <div className='swapHeader'>
            <span className='swapText'>Swap</span>
            <span className='gearContainer' onClick={() => setShowModal(true)}>
              <GearFill />
            </span>
            {showModal && (
              <ConfigModal 
                onClose={() => setShowModal(false)}
                setDeadlineMinutes={setDeadlineMinutes}
                deadlineMinutes={deadlineMinutes}
                setSlippageAmount={setSlippageAmount}
                slippageAmount={slippageAmount}
              />
            )}

          </div>    
          <div className='swapBody'>
            <CurrencyField
            field="input"
            tokenName="WETH"
            getSwapPrice={getSwapPrice}
            signer={signer}
            balance={balanceTokenIn} 
            tokens={tokens}/>

            <button>Change</button>
            
            <CurrencyField
            field="output"
            tokenName="UNI" 
            value={outputAmount}
            signer={signer}
            balance={balanceTokenOut}
            spinner={BeatLoader}
            loading={loading} 
            tokens={tokens}/> 
          </div>

            <div className='ratioContainer'>
                {ratio && (
                  <>
                    {`1 UNI = ${ratio} WETH`} 
                  </>
                )}
            </div>

            <div className='swapButtonContainer'>
                  {isConnected() ? (
                    <div
                      onClick={() => runSwap(transaction, signer)} 
                      className="swapButton"
                      >
                        Swap
                    </div>
                    ) : (
                    <div onClick={() => getSigner(provider)}
                    className="swapButton"
                    >
                      Connect Wallet
                    </div>
                    )
                  }
            </div>

           </div>
      </div>

    </div>
             
    
  
)}

export default App;
