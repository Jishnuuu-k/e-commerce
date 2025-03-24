import React, { useState } from 'react';
import './orderstatus.css';

const ordersData = [
    { id: 1, product: "Riding Jacket", category: "Riding Gears", subcategory: "Jackets", price: 150, status: "Shipped", date: "2025-03-15" },
    { id: 2, product: "Full Face Helmet", category: "Helmets and Accessories", subcategory: "Full Face", price: 200, status: "Delivered", date: "2025-03-10" },
    { id: 3, product: "Tank Bag", category: "Luggage and Touring", subcategory: "Tank Bags", price: 80, status: "Pending", date: "2025-03-18" },
    { id: 4, product: "Handlebar Grips", category: "Motorcycle Accessories", subcategory: "Handlebar and Accessories", price: 40, status: "Processing", date: "2025-03-20" },
    { id: 5, product: "Modular Helmet", category: "Helmets and Accessories", subcategory: "Modular", price: 220, status: "Cancelled", date: "2025-03-05" }
];

function OrderStatus({ sidebarWidth }) {
    const [orders, setOrders] = useState(ordersData);

    const mainStyle = {
        marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
        width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
        transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
    };

    // Handle order status update
    const handleStatusChange = (id, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    return (
        <div className="orders-container" style={mainStyle}>
            <h2 className="orders-title">Update Order Status</h2>

            {/* Orders List */}
            <div className="orders-list">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} className="order-card">
                            <h3>{order.product}</h3>
                            <p><strong>Category:</strong> {order.category} - {order.subcategory}</p>
                            <p><strong>Price:</strong> ${order.price}</p>
                            <p><strong>Date:</strong> {order.date}</p>

                            {/* Dropdown to Update Status */}
                            <div className="order-status">
                                <label><strong>Status:</strong></label>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Returned">Returned</option>
                                </select>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-orders">No orders found.</p>
                )}
            </div>
        </div>
    );
}

export default OrderStatus;
