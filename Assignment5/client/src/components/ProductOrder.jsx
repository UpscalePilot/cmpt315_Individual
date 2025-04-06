import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductOrder() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [emailId, setEmailId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        const foundProduct = data.find(p => p._id === productId);
        setProduct(foundProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantity > product.stock) {
      setError('Requested quantity exceeds available stock.');
      return;
    }

    const orderPayload = {
      productId: product._id,
      quantity,
      emailId,
      deliveryDate
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: product.stock - quantity })
      });
      navigate('/orders');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!product) return <div>Loading product details...</div>;

  return (
    <div>
      <h2>Order {product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Available Stock: {product.stock}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </label>
        <br />
        <label>
          Email Address:
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Delivery Date:
          <input
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
}

export default ProductOrder;
