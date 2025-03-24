import React, { useState } from 'react';
import './orders.css';

// Expanded sample data with customer details
const ordersData = [
    { 
        id: 1, 
        product: "Riding Jacket", 
        category: "Riding Gears", 
        subcategory: "Jackets", 
        price: 150, 
        status: "Shipped", 
        date: "2025-03-15",
        customer: {
            name: "Alex Johnson",
            email: "alex.j@example.com",
            phone: "555-123-4567",
            address: "123 Rider St, Portland, OR 97201"
        },
        orderDetails: {
            quantity: 1,
            size: "Medium",
            color: "Black",
            paymentMethod: "Credit Card"
        }
    },
    { 
        id: 2, 
        product: "Full Face Helmet", 
        category: "Helmets and Accessories", 
        subcategory: "Full Face", 
        price: 200, 
        status: "Delivered", 
        date: "2025-03-10",
        customer: {
            name: "Morgan Smith",
            email: "morgan.s@example.com",
            phone: "555-987-6543",
            address: "456 Cruiser Ave, Seattle, WA 98101"
        },
        orderDetails: {
            quantity: 1,
            size: "Large",
            color: "Red",
            paymentMethod: "PayPal"
        }
    },
    { 
        id: 3, 
        product: "Tank Bag", 
        category: "Luggage and Touring", 
        subcategory: "Tank Bags", 
        price: 80, 
        status: "Pending", 
        date: "2025-03-18",
        customer: {
            name: "Jamie Taylor",
            email: "jamie.t@example.com",
            phone: "555-789-0123",
            address: "789 Touring Rd, Austin, TX 78701"
        },
        orderDetails: {
            quantity: 1,
            size: "Standard",
            color: "Gray",
            paymentMethod: "Debit Card"
        }
    },
    { 
        id: 4, 
        product: "Handlebar Grips", 
        category: "Motorcycle Accessories", 
        subcategory: "Handlebar and Accessories", 
        price: 40, 
        status: "Processing", 
        date: "2025-03-20",
        customer: {
            name: "Casey Williams",
            email: "casey.w@example.com",
            phone: "555-456-7890",
            address: "321 Motorcycle Ln, Denver, CO 80202"
        },
        orderDetails: {
            quantity: 2,
            size: "Universal",
            color: "Blue",
            paymentMethod: "Credit Card"
        }
    },
    { 
        id: 5, 
        product: "Modular Helmet", 
        category: "Helmets and Accessories", 
        subcategory: "Modular", 
        price: 220, 
        status: "Cancelled", 
        date: "2025-03-05",
        customer: {
            name: "Jordan Lee",
            email: "jordan.l@example.com",
            phone: "555-234-5678",
            address: "654 Highway Dr, Las Vegas, NV 89101"
        },
        orderDetails: {
            quantity: 1,
            size: "Medium",
            color: "White",
            paymentMethod: "Credit Card"
        }
    }
];

