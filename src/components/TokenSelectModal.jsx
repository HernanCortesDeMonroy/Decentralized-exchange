import { checkProperties } from "ethers/lib/utils";
import React, { useState } from "react";
import "../styles/TokenSelectModal.css"

const TokenSelectModal = (props) => {

    const [tokens, setTokens] = useState([
        {id: 1, body: "WrappedEther", title: "WETH"},
        {id: 2, body: "UNISWAP", title: "UNI"}
      ]);

    return(
        <div className="select-modal" onClick={props.onClose}>
            <div className="select-modal-content" onClick={e => e.stopPropagation()}>
                <h4 className="titleHeaderSelect">Select a token</h4>

                <div className="row">
                    <input 
                    className="searchToken"
                    placeholder="Search token by name"
                    />
                </div>

                <div className="tokenList"
                onClick={props.onClose}>
                    {tokens.map(token => 
                        <div key={token.id}
                        className="tokenNames" 
                        onClick={() => props.setTokenName(token.title)}
                        >
                            <div className="shortTokenName">
                            {token.title}
                            </div>
                            <div className="fullTokenName">
                            {token.body}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TokenSelectModal;