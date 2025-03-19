import React, { useState, useEffect } from 'react';

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Orders List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Email</th>
            <th>Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.productId?.name || 'N/A'}</td>
              <td>{order.quantity}</td>
              <td>{order.emailId}</td>
              <td>{order.deliveryDate.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersList;