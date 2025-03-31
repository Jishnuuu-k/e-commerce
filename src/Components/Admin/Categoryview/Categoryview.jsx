import React, { useState, useEffect } from "react";
import axios from "../../../../Axios/Axios";
import "./categoryview.css";

function Categoryview({ sidebarWidth }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get("/Admin/get/categories")
            .then((response) => {
                setCategories(Array.isArray(response.data.response) ? response.data.response : []);
                setError(null);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                setError("Failed to load categories. Please try again later.");
                setCategories([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const mainStyle = {
        marginLeft: `${sidebarWidth}px`,
        width: `calc(100% - ${sidebarWidth}px)`,
        transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',
        padding: '2rem'
    };

    if (loading) {
        return (
            <div className="category-container" style={mainStyle}>
                <div className="loading-spinner"></div>
                <p>Loading categories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="category-container" style={mainStyle}>
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-button">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="category-container" style={mainStyle}>
            <div className="category-header">
                <h2 className="category-title">Product Categories</h2>
                <div className="category-count">{categories.length} categories</div>
            </div>

            {categories.length === 0 ? (
                <div className="no-categories">
                    <img src="/empty-state.svg" alt="No categories" className="empty-state-image" />
                    <p>No categories found. Add some to get started!</p>
                </div>
            ) : (
                <div className="category-grid">
                    {categories.map((category) => (
                        <div className="category-card" key={category._id}>
                            <div className="category-card-header">
                                <h3 className="category-name">{category.name}</h3>
                                <span className="subcategory-count">
                                    {category.subcategories?.length || 0} subcategories
                                </span>
                            </div>
                            <p className="category-description">
                                {category.description || "No description available"}
                            </p>
                            
                            {category.subcategories?.length > 0 ? (
                                <div className="subcategory-container">
                                    <h4 className="subcategory-title">Subcategories:</h4>
                                    <ul className="subcategory-list">
                                        {category.subcategories.map((sub, i) => (
                                            <li key={i} className="subcategory-item">
                                                <span className="subcategory-bullet">•</span>
                                                {typeof sub === 'object' ? sub.name : sub}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="no-subcategories">
                                    <span className="info-icon">ℹ️</span>
                                    No subcategories
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Categoryview;