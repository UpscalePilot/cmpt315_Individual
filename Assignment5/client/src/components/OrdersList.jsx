import React, { useState, useEffect } from 'react';

function OrdersList() {
  const [orders, setOrders] = useState([]);

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/cancel/${orderId}`, {
        method: 'PUT',
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to cancel order');
      alert('Order cancelled successfully.');
      fetchOrders(); // Refresh list
    } catch (err) {
      alert(err.message);
    }
  };

  const isCancellable = (deliveryDateStr, status) => {
    if (status === 'Cancelled') return false;
    const deliveryDate = new Date(deliveryDateStr);
    const now = new Date();
    const daysDiff = (deliveryDate - now) / (1000 * 60 * 60 * 24);
    return daysDiff > 5;
  };

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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.productId?.name || 'N/A'}</td>
              <td>{order.quantity}</td>
              <td>{order.emailId}</td>
              <td>{order.deliveryDate.split('T')[0]}</td>
              <td>{order.status || 'Confirmed'}</td>
              <td>
                {isCancellable(order.deliveryDate, order.status) && (
                  <button onClick={() => handleCancel(order._id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersList;
