import React, { useState, useEffect } from "react";
import { FaTrash, FaSort, FaSearch, FaUserPlus, FaEdit } from 'react-icons/fa';
import axios from '../../../../Axios/Axios';
import "./customers.css";

function Customers({ sidebarWidth }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/Admin/get/users");
        setCustomers(response.data.response);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Filtering and Sorting
  const filteredAndSortedCustomers = [...customers]
    .filter(customer => 
      customer.Fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.Username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        : new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
    });

  // Delete customer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Admin/delete/user/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (err) {
      setError("Failed to delete customer");
    }
  };

  // Bulk delete
  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedCustomers.map(id => 
          axios.delete(`/Admin/delete/user/${id}`)
        )
      );
      setCustomers(customers.filter((customer) => !selectedCustomers.includes(customer._id)));
      setSelectedCustomers([]);
    } catch (err) {
      setError("Failed to delete some customers");
    }
  };

  // Toggle customer selection
  const toggleCustomerSelection = (id) => {
    setSelectedCustomers(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  // Toggle select all customers
  const toggleSelectAll = () => {
    setSelectedCustomers(
      selectedCustomers.length === filteredAndSortedCustomers.length 
        ? [] 
        : filteredAndSortedCustomers.map(customer => customer._id)
    );
  };

  const mainStyle = {
    marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
    width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
  };

  if (loading) {
    return <div className="loading-spinner" style={mainStyle}>Loading...</div>;
  }

  if (error) {
    return <div className="error-message" style={mainStyle}>{error}</div>;
  }

  return (
    <div className="customers-container" style={mainStyle}>
      <div className="customers-header">
        <h2>
          <FaUserPlus className="header-icon" /> 
          Customer Management
        </h2>

        <div className="customers-actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name, email or username..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="sort-container">
            <FaSort className="sort-icon" />
            <select 
              onChange={(e) => setSortOrder(e.target.value)} 
              value={sortOrder}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Delete Section */}
      {selectedCustomers.length > 0 && (
        <div className="bulk-actions">
          <span>{selectedCustomers.length} customer(s) selected</span>
          <button 
            onClick={handleBulkDelete} 
            className="bulk-delete-btn"
          >
            <FaTrash /> Delete Selected
          </button>
        </div>
      )}

      {/* Customers Table */}
      <div className="table-responsive">
        <table className="customers-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox"
                  checked={selectedCustomers.length > 0 && 
                           selectedCustomers.length === filteredAndSortedCustomers.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>#</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCustomers.map((customer, index) => (
              <tr key={customer._id}>
                <td>
                  <input 
                    type="checkbox"
                    checked={selectedCustomers.includes(customer._id)}
                    onChange={() => toggleCustomerSelection(customer._id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{customer.Fullname}</td>
                <td>{customer.Username}</td>
                <td>{customer.Email}</td>
                <td>{customer.PhoneNum}</td>
                <td>{customer.City}, {customer.Pincode}</td>
                <td>
                  <span className={`gender-badge ${customer.Gender}`}>
                    {customer.Gender}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-btn">
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(customer._id)} 
                      className="delete-btn"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredAndSortedCustomers.length === 0 && (
        <div className="empty-state">
          {searchTerm ? 'No customers match your search' : 'No customers found'}
        </div>
      )}
    </div>
  );
}

export default Customers;