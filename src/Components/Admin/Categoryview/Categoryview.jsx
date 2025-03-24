import React from 'react';
import "./categoryview.css";
import { FaEdit, FaTrash } from "react-icons/fa"; 

const categories = [
    {
        name: "Motorcycle Accessories",
        subcategories: [
            "Bike Protection", "Handlebar and Accessories", "Lighting", 
            "Performance Accessories", "Body Fairing and Fenders", 
            "Bike Essentials", "Foot Controls", "Cleaning Accessories", "Wheel Accessories"
        ]
    },
    { name: "Riding Gears", subcategories: ["Gloves", "Jackets", "Boots", "Pants"] },
    { name: "Luggage and Touring", subcategories: ["Saddlebags", "Tank Bags", "Tail Bags"] },
    { name: "Helmets and Accessories", subcategories: ["Full Face", "Modular", "Visors"] }
];

function Categoryview({ sidebarWidth }) {
    const mainStyle = {
        marginLeft: sidebarWidth ? `${sidebarWidth}px` : '0',
        width: sidebarWidth ? `calc(100% - ${sidebarWidth}px)` : '100%',
        transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out'
    };

    return (
        <div className="category-container" style={mainStyle}>
            <h2 className="category-title">Product Categories</h2>
            <div className="category-list">
                {categories.map((category, index) => (
                    <div className="category-card" key={index}>
                        <div className="category-header">
                            <h3 className="category-name">{category.name}</h3>
                            <div className="category-actions">
                                <button className="editt-btn"><FaEdit /></button>
                                <button className="deletee-btn"><FaTrash /></button>
                            </div>
                        </div>
                        <ul className="subcategory-list">
                            {category.subcategories.map((sub, i) => (
                                <li key={i} className="subcategory-item">
                                    {sub}
                                    <div className="subcategory-actions">
                                        <button className="editt-btn"><FaEdit /></button>
                                        <button className="deletee-btn"><FaTrash /></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categoryview;
