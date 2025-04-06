import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(() => localStorage.getItem('category') || '');
  const [minPrice, setMinPrice] = useState(() => localStorage.getItem('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(() => localStorage.getItem('maxPrice') || '');
  const [sortColumn, setSortColumn] = useState(() => localStorage.getItem('sortColumn') || 'name');
  const [sortOrder, setSortOrder] = useState(() => localStorage.getItem('sortOrder') || 'asc');

  // Fetch all categories on first load only
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products`);
        const data = await res.json();
        const uniqueCategories = [...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchAllCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (category) queryParams.append('category', category);
      if (minPrice) queryParams.append('price_gte', minPrice);
      if (maxPrice) queryParams.append('price_lte', maxPrice);
      if (sortColumn) {
        queryParams.append('sort', sortColumn);
        queryParams.append('order', sortOrder);
      }

      const response = await fetch(`http://localhost:5000/api/products?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products. Please try again later.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, minPrice, maxPrice, sortColumn, sortOrder]);

  useEffect(() => {
    localStorage.setItem('category', category);
    localStorage.setItem('minPrice', minPrice);
    localStorage.setItem('maxPrice', maxPrice);
    localStorage.setItem('sortColumn', sortColumn);
    localStorage.setItem('sortOrder', sortOrder);
  }, [category, minPrice, maxPrice, sortColumn, sortOrder]);

  const setSort = (column, order) => {
    setSortColumn(column);
    setSortOrder(order);
  };

  const resetFilters = () => {
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortColumn('name');
    setSortOrder('asc');
    localStorage.removeItem('category');
    localStorage.removeItem('minPrice');
    localStorage.removeItem('maxPrice');
    localStorage.removeItem('sortColumn');
    localStorage.removeItem('sortOrder');
  };

  return (
    <div>
      <h1>Product Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Category:
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Min Price:
          <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Max Price:
          <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
        </label>
        <button style={{ marginLeft: '1rem' }} onClick={resetFilters}>Reset Filters</button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>
              Name
              <button onClick={() => setSort('name', 'asc')}>↑</button>
              <button onClick={() => setSort('name', 'desc')}>↓</button>
            </th>
            <th>
              Category
              <button onClick={() => setSort('category', 'asc')}>↑</button>
              <button onClick={() => setSort('category', 'desc')}>↓</button>
            </th>
            <th>
              Price
              <button onClick={() => setSort('price', 'asc')}>↑</button>
              <button onClick={() => setSort('price', 'desc')}>↓</button>
            </th>
            <th>
              Stock
              <button onClick={() => setSort('stock', 'asc')}>↑</button>
              <button onClick={() => setSort('stock', 'desc')}>↓</button>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <Link to={`/order/${product._id}`}>
                  <button disabled={product.stock === 0}>Order Now</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
