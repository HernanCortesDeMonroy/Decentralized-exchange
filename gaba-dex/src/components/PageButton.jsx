import React from "react";

const PageButton = (props) => {
    return(
        <a className={props.isBold ? "hoverBold topButton" : "topButton"}>
            {props.name}
        </a>
    )
}

export default PageButton;