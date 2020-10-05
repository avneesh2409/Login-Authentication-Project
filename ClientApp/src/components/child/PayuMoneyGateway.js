import React, { useState } from 'react'
//import sha256 from 'crypto-js/sha256'

const PayUMoneyGateway = () => {
    const initial = {
        productName: '',
        productUnitPrice: '',
        productsQuantity: '',
        description:''
    }
    const [state, setState] = useState(initial)
    const changeHandler = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    return (

        <>
            <h1>Give Product Description</h1>
            <form method="post" >
                <input type="text" name="description" placeholder="Product Description....." value={state.description} onChange={changeHandler} /><hr />
                <input type="text" name="productName" placeholder="Product Name....." value={state.productName} onChange={changeHandler}/><hr />
                <input type="text" name="productUnitPrice" placeholder="Product UnitPrice....." value={state.productUnitPrice} onChange={changeHandler}/><hr />
                <input type="text" name="productsQuantity" placeholder="Product Quantity......" value={state.productsQuantity} onChange={changeHandler}/><hr />
                <button onClick={(event) => {
                    event.preventDefault()
                    if (state.description && state.productName && state.productsQuantity && state.productUnitPrice) {
                        let body = {
                            "notifyUrl": "https://localhost:44316/notify",
                            "continueUrl": "https://localhost:44316/notify",
                            "customerIp": "127.0.0.1",
                            "merchantPosId": "395753",
                            "description": state.description,//"Bed Sheet for the Bed Room",
                            "currencyCode": "PLN",
                            "totalAmount": (parseInt(state.productsQuantity) * parseFloat(state.productUnitPrice)).toString(),
                            "buyer": {
                                "email": "avneeshdwivedi.tft@gmail.com",
                                "phone": "654111654",
                                "firstName": "Avneesh",
                                "lastName": "Dwivedi",
                                "city": "Indore",
                                "language": "pl"
                            },
                            "products": [
                                {
                                    "name": state.productName,
                                    "unitPrice": state.productUnitPrice,
                                    "quantity": state.productsQuantity
                                }
                            ],
                            "payMethods": {
                                "payMethod": {
                                    "card": {
                                        "number": "4012001037141112",
                                        "expirationMonth": "10",
                                        "expirationYear": "2020",
                                        "cvv": "123"
                                    }
                                }
                            }
                        }
                        setState({
                            ...state,
                            ...initial
                        })
                        fetch("https://localhost:44316/test-payment", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(body)
                        }).then(res => res.text())
                            .then(json => {
                                var frog = window.open("", "think future technology", "")
                                frog.document.open()
                                frog.document.write(json)
                                frog.document.close()
                            })
                            .catch(err => console.log(err))
                    }
                    else {
                        alert("All Fields are required !!")
                    }
                    
                }}>Pay with PayUMoney</button>
            </form >
           </>
    )
}
export default PayUMoneyGateway