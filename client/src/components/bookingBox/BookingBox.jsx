import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

const BookingBox = () => {
  const handlePayPalSuccess = (details, data) => {
    
  };

  return (
    <div className="bookingBox">
      <h3>Booking Information</h3>
      
      <PayPalButton
        amount='3500'
        onSuccess={handlePayPalSuccess}
        options={{
          clientId: "AXOubjX3_ES8XLbzQF0h4Hs84FcCtmlRd6Ij1E8IQeQKvHGdyJlRcEUkMwfar0If_HgJ7oDP96yK8ww8",
        }}
      />

    </div>
  );
};

export default BookingBox;
