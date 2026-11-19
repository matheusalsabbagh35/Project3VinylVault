import React, { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutPage = ({ cart, onClearCart }) => {
  // Check if the order has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize the form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    shippingAddress: "",
    city: "",
    postalCode: "",
    cardDetails: "",
  });

  // Calculate the cart subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Calculate taxes and total
  const taxes = subtotal * 0.06;
  const total = subtotal + taxes;

  // Handle changes to the form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle the order submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    onClearCart();
  };

  // Display confirmation after placing an order
  if (isSubmitted) {
    return (
      <div className="checkout-success">
        <h2>Order Placed Successfully</h2>
        <p>
          Thank you, {formData.fullName}! Your VinylVault order has been placed
          successfully. A confirmation will be sent to {formData.email}.
        </p>
        <Link className="btn btn-primary" to="/">
          Return to HomePage
        </Link>
      </div>
    );
  }

  // Check if the cart is empty
  if (cart.length === 0) {
    return (
      <div className="empty-cart-page">
        <h2>Your cart is empty.</h2>
        <Link className="btn btn-secondary" to="/">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout and Order Confirmation</h1>

      <div className="checkout-grid">
        {/* Checkout form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>

          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address *</label>
            <input
              type="text"
              name="shippingAddress"
              id="shippingAddress"
              required
              value={formData.shippingAddress}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              name="city"
              id="city"
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Postal Code *</label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              required
              pattern="[0-9]{5}"
              title="Enter a 5-digit postal code"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>

          <h2>Payment Information</h2>

          <div className="form-group">
            <label htmlFor="cardDetails">Card Details *</label>
            <input
              type="text"
              name="cardDetails"
              id="cardDetails"
              required
              pattern="[0-9]{16}"
              title="Enter a 16-digit card number"
              placeholder="16-digit card number"
              value={formData.cardDetails}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Complete Order (${total.toFixed(2)})
          </button>
        </form>

        {/* Order summary */}
        <aside className="order-summary-card">
          <h3>Order Summary</h3>

          <ul className="summary-list">
            {cart.map((item) => (
              <li key={item.id} className="summary-row">
                <span>
                  {item.title} &times; {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <hr />

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Tax (6%):</span>
            <span>${taxes.toFixed(2)}</span>
          </div>

          <div className="summary-row total-row">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
