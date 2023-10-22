import './form.css';
import Dropdown from '../../elements/dropdown/Dropdown';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { showLoadingMessage } from '../../redux/features/formSlice/formSlice';

const Form = () => {

    const dispatch = useDispatch()
    // Get the selected coin data from the Redux state.
    //Transaction volumes of a coin determine the speed at which we can find the data of a coin hence,
    // a variable to control the display of a coin if we get the price late
    const { checkedItem, loading } = useSelector((state) => state.form);

    // Initialize state for the amount the client wants to invest
    const [userInvested, setUserInvested] = useState('');

    // Initialize state to store the current price of the selected coin
    const [price, setPrice] = useState(0);


    // Use useEffect to set up a WebSocket connection to get real-time price updates
    useEffect(() => {
        // Determine the trading pair based on the selected coin or default to 'btcusdt'
        const tradingPair = checkedItem?.id ? checkedItem?.id : 'btcusdt';

        // Create a WebSocket connection to Binance for price updates
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${tradingPair}@trade`);

        // Event handler for incoming WebSocket messages (price updates)
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            const formattedPrice = parseFloat(data.p).toFixed(2); // Format to two decimal places
            setPrice(formattedPrice);
            dispatch(showLoadingMessage(false)); // Set loading to false when data is received
        };

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, [checkedItem]);

    // Function to calculate the amount of the selected coin the user will get for a given INR investment
    function calculateCoinAmount(inrAmount, exchangeRate, btcPrice) {
        // Convert INR to USD
        const usdAmount = inrAmount / exchangeRate;

        // Calculate the BTC amount
        const coinAmount = usdAmount / btcPrice;

        // Round to 2 decimal places
        return coinAmount.toFixed(2);
    }

    // Example exchange rate and INR amount (You can replace these with actual values)
    const inrAmount = userInvested; // Amount in INR
    const exchangeRate = 82; // 1 USD = 82 INR

    // Calculate the estimated number of coins the user will get for the entered INR investment
    const coinAmount = calculateCoinAmount(inrAmount, exchangeRate, price);

    // Function to handle form submission (currently empty)
    function handleSubmit(e) {
        e.preventDefault(); // Prevent the form from submitting
        // You can add code here to handle the form submission, like sending data to the server.
    }

    return (
        <div className='form_container'>
            <form className='form' onSubmit={handleSubmit}>

                <section className='logo_container'>
                    <div className='header_logo'>
                        <img src={`${checkedItem?.url ? checkedItem.url : '/img/BITCOIN LOGO.svg'}`} alt="Coin Logo" />
                        <span></span>
                    </div>
                    <div></div>
                </section>


                <div className='form_title'>
                    <span>Current value</span>
                    <span> {loading ? 'Fetching...' :`$ ${price}` }</span>
                </div>

                <Dropdown />

                <div className='input_container'>
                    <label className='label'>Amount you want to invest</label>
                    <div className='input_writable'>
                        <span>INR</span>
                        <input
                            type='number'
                            onChange={(e) => setUserInvested(e.target.value)}
                            value={userInvested}
                            placeholder='0.00'
                            readOnly={loading}
                        />
                    </div>
                </div>

                <div className='input_container input_readOnly'>
                    <label className='label'>Estimate Number of {checkedItem?.id ? checkedItem?.id?.split('usdt')[0].toUpperCase() : 'BTC'} You Will Get</label>
                    <input className='input' placeholder='0.00' value={coinAmount} readOnly />
                </div>

                <input type='submit' value={'Buy'} className='form_button' />
            </form>
        </div>
    );
}

export default Form;
