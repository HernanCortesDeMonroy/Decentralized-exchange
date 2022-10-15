import React from "react";

const WalletButton = (props) => {
    return(
        <div className="btn">
            <span className={props.isBold ? "pageButtonBold" : "hoverBold"} >
                {props.name}
            </span>
        </div>
    )
}

export default WalletButton;