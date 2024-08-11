
/////////// update by id   //////////

// import React, { useState } from 'react';
// import { useCart } from './CartContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link, useNavigate } from 'react-router-dom';

// function Showcat() {
//     const today = new Date().toISOString().split('T')[0];
//     const { cart, removeItem, updateQuantity } = useCart();
//     const [customer, setCustomer] = useState('');
//     const [discount, setDiscount] = useState('');
//     const [dob, setDob] = useState(today);
//     const navigate = useNavigate();
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setIsSubmitting(true);

//         // Prepare order data
//         const orderData = {
//             name: customer,
//             dob: dob,
//             discount: discount,
//             products: cart.map(item => ({
//                 qty: item.quantity,
//                 sale_price: item.sale_price,
//                 total: item.sale_price * item.quantity,
//                 product_id: item.id
//             }))
//         };

//         try {
//             const response = await fetch('http://localhost:6800/order', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(orderData)
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 toast.success(result.message, {
//                     position: "top-center",
//                     autoClose: 3000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined
//                 });
//                 navigate('/invoice');
//             } else {
//                 toast.error(result.error || 'Something went wrong!', {
//                     position: "top-center",
//                     autoClose: 3000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined
//                 });
//             }
//         } catch (error) {
//             toast.error('Network error!', {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleDeleteProduct = (item) => {
//         removeItem(item);
//     };

//     const handleQuantityChange = (item, delta) => {
//         const newQuantity = item.quantity + delta;

//         if (newQuantity > item.qty) {
//             toast.error('Stock quantity exceeded!', {
//                 position: "top-center",
//                 autoClose: 3000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//         } else if (newQuantity > 0) {
//             updateQuantity(item.id, newQuantity);
//         } else {
//             removeItem(item.id);
//         }
//     };

//     // Calculate total sale_price
//     const subtotal = cart.reduce((acc, item) => acc + ((item.sale_price - (item.sale_price * (item.discount * 0.01))) * item.quantity), 0).toFixed(2);
//     const discountValue = Number(discount) || 0; // Ensure discount is a number
//     const totalDiscount = ((subtotal * discountValue) / 100).toFixed(2);;
//     const grandTotal = (subtotal - totalDiscount).toFixed(2);;

//     return (
//         <div>
//             <div className="ticket__table" id='invoice'>
//                 <form onSubmit={handleSubmit}>
//                     <div className='form-group'>
//                         <label>Customer Name</label>
//                         <input type="text" className='form-control' value={customer} onChange={(e) => setCustomer(e.target.value)} required />
//                         <label>Date</label>
//                         <input type="date" className='form-control' disabled defaultValue={today} value={dob} onChange={(e) => setDob(e.target.value)} required />
//                     </div>

//                     <table className='table table-border'>
//                         <thead>
//                             <tr>
//                                 <th>ឈ្មោះ</th>
//                                 <th>Qty</th>
//                                 <th>Dis</th>
//                                 <th>price</th>
//                                 <th>Total</th>
//                                 <th>Remove</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cart.map((item, index) => (
//                                 <tr key={index} className='hover:bg-slate-50 rounded-lg'>
//                                     <td><input type="text" className=' text-center w-24  py-1 bg-slate-300 rounded-lg ' disabled value={item.name} /></td>
//                                     <td className='flex'>
//                                         <button className='px-4 py-1 mx-2 rounded-full bg-green-500 text-white font-bold' type="button" onClick={() => handleQuantityChange(item, -1)}>-</button>
//                                         <input type="text" className='w-12 text-center py-1 bg-slate-300 rounded-lg' disabled value={item.quantity} />
//                                         <button className='px-4 py-1 mx-2 rounded-full bg-green-500 text-white font-bold' type="button" onClick={() => handleQuantityChange(item, 1)}>+</button>
//                                     </td>
//                                     <td>
//                                         <input type="text" className='w-12 text-center py-1 text-red-500 bg-slate-300 rounded-lg' disabled value={`${item.discount}%`} />
//                                     </td>

//                                     <td><input type="text" className='w-12 text-center py-1  bg-slate-300 rounded-lg' disabled value={item.sale_price} /></td>
//                                     <td><input type="text" className='w-12 text-center py-1  bg-slate-300 rounded-lg' disabled value={((item.sale_price - (item.sale_price * (item.discount * 0.01))) * item.quantity).toFixed(2)} /></td>
//                                     <td>
//                                         <button className='px-2 rounded-full bg-red-400 hover:bg-red-500 text-white font-bold' type="button" onClick={() => handleDeleteProduct(item)}>Remove</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                             <tr>
//                                 <td colSpan="3" className="text-right"><strong></strong></td>
//                                 <td colSpan="1" className="text-right"><strong>Total:</strong></td>
//                                 <td colSpan="3"><strong>{subtotal}</strong></td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="2" className="text-right"><strong></strong></td>
//                                 <td colSpan="1" className="text-right"><strong>Discount (%):</strong></td>
//                                 <td colSpan="1">
//                                     <input
//                                         type="number"
//                                         className='py-2 rounded-xl bg-slate-50'
//                                         max={100}
//                                         min={0}
//                                         step="0.1"
//                                         value={discount}
//                                         onChange={(e) => {
//                                             const newValue = Math.max(0, Math.min(100, e.target.value));
//                                             setDiscount(newValue);
//                                         }}
//                                     />
//                                 </td>
//                                 <td colSpan="2"><strong>{totalDiscount}</strong></td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="3" className="text-right"><strong></strong></td>
//                                 <td colSpan="1" className="text-right"><strong>Grand Total:</strong></td>
//                                 <td colSpan="3"><strong>{grandTotal}</strong></td>
//                             </tr>
//                             <tr>
//                                 <td colSpan="6" className="text-right">
//                                     <button className='btn btn-danger' type="submit" disabled={isSubmitting}>Payment</button>
//                                     <Link className='btn btn-secondary ms-2' to={'/invoice'}>Invoice</Link>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Showcat;


// បើដូរ ចាប់តាម ID  ដូរតែក្នុង showcat and cartContext


/////////// update by name   //////////
import React, { useState } from 'react';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

function Showcat() {
    const today = new Date().toISOString().split('T')[0];
    const { cart, removeItem, updateQuantity } = useCart();
    const [customer, setCustomer] = useState('');
    const [discountpay, setDiscount] = useState('');
    const [debtPay, setDebt_pay] = useState('');
    const [person_pay, setPereson_pay] = useState('');
    const [dob, setDob] = useState(today);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        // Prepare order data
        const orderData = {
            name: customer,
            dob: dob,
            discount: discountpay,
            total_pay: grandTotal,
            products: cart.map(item => ({
                qty: item.quantity,
                price: item.sale_price,
                total: ((item.sale_price - (item.sale_price * (item.discount * 0.01))) * item.quantity),
                product_id: item.id,
                discount: item.discount
            }))
        };

        try {
            const response = await fetch('http://localhost:5000/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();
            if (response.ok) {
                toast.success(result.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
                navigate('/invoice');
            } else {
                toast.error(result.error || 'Something went wrong!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            }
        } catch (error) {
            toast.error('Network error!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProduct = (item) => {
        removeItem(item);
    };

    const handleQuantityChange = (item, delta) => {
        const newQuantity = item.quantity + delta;

        if (newQuantity > item.qty) {
            toast.error('Stock quantity exceeded!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (newQuantity > 0) {
            updateQuantity(item.name, newQuantity);
        } else {
            removeItem(item.name);
        }
    };

    // Calculate total sale_price
    const subtotal = cart.reduce((acc, item) => acc + ((item.sale_price - (item.sale_price * (item.discount * 0.01))) * item.quantity), 0).toFixed(2);
    const discountValue = Number(discountpay) || 0; // Ensure discount is a number
    const totalDiscount = ((subtotal * discountValue) / 100).toFixed(2);;
    const grandTotal = (subtotal - totalDiscount).toFixed(2);;

    return (
        <div>
            <div className="ticket__table" id='invoice'>
                <form onSubmit={handleSubmit}>
                    <div className='flex'>
                    <div className=''>
                        <label>Customer Name</label>
                        <input type="text" className='block  py-2 rounded-lg' value={customer} onChange={(e) => setCustomer(e.target.value)} required />
                    </div>
                    <div className=''>
                        <label>Date</label>
                        <input type="date" className='block py-1 rounded-lg' disabled defaultValue={today} value={dob} onChange={(e) => setDob(e.target.value)} required />
                    </div>
                    </div>

                    <table className='table table-border'>
                        <thead>
                            <tr>
                                <th>ឈ្មោះ</th>
                                <th>Qty</th>
                                <th>Dis</th>
                                <th>price</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index} className='hover:bg-slate-50 rounded-lg'>
                                    <td><input type="text" className=' text-center w-24  py-1 bg-slate-300 rounded-lg ' disabled value={item.name} /></td>
                                    <td className='flex'>
                                        <button className='px-4 py-1 mx-2 rounded-full bg-green-500 text-white font-bold' type="button" onClick={() => handleQuantityChange(item, -1)}>-</button>
                                        <input type="text" className='w-12 text-center py-1 bg-slate-300 rounded-lg' disabled value={item.quantity} />
                                        <button className='px-4 py-1 mx-2 rounded-full bg-green-500 text-white font-bold' type="button" onClick={() => handleQuantityChange(item, 1)}>+</button>
                                    </td>
                                    <td>
                                        <input type="text" className='w-12 text-center py-1 text-red-500 bg-slate-300 rounded-lg' disabled value={`${item.discount}%`} />
                                    </td>

                                    <td><input type="text" className='w-12 text-center py-1  bg-slate-300 rounded-lg' disabled value={item.sale_price} /></td>
                                    <td><input type="text" className='w-12 text-center py-1  bg-slate-300 rounded-lg' disabled value={((item.sale_price - (item.sale_price * (item.discount * 0.01))) * item.quantity).toFixed(2)} /></td>
                                    <td>
                                        <button className='px-2 rounded-full bg-red-400 hover:bg-red-500 text-white font-bold' type="button" onClick={() => handleDeleteProduct(item)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="2" className="text-right"><strong></strong></td>
                                <td colSpan="1" className="text-right"><strong>Total:</strong></td>
                                <td colSpan="3"><strong>{subtotal}</strong></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="text-right"><strong></strong></td>
                                <td colSpan="1" className="text-right"><strong>Discount (%):</strong></td>
                                <td colSpan="1">
                                    <input
                                        type="number"
                                        className='py-1 rounded-xl bg-slate-50'
                                        max={100}
                                        min={0}
                                        step="0.1"
                                        value={discountpay}
                                        onChange={(e) => {
                                            const newValue = Math.max(0, Math.min(100, e.target.value));
                                            setDiscount(newValue);
                                        }}
                                    />
                                </td>

                                <td colSpan="1"><strong>{totalDiscount}រៀល</strong></td>
                            </tr>
                            <tr>
                                {/* <td colSpan="1" className="text-right"><strong></strong></td> */}
                                <td colSpan="1" className="text-right"><strong>Person Pay:</strong></td>
                                <td colSpan="1">
                                    <input
                                        type="number"
                                        className='py-1 rounded-xl bg-slate-50 w-50'
                                        min={0}
                                        step="1"
                                        value={person_pay}
                                        onChange={(e) => setPereson_pay(e.target.value)}
                                    />
                                </td>
                                <td colSpan="1" className="text-right"><strong>លុយត្រូវបង់</strong></td>
                                <td colSpan="1"><strong>{grandTotal}រៀល</strong></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="text-right"><strong></strong></td>
                                <td colSpan="2" className="text-right"><strong>Change លុយជុំបាក់:</strong></td>
                                <td colSpan="2">
                                    <strong>{Math.max(0,  grandTotal - person_pay)}រៀល</strong>
                                </td>
                           
                            </tr>
                            <tr>
                                <td colSpan="1" className="text-right"><strong></strong></td>
                                <td colSpan="2" className="text-right"><strong>Excess Payment ប្រាក់អាប់:</strong></td>
                                <td colSpan="2">
                                    <strong>{Math.max(0, person_pay - grandTotal).toFixed(2)}រៀល</strong>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4" className="text-right">
                                    <button className='bg-green-400 py-1 px-5 rounded-lg' type="submit" disabled={isSubmitting}>Payment</button>
                                    <Link className='btn btn-secondary ms-2' to={'/invoice'}>Invoice</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default Showcat;
