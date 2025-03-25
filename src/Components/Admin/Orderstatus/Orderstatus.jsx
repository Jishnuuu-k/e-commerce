import React, { useState } from 'react';
import { Package, Truck, Check, X, Loader, RefreshCw } from 'lucide-react';
import './orderstatus.css';

const ordersData = [
    { id: 1, product: "Riding Jacket", category: "Riding Gears", subcategory: "Jackets", price: 150, status: "Shipped", date: "2025-03-15" },
    { id: 2, product: "Full Face Helmet", category: "Helmets and Accessories", subcategory: "Full Face", price: 200, status: "Delivered", date: "2025-03-10" },
    { id: 3, product: "Tank Bag", category: "Luggage and Touring", subcategory: "Tank Bags", price: 80, status: "Pending", date: "2025-03-18" },
    { id: 4, product: "Handlebar Grips", category: "Motorcycle Accessories", subcategory: "Handlebar and Accessories", price: 40, status: "Processing", date: "2025-03-20" },
    { id: 5, product: "Modular Helmet", category: "Helmets and Accessories", subcategory: "Modular", price: 220, status: "Cancelled", date: "2025-03-05" }
];

// Status color and icon mapping
const STATUS_CONFIG = {
    Pending: { color: 'text-yellow-600', icon: Loader },
    Processing: { color: 'text-blue-600', icon: RefreshCw },
    Shipped: { color: 'text-indigo-600', icon: Truck },
    Delivered: { color: 'text-green-600', icon: Check },
    Cancelled: { color: 'text-red-600', icon: X },
    Returned: { color: 'text-purple-600', icon: Package }
};

function OrderStatus({ sidebarWidth }) {
    const [orders, setOrders] = useState(ordersData);
    const [filter, setFilter] = useState('All');

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

    // Filter orders based on status
    const filteredOrders = filter === 'All' 
        ? orders 
        : orders.filter(order => order.status === filter);

    return (
        <div className="orders-container" style={mainStyle}>
            <div className="orders-header">
                <h2 className="orders-title">Order Management</h2>
                
                {/* Status Filter */}
                <div className="status-filter">
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        className="filter-select"
                    >
                        <option value="All">All Orders</option>
                        {Object.keys(STATUS_CONFIG).map(status => (
                            <option key={status} value={status}>{status} Orders</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Orders List */}
            <div className="orders-grid">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => {
                        const StatusIcon = STATUS_CONFIG[order.status].icon;
                        const statusColor = STATUS_CONFIG[order.status].color;

                        return (
                            <div key={order.id} className="order-card">
                                <div className="order-card-header">
                                    <h3>{order.product}</h3>
                                    <div className={`order-status-badge ${statusColor}`}>
                                        <StatusIcon className="status-icon" />
                                        {order.status}
                                    </div>
                                </div>
                                
                                <div className="order-card-details">
                                    <div className="order-details-grid">
                                        <div>
                                            <span className="detail-label">Category</span>
                                            <span>{order.category}</span>
                                        </div>
                                        <div>
                                            <span className="detail-label">Subcategory</span>
                                            <span>{order.subcategory}</span>
                                        </div>
                                        <div>
                                            <span className="detail-label">Price</span>
                                            <span>${order.price}</span>
                                        </div>
                                        <div>
                                            <span className="detail-label">Date</span>
                                            <span>{order.date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Update Dropdown */}
                                <div className="order-status-update">
                                    <label>Update Status</label>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="status-select"
                                    >
                                        {Object.keys(STATUS_CONFIG).map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-orders">
                        <Package size={48} className="text-gray-400" />
                        <p>No orders found for the selected status.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderStatus;