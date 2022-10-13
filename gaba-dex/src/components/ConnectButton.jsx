import React from "react";
import PageButton from "./PageButton";

const ConnectButton = (props) => {
    const {isConnected, signerAddress, getSigner, provider} = props;
    const displayAddress = `${signerAddress?.substring(0, 5)}...${signerAddress?.substring(38,42)}`

    return (
        <>
        {isConnected() ? (
            <div className="buttonContainer">
            <PageButton name={displayAddress} />
            </div>
         ) : (
            <div className="btn my-2 connectButton"
            onClick={() => getSigner(provider)}
            >
            Connect Wallet
            </div>
        )}
        </>
    )
}

export default ConnectButton;