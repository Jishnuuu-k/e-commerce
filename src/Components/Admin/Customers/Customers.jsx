import React, { useState, useEffect } from "react";
import { FaTrash, FaSort, FaSearch, FaUserPlus } from 'react-icons/fa';
import "./customers.css";

function Customers({ sidebarWidth }) {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);

  useEffect(() => {
    // Sample data (Replace with API call)
    const sampleCustomers = [
      { 
        id: 1, 
        name: "John Doe", 
        email: "john@example.com", 
        registeredAt: "2024-03-10",
        status: "Active"
      },
      { 
        id: 2, 
        name: "Jane Smith", 
        email: "jane@example.com", 
        registeredAt: "2024-02-20",
        status: "Inactive"
      },
      { 
        id: 3, 
        name: "Alice Johnson", 
        email: "alice@example.com", 
        registeredAt: "2024-03-15",
        status: "Active"
      },
    ];
    setCustomers(sampleCustomers);
  }, []);

  // Filtering and Sorting
  const filteredAndSortedCustomers = [...customers]
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.registeredAt) - new Date(a.registeredAt)
        : new Date(a.registeredAt) - new Date(b.registeredAt);
    });

  // Delete customer
  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  // Bulk delete
  const handleBulkDelete = () => {
    setCustomers(customers.filter((customer) => !selectedCustomers.includes(customer.id)));
    setSelectedCustomers([]);
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
        : filteredAndSortedCustomers.map(customer => customer.id)
    );
  };

  const mainStyle = {
    marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
    width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
  };

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
              placeholder="Search customers..." 
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
      <table className="customers-table">
        <thead>
          <tr>
            <th>
              <input 
                type="checkbox"
                checked={selectedCustomers.length === filteredAndSortedCustomers.length}
                onChange={toggleSelectAll}
              />
            </th>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registered Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedCustomers.map((customer, index) => (
            <tr key={customer.id}>
              <td>
                <input 
                  type="checkbox"
                  checked={selectedCustomers.includes(customer.id)}
                  onChange={() => toggleCustomerSelection(customer.id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.registeredAt}</td>
              <td>
                <span 
                  className={`status-badge ${
                    customer.status === 'Active' ? 'active' : 'inactive'
                  }`}
                >
                  {customer.status}
                </span>
              </td>
              <td>
                <button 
                  onClick={() => handleDelete(customer.id)} 
                  className="delete-btn"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Empty State */}
      {filteredAndSortedCustomers.length === 0 && (
        <div className="empty-state">
          No customers found
        </div>
      )}
    </div>
  );
}

export default Customers;