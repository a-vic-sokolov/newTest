import React from 'react'

export const Convert = (props) =>{
    return(
        <div className="col-5 backgrondBlock">
            <div className="row d-flex align-items-center justify-content-center backgrondBlock">
                <div className="col-6 ">
                    <input type="number"
                           className={'col-12 inputBlock'}
                           min={0}
                           value={props.data.initialValue}
                           onChange={ props.change ? event => props.change({...props.data, initialValue: event.target.value}) : null}
                           />

                </div>
                <div className="vhr"></div>
                <div className="col-6">
                    <div className="textBlock col-12 d-flex justify-content-center">
                        {props.data.initialName}
                    </div>
                </div>
            </div>
        </div>
    )
}