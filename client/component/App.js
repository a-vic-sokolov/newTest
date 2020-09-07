import React, {useEffect, useState} from 'react'
import '../css/style.scss'
import {Convert} from "./Convert";

export const App = () => {
    const initialState = [{
        initialValue: 0,
        initialName: 'BTC',
        initialVal:0
    },
        {
            initialValue: 0,
            initialName: 'BNBmainet',
            initialVal: 0
        }
    ]
    const [unit, setUnit] = useState(initialState[0])
    const [currency, setCurrency] = useState(initialState[1])

    useEffect(async () => {
        let answer = await fetch(
            'http://localhost:5000/api/data/currency',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
            });
        let json = '';
        answer.ok ?  json = await answer.json() : console.log(`Ошибка HTTP: ${answer.status}`);
        console.log(json)
        setUnit(json[0])
        setCurrency(json[1])
    },[])

    useEffect(()=>{
        if (currency.initialName !== 'BTC')
        {
            setCurrency({...currency, initialValue: unit.initialValue * 478.842340 })
        }
        else {
            setCurrency({...currency, initialValue: unit.initialValue / 478.842340 })
        }


    },[unit])

    const changeData = () => {
        let changer = []
        changer = [unit, currency]
        setCurrency(changer[0])
        setUnit(changer[1])
    }
    return(
        <div className={'container '}>
            <div className="mainBlock whiteBlock">
                <div className={'container '}>
                    <div className="row mainBlock">
                        <Convert data={unit} change = {setUnit} />
                        <div className="icon col-2 d-flex justify-content-center align-items-center" onClick={changeData}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-right"
                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd"
                                      d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"/>
                            </svg>
                        </div>
                        <Convert data={currency}/>
                    </div>
                    <div className="row mainBlock">
                            <div className="col-7 ">
                                <input type="text"
                                       className={'col-12 inputBlock'}
                                       placeholder={'ETH address'}
                                />
                            </div>
                            <div className="col-5">
                                <input
                                    type={'button'}
                                    value={'NEXT'}
                                    className={'col-12 btn btn-success'}/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )

}