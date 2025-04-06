import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProductOrder from './components/ProductOrder';
import OrdersList from './components/OrdersList';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/order/:productId" element={<ProductOrder />} />
          <Route path="/orders" element={<OrdersList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;