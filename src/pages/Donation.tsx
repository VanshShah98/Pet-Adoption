import React, { useState } from 'react';
import {QRCodeSVG} from 'qrcode.react';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(parseFloat(amount))) {
      alert('Please enter a valid amount');
      return;
    }

    // Construct the Google Pay (UPI) link with dynamic amount
    const googlePayLink = `upi://pay?pa=vanshshah0908@okhdfcbank&pn=Vansh&am=${amount}&cu=INR`;

    // Set the generated link for QR code
    setPaymentLink(googlePayLink);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Donation Amount (INR):
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter donation amount"
          />
        </label>
        <button type="submit">Generate Payment QR</button>
      </form>

      {paymentLink && (
        <div>
          <h3>Scan to Donate</h3>
          <QRCodeSVG value={paymentLink} size={256} />
          <p>Scan the QR code with Google Pay to complete your donation</p>
        </div>
      )}
    </div>
  );
};

export default Donation;
