const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Send order confirmation email
exports.sendOrderConfirmation = async (order, client) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Elegant Stitches" <${process.env.EMAIL_USER}>`,
      to: client.email,
      subject: `Order Confirmation - ${order.orderNumber}`,
      html: `
        <h1>Order Confirmation</h1>
        <p>Dear ${client.name},</p>
        <p>Thank you for your order! Your order number is <strong>${order.orderNumber}</strong>.</p>
        
        <h2>Order Details:</h2>
        <ul>
          ${order.items.map(item => `
            <li>${item.itemType}: ${item.description} - $${item.price}</li>
          `).join('')}
        </ul>
        
        <p><strong>Total: $${order.pricing.total}</strong></p>
        <p>Expected Delivery: ${order.dates.expectedDelivery ? new Date(order.dates.expectedDelivery).toLocaleDateString() : 'TBD'}</p>
        
        <p>We'll keep you updated on the progress of your order.</p>
        
        <p>Best regards,<br>Elegant Stitches Boutique</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Order confirmation email sent to ${client.email}`);
  } catch (error) {
    console.error('❌ Error sending order confirmation email:', error);
    throw error;
  }
};

// Send order status update email
exports.sendOrderStatusUpdate = async (order, client, newStatus) => {
  try {
    const transporter = createTransporter();

    const statusMessages = {
      'pending': 'Your order has been received and is pending processing.',
      'in-progress': 'Great news! We\'ve started working on your order.',
      'ready-for-fitting': 'Your item is ready for fitting. Please schedule an appointment.',
      'completed': 'Your order is complete and ready for pickup!',
      'delivered': 'Your order has been delivered. Thank you!',
      'cancelled': 'Your order has been cancelled.'
    };

    const mailOptions = {
      from: `"Elegant Stitches" <${process.env.EMAIL_USER}>`,
      to: client.email,
      subject: `Order Update - ${order.orderNumber}`,
      html: `
        <h1>Order Status Update</h1>
        <p>Dear ${client.name},</p>
        <p>Your order <strong>${order.orderNumber}</strong> status has been updated to: <strong>${newStatus}</strong></p>
        
        <p>${statusMessages[newStatus]}</p>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>Elegant Stitches Boutique</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Status update email sent to ${client.email}`);
  } catch (error) {
    console.error('❌ Error sending status update email:', error);
    throw error;
  }
};

// Send payment confirmation email
exports.sendPaymentConfirmation = async (payment, order, client) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Elegant Stitches" <${process.env.EMAIL_USER}>`,
      to: client.email,
      subject: `Payment Received - ${order.orderNumber}`,
      html: `
        <h1>Payment Confirmation</h1>
        <p>Dear ${client.name},</p>
        <p>We have received your payment for order <strong>${order.orderNumber}</strong>.</p>
        
        <h2>Payment Details:</h2>
        <ul>
          <li>Amount: $${payment.amount}</li>
          <li>Payment Method: ${payment.paymentMethod}</li>
          <li>Date: ${new Date(payment.paymentDate).toLocaleDateString()}</li>
        </ul>
        
        <p>Thank you for your payment!</p>
        
        <p>Best regards,<br>Elegant Stitches Boutique</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Payment confirmation email sent to ${client.email}`);
  } catch (error) {
    console.error('❌ Error sending payment confirmation email:', error);
    throw error;
  }
};

