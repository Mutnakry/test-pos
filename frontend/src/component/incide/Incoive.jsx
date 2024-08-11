
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import pos from '../image/image.png';

function Incoive() {
    const [invoice, setInvoice] = useState([]);
    const { id } = useParams();

    const invoice_by_customer = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/invoice/${id}`);
            setInvoice(res.data);
        } catch (error) {
            console.error("Error fetching invoice data", error);
        }
    };

    useEffect(() => {
        if (invoice.length > 0) {
            const printContents = document.getElementById('invoice').innerHTML;
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
        }
    }, [invoice]);

     // Calculate total price
     const totalPrice = invoice.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

     // Calculate total discount
     const totalDiscount = invoice.reduce((acc, item) => acc + (item.price * item.qty * (item.discount / 100)), 0).toFixed(2);
     
     // grand total
     const grandtotal =(totalPrice-totalDiscount).toFixed(2);

     const customerName = invoice.length > 0 ? invoice[0].customer_name : '';
     const dob = invoice.length > 0 ? invoice[0].dob : '';

    useEffect(() => {
        invoice_by_customer();
    }, [id]);

    return (
        <div className='container'>
            <div id='invoice'>

                <div className='row'>
                    <div className='col-4'></div>
                    <div className='col-1'>
                        {/* <img src={pos} height={90} alt="" /> */}
                    </div>
                </div>
                    <div className='row' >
                        <div className='col-8'>
                            <h5>Customer Name: {customerName}</h5>
                            <p>Date: {dob} </p>
                            <p>Invoice No: 1</p>
                        </div>
                        <div className='col-4'>
                            <h5>Cashier: Admin</h5>
                            <p>Date: </p>
                        </div>
                    </div>
               
                <hr className='border-3 border-dark' />
                <table className="table table-borderless">
                    <thead className='table'>
                        <tr className="h4 pb-2 mb-4 text-danger border-bottom border-gray">
                            <th>ល.រ</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.map((item, index) => (
                             <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.qty}</td>
                                <td>{item.price * item.qty}</td>
                            </tr>
                        ))}
                        <tr className='h4 pb-2 mb-4 text-danger border-top border-gray'>
                            <td colSpan="3" className="text-right"></td>
                            <td colSpan="1" className="text-right">Total :</td>
                            <td colSpan="2"><strong>{totalPrice}</strong></td>
                        </tr>
                        <tr className='h4 pb-2 mb-4 '>
                            <td colSpan="3" className="text-right"></td>
                            <td colSpan="1" className="text-right">Discount  ( {invoice.reduce((acc, item) =>  (item.discount ), 0)}% )</td>
                            <td colSpan="2"><strong>{totalDiscount}</strong></td>
                        </tr>
                        <tr className='h4 pb-2 mb-4 '>
                            <td colSpan="3" className="text-right"></td>
                            <td colSpan="1" className="text-right">Grand Total :</td>
                            <td colSpan="2"><strong>{grandtotal}</strong></td>
                        </tr>
                    </tbody>
                </table>
                <hr className='border-3 border-dark' />
                <div className='text-center text-info'>
                    <h4>Thank You Sp Much </h4>
                </div>
            </div>
        </div>
    );
}

export default Incoive;
