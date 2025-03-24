import React, { useState, useEffect } from "react";
import "./customers.css";

function Customers({ sidebarWidth }) {
  const [customers, setCustomers] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest"); // Sorting order

  useEffect(() => {
    // Sample data (Replace with API call)
    const sampleCustomers = [
      { id: 1, name: "John Doe", email: "john@example.com", registeredAt: "2024-03-10" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", registeredAt: "2024-02-20" },
      { id: 3, name: "Alice Johnson", email: "alice@example.com", registeredAt: "2024-03-15" },
    ];
    setCustomers(sampleCustomers);
  }, []);

  // Sorting function
  const sortedCustomers = [...customers].sort((a, b) => {
    return sortOrder === "newest"
      ? new Date(b.registeredAt) - new Date(a.registeredAt)
      : new Date(a.registeredAt) - new Date(b.registeredAt);
  });

  // Delete customer
  const handleDelete = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const mainStyle = {
    marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
    width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
  };

  return (
    <div className="customers-container" style={mainStyle}>
      <h2>All Customers</h2>
      
      {/* Sorting Filter */}
      <div className="filter-container">
        <label>Sort by Registration: </label>
        <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>

      {/* Customers Table */}
      <table className="customers-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registered Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedCustomers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.registeredAt}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
