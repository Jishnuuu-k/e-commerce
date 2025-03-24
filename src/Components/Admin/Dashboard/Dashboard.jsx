import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

function Dashboard({ sidebarWidth }) {
  // Sample data - replace with actual API calls
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
    monthlyRevenue: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  
  // COLORS for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Monthly sales data
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 8000 },
    { name: 'May', sales: 7500 },
    { name: 'Jun', sales: 9800 },
  ];
  
  // Product category data
  const categoryData = [
    { name: 'Sport Bikes', value: 35 },
    { name: 'Cruisers', value: 25 },
    { name: 'Off-Road', value: 20 },
    { name: 'Scooters', value: 15 },
    { name: 'Electric', value: 5 },
  ];
  
  // Top selling products
  const topProducts = [
    { name: 'Kawasaki Ninja ZX-10R', sales: 42, revenue: 758000 },
    { name: 'Honda CB500X', sales: 38, revenue: 532000 },
    { name: 'Yamaha MT-09', sales: 35, revenue: 490000 },
    { name: 'Royal Enfield Classic 350', sales: 33, revenue: 429000 },
    { name: 'Harley-Davidson Iron 883', sales: 27, revenue: 459000 },
  ];
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample data - replace with actual API responses
        setStats({
          totalProducts: 156,
          totalCategories: 12,
          totalOrders: 837,
          pendingOrders: 24,
          revenue: 12875000,
          monthlyRevenue: 2350000
        });
        
        setRecentOrders([
          { id: 'ORD-9385', customer: 'Alex Johnson', date: '2025-03-23', status: 'Delivered', total: 14599 },
          { id: 'ORD-9384', customer: 'Sarah Miller', date: '2025-03-23', status: 'Processing', total: 18999 },
          { id: 'ORD-9383', customer: 'David Chen', date: '2025-03-22', status: 'Shipped', total: 23499 },
          { id: 'ORD-9382', customer: 'Emily Rodriguez', date: '2025-03-22', status: 'Processing', total: 15999 },
          { id: 'ORD-9381', customer: 'Michael Davis', date: '2025-03-21', status: 'Delivered', total: 12799 },
        ]);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#4caf50';
      case 'Shipped':
        return '#2196f3';
      case 'Processing':
        return '#ff9800';
      case 'Cancelled':
        return '#f44336';
      default:
        return '#757575';
    }
  };
  
  // Get current date
  const getCurrentDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('en-US', options);
  };
  
  // Main style with dynamic sidebar adjustment
  const mainStyle = {
    marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
    width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
  };
  
  if (loading) {
    return (
      <div className="dashboard-container" style={mainStyle}>
        <div className="loading-spinner">Loading dashboard data...</div>
      </div>
    );
  }
  
  return (
    <div className="dashboard-container" style={mainStyle}>
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome to MOTO HUB Admin</h1>
          <p className="date">{getCurrentDate()}</p>
        </div>
        <div className="time-range-filter">
          <button 
            className={timeRange === 'week' ? 'active' : ''} 
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''} 
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
          <button 
            className={timeRange === 'year' ? 'active' : ''} 
            onClick={() => setTimeRange('year')}
          >
            This Year
          </button>
        </div>
      </div>
      
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon orders-icon">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <div className="stat-details">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
            <p className="stat-change positive">+12.5% from last month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon revenue-icon">
            <i className="fas fa-rupee-sign"></i>
          </div>
          <div className="stat-details">
            <h3>Total Revenue</h3>
            <p className="stat-value">{formatCurrency(stats.revenue)}</p>
            <p className="stat-change positive">+8.3% from last month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon products-icon">
            <i className="fas fa-motorcycle"></i>
          </div>
          <div className="stat-details">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <p className="stat-change neutral">+3 new this month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon pending-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-details">
            <h3>Pending Orders</h3>
            <p className="stat-value">{stats.pendingOrders}</p>
            <p className="stat-change negative">+5 since yesterday</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-charts">
        <div className="chart-container sales-chart">
          <h2>Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#8884d8" 
                strokeWidth={2}
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-container category-chart">
          <h2>Product Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="dashboard-bottom">
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>{formatCurrency(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="view-all">
            <button>View All Orders</button>
          </div>
        </div>
        
        <div className="top-products">
          <h2>Top Selling Products</h2>
          <ul className="product-list">
            {topProducts.map((product, index) => (
              <li key={index} className="product-item">
                <div className="product-rank">{index + 1}</div>
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <div className="product-details">
                    <span>{product.sales} sold</span>
                    <span>{formatCurrency(product.revenue)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;