import axios from 'axios';
import { React, useEffect, useState } from 'react'
import Sidebar from '../dashboard/sideBar/sidebar';
const Order = () => {
    const [orders, setOrder] = useState([]);
    const [total, setTotal] = useState(0);
    console.log("THis is total", total);
    

    const fetchOrder = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/order/");


            console.log("This is response", response.data.data);
            setOrder(response.data.data);

            const data = response.data.data;
            const sum = data.reduce((acc, order) => acc + order.totalAmount, 0)
            setTotal(sum)



        }
        catch (err) {
            console.error("Error while fetching orders", err)
        }

    }
    useEffect(() => {

        fetchOrder()
    }, [])
    return (

        <div className='flex'>
            <Sidebar />
            <div className="ml-64 p-6 bg-gray-50 min-h-screen">
                <h2 className="text-2xl font-bold mb-6">Orders</h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Ordered by</th>
                                <th className="py-3 px-6 text-left">Ordered at</th>
                                <th className="py-3 px-6 text-left">Address</th>
                                <th className="py-3 px-6 text-left">order items</th>
                                <th className="py-3 px-6 text-left">status</th>
                                <th className="py-3 px-6 text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm font-light">
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-50">

                                    <td className="py-3 px-6">{order.phoneNumber}</td>
                                    <td className="py-3 px-6">{new Date(order.createdAt).toLocaleString()}</td>
                                    <td className="py-3 px-6">{order.shippingAddress}</td>
                                    <td className="py-3 px-6">{order.products.length}</td>
                                    <td className='py-3 px-6'>{order.orderStatus}</td>
                                    <td className='py-3 px-6'>{order.totalAmount}</td>

                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-100 text-gray-700 font-bold">
                                <td colSpan="5" className="py-3 px-6 text-right">Total Sales:</td>
                                <td className="py-3 px-6 text-center">${total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Order
