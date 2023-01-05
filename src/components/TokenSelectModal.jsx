import React, { useState } from "react";
import "../styles/TokenSelectModal.css"

const TokenSelectModal = (props) => {

    const tokens = [
        { id: 1, title: "WrappedEther", body: "WETH", address: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6" },
        { id: 2, title: "UNISWAP", body: "UNI", address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" }
    ]

    return (
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
                            onClick={() => {
                                props.setTokenName(token.body);
                                props.setToken(token);
                            }
                            }
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