import './App.css';
import { useState, useEffect} from 'react';
import {ethers} from 'ethers';

import PageButton from './components/PageButton';
import ConnectButton from './components/ConnectButton';

function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);

  useEffect(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    }
    onLoad();
  }, [])

  const getSigner = async provider => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
  }

  const isConnected = () => signer !== undefined;
  const getWalletAddress = () => {
    signer.getAddress()
    .then(address => {
      setSignerAddress(address) 
    })
  }

  if(signer !== undefined) {
    getWalletAddress()
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
          <PageButton name={"..."} isBold={true}/>
          </div>
        </div>
      </div>
      <div className='main'>
        <div className='swapPage'>
          <div className='swapTop'>
            <div className='swapTextTop'>Swap</div>
          </div>
          <div className='swapForm'> {/* parental form element - Position*/}
            <div className='swapBorder'>
              <div className='swapBorderPosition'>
                <input className='swapInput' name='firstToken' type='number' placeholder='0' /> {/*maybe reactjs*/}
                <div className=''></div>
              </div>
            </div>
            <div className='swapBorderPrice'>
              {/* <div className='swapPrice'></div>
              <div className='swapBalance'></div> */}
            </div>
          </div>
          <div className='swapForm'> {/* parental form element - Position*/}
            <div className='swapBorder'>

            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
