import React from "react";
import Style from "../styles/WalletTokens.css";
import { useEffect } from "react";
import { useCallback } from "react";

const { ethers } = require('ethers');
const ERC20ABI = require('../abi.json');
const { Web3Provider } = require("../AlphaRouterService.js");

const TokenList = (props) => {

  let modifiedTokens = [];

  const getBalance = useCallback(
    (tokens) => {
      modifiedTokens = tokens.map(async token => {
        const contract = new ethers.Contract(token.address, ERC20ABI, Web3Provider)
        token.balance = await contract.balanceOf(props.address)
      })
    },
    [props.address]
  );

  useEffect(() => {
    getBalance(props.tokens);
  }, [getBalance, props.tokens]);
  return (
    <div className={Style.TokenList} onClick={() => props.onClose}>
      <p
        className={Style.TokenList_close}
        onClick={e => e.stopPropagation()}
      >
      </p>
      <div className={Style.TokenList_title}>
        <h2>Token balance</h2>
      </div>

      {modifiedTokens.map((token) => (
      <div className={Style.TokenList_box}>
        <div className={Style.TokenList_box_info}>
          <p className={Style.TokenList_box_info_symbol}>{token.body}</p>
          <p>
            <span>{token.balance.toFixed(3)}</span>
          </p>
        </div>
      </div>
      ))}
    </div>
  );
};

export default TokenList;