function Orders({ sidebarWidth }) {
    const [orders, setOrders] = useState(ordersData);
    const [filters, setFilters] = useState({
        category: "",
        subcategory: "",
        date: "new",
        price: "low",
        status: ""
    });
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const mainStyle = {
        marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
        width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
        transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
    };

    // Filter orders
    const filteredOrders = [...orders]
        .filter(order => !filters.category || order.category === filters.category)
        .filter(order => !filters.subcategory || order.subcategory === filters.subcategory)
        .filter(order => !filters.status || order.status === filters.status)
        .sort((a, b) => filters.date === "new" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date))
        .sort((a, b) => filters.price === "low" ? a.price - b.price : b.price - a.price);

    const getStatusIcon = (status) => {
        switch(status.toLowerCase()) {
            case 'delivered':
                return '✓';
            case 'shipped':
                return '🚚';
            case 'processing':
                return '⚙️';
            case 'pending':
                return '⏳';
            case 'cancelled':
                return '✕';
            case 'returned':
                return '↩️';
            default:
                return '';
        }
    };

    const toggleOrderDetails = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    return (
        <div className="orders-container" style={mainStyle}>
            <div className="orders-header">
                <h2 className="orders-title">My Orders</h2>
                <span className="orders-count">{filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''}</span>
            </div>

            {/* Filters Section */}
            <div className="filters-container">
                <div className="filters">
                    <div className="filter-group">
                        <label>Category</label>
                        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                            <option value="">All Categories</option>
                            <option value="Motorcycle Accessories">Motorcycle Accessories</option>
                            <option value="Riding Gears">Riding Gears</option>
                            <option value="Luggage and Touring">Luggage and Touring</option>
                            <option value="Helmets and Accessories">Helmets and Accessories</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Subcategory</label>
                        <select onChange={(e) => setFilters({ ...filters, subcategory: e.target.value })}>
                            <option value="">All Subcategories</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Boots">Boots</option>
                            <option value="Tank Bags">Tank Bags</option>
                            <option value="Full Face">Full Face</option>
                            <option value="Modular">Modular</option>
                            <option value="Handlebar and Accessories">Handlebar and Accessories</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Date</label>
                        <select onChange={(e) => setFilters({ ...filters, date: e.target.value })}>
                            <option value="new">Newest First</option>
                            <option value="old">Oldest First</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Price</label>
                        <select onChange={(e) => setFilters({ ...filters, price: e.target.value })}>
                            <option value="low">Low to High</option>
                            <option value="high">High to Low</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Status</label>
                        <select onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                            <option value="">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Returned">Returned</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Orders List */}
            <div className="orders-list">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <div key={order.id} className={`order-card ${expandedOrderId === order.id ? 'expanded' : ''}`}>
                            <div className="order-header">
                                <span className="order-id">Order #{order.id}</span>
                                <span className="order-date">{new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="order-content">
                                <div className="order-product">
                                    <h3>{order.product}</h3>
                                    <p className="order-category">{order.category} - {order.subcategory}</p>
                                </div>
                                <div className="order-details">
                                    <div className="order-price">${order.price.toFixed(2)}</div>
                                    <div className={`order-status ${order.status.toLowerCase()}`}>
                                        <span className="status-icon">{getStatusIcon(order.status)}</span>
                                        {order.status}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Customer & Expanded Order Details */}
                            {expandedOrderId === order.id && (
                                <div className="expanded-details">
                                    <div className="expanded-section">
                                        <h4>Customer Details</h4>
                                        <div className="detail-grid">
                                            <div className="detail-item">
                                                <span className="detail-label">Name:</span>
                                                <span className="detail-value">{order.customer.name}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Email:</span>
                                                <span className="detail-value">{order.customer.email}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Phone:</span>
                                                <span className="detail-value">{order.customer.phone}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Address:</span>
                                                <span className="detail-value">{order.customer.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="expanded-section">
                                        <h4>Order Details</h4>
                                        <div className="detail-grid">
                                            <div className="detail-item">
                                                <span className="detail-label">Quantity:</span>
                                                <span className="detail-value">{order.orderDetails.quantity}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Size:</span>
                                                <span className="detail-value">{order.orderDetails.size}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Color:</span>
                                                <span className="detail-value">{order.orderDetails.color}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Payment:</span>
                                                <span className="detail-value">{order.orderDetails.paymentMethod}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Subtotal:</span>
                                                <span className="detail-value">${order.price.toFixed(2)}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">Tax:</span>
                                                <span className="detail-value">${(order.price * 0.08).toFixed(2)}</span>
                                            </div>
                                            <div className="detail-item total">
                                                <span className="detail-label">Total:</span>
                                                <span className="detail-value">${(order.price * 1.08).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div className="order-actions">
                                <button 
                                    className={`btn-details ${expandedOrderId === order.id ? 'active' : ''}`}
                                    onClick={() => toggleOrderDetails(order.id)}
                                >
                                    {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                                </button>
                                {(order.status === "Delivered" || order.status === "Shipped") && 
                                    <button className="btn-track">Track Order</button>
                                }
                                {order.status === "Delivered" && 
                                    <button className="btn-return">Return</button>
                                }
                                {(order.status === "Pending" || order.status === "Processing") && 
                                    <button className="btn-cancel">Cancel</button>
                                }
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-orders">
                        <div className="no-orders-icon">📦</div>
                        <p>No orders match the selected filters.</p>
                        <button className="btn-reset" onClick={() => setFilters({
                            category: "",
                            subcategory: "",
                            date: "new",
                            price: "low",
                            status: ""
                        })}>Reset Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orders;