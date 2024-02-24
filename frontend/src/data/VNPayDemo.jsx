import React, { useState } from 'react';
import axios from 'axios';

const VNPayDemo = () => {
    const [amount, setAmount] = useState(299999); // Giá trị mặc định
    const [orderInfo, setOrderInfo] = useState('Thanh toan don hang 2923');

    const BASE_URL = "http://localhost:8080"; // Đây là URL cơ sở của backend

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const url = `${BASE_URL}/submitOrder`;
        
        // In ra đường dẫn bạn đang gửi yêu cầu POST đến cùng với tham số
        console.log("Sending POST request to:", url);
        try {
            const response = await axios.post(url,null,{params:{
                amount,
                orderInfo
            }});
            console.log(response.data);
            window.location.href = response.data
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };
    

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <img src="/path/to/vnpay-logo.png" style={{ width: '200px' }} alt="VNPay Logo" />
                            <h2 className="card-title">Thanh Toán Đơn Hàng</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="amount">Số tiền:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="amount"
                                        name="amount"
                                        required
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="orderInfo">Thông tin đơn hàng:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="orderInfo"
                                        name="orderInfo"
                                        required
                                        value={orderInfo}
                                        onChange={(e) => setOrderInfo(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Thanh toán</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VNPayDemo;
