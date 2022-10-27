import React from "react";
import "../styles/ConfigModal.css"

const ConfigModal = (props) => {
    
    return (
        <div className="modaly" onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-body">
                    <h4 className="titleHeader">Settings</h4>

                    <div className="row">
                        <label className="labelField">Slippage tolerance</label>
                    </div>
                    <div className="row">
                        <div className="fieldContainer">
                            <button className="autoButton"
                                onClick={e => props.setSlippageAmount(2.0)}>Auto</button>
                            <input 
                                className="inputField"
                                placeholder="2.0"
                                value={props.slippageAmount}
                                onChange={e => props.setSlippageAmount(e.target.value)}
                            />
                            <div className="inputFieldUnitsContainer">
                                <span>%</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <label className="labelField">Transaction deadline</label>
                        <div className="col-md-9 fieldContainer">
                            <input 
                                className="inputField"
                                placeholder="10"
                                value={props.deadlineMinutes}
                                onChange={e => props.setDeadlineMinutes(e.target.value)}
                            />
                            <div className="inputFieldUnitsContainer">
                                <span className="unitMinute">minutes</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default ConfigModal;