const PDFDocument = require('pdfkit');
const Order = require('../models/Order');
const Client = require('../models/Client');
const Payment = require('../models/Payment');
const { AppError } = require('../middleware/errorHandler');

// @desc    Generate invoice PDF
// @route   GET /api/invoices/:orderId
// @access  Private
exports.generateInvoice = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('client')
      .populate('createdBy', 'fullName email');

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    // Get payments for this order
    const payments = await Payment.find({ 
      order: order._id,
      status: 'completed'
    });

    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const balance = order.pricing.total - totalPaid;

    // Create PDF document
    const doc = new PDFDocument({ margin: 50 });

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${order.orderNumber}.pdf`);

    // Pipe PDF to response
    doc.pipe(res);

    // Add content to PDF
    // Header
    doc.fontSize(20)
       .text('INVOICE', 50, 50);

    doc.fontSize(10)
       .text('Elegant Stitches Boutique', 50, 80)
       .text('123 Fashion Street', 50, 95)
       .text('New York, NY 10001', 50, 110)
       .text('contact@elegantstitches.com', 50, 125);

    // Invoice details
    doc.fontSize(10)
       .text(`Invoice #: ${order.orderNumber}`, 400, 80)
       .text(`Date: ${new Date(order.dates.orderDate).toLocaleDateString()}`, 400, 95)
       .text(`Status: ${order.status}`, 400, 110);

    // Client information
    doc.fontSize(12)
       .text('Bill To:', 50, 160);
    
    doc.fontSize(10)
       .text(order.client.name, 50, 180)
       .text(order.client.email, 50, 195)
       .text(order.client.phone, 50, 210);

    if (order.client.address && order.client.address.street) {
      doc.text(order.client.address.street, 50, 225)
         .text(`${order.client.address.city}, ${order.client.address.state} ${order.client.address.zipCode}`, 50, 240);
    }

    // Items table
    const tableTop = 280;
    
    doc.fontSize(10)
       .text('Item', 50, tableTop)
       .text('Description', 150, tableTop)
       .text('Qty', 350, tableTop)
       .text('Price', 400, tableTop)
       .text('Total', 480, tableTop);

    doc.moveTo(50, tableTop + 15)
       .lineTo(550, tableTop + 15)
       .stroke();

    let yPosition = tableTop + 25;

    order.items.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      
      doc.fontSize(9)
         .text(item.itemType, 50, yPosition)
         .text(item.description.substring(0, 30), 150, yPosition)
         .text(item.quantity, 350, yPosition)
         .text(`$${item.price.toFixed(2)}`, 400, yPosition)
         .text(`$${itemTotal.toFixed(2)}`, 480, yPosition);

      yPosition += 20;
    });

    // Totals
    yPosition += 20;
    doc.moveTo(350, yPosition)
       .lineTo(550, yPosition)
       .stroke();

    yPosition += 15;

    doc.fontSize(10)
       .text('Subtotal:', 350, yPosition)
       .text(`$${order.pricing.subtotal.toFixed(2)}`, 480, yPosition);

    yPosition += 20;

    if (order.pricing.tax > 0) {
      doc.text('Tax:', 350, yPosition)
         .text(`$${order.pricing.tax.toFixed(2)}`, 480, yPosition);
      yPosition += 20;
    }

    if (order.pricing.discount > 0) {
      doc.text('Discount:', 350, yPosition)
         .text(`-$${order.pricing.discount.toFixed(2)}`, 480, yPosition);
      yPosition += 20;
    }

    doc.fontSize(12)
       .font('Helvetica-Bold')
       .text('Total:', 350, yPosition)
       .text(`$${order.pricing.total.toFixed(2)}`, 480, yPosition);

    yPosition += 25;

    doc.fontSize(10)
       .font('Helvetica')
       .text('Paid:', 350, yPosition)
       .text(`$${totalPaid.toFixed(2)}`, 480, yPosition);

    yPosition += 20;

    doc.fontSize(11)
       .font('Helvetica-Bold')
       .text('Balance Due:', 350, yPosition)
       .text(`$${balance.toFixed(2)}`, 480, yPosition);

    // Footer
    doc.fontSize(8)
       .font('Helvetica')
       .text('Thank you for your business!', 50, 700, { align: 'center', width: 500 })
       .text('For questions about this invoice, please contact us at contact@elegantstitches.com', 50, 715, { align: 'center', width: 500 });

    // Finalize PDF
    doc.end();

  } catch (error) {
    next(error);
  }
};

// @desc    Get invoice data (JSON)
// @route   GET /api/invoices/:orderId/data
// @access  Private
exports.getInvoiceData = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('client')
      .populate('createdBy', 'fullName email');

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    // Get payments for this order
    const payments = await Payment.find({ 
      order: order._id,
      status: 'completed'
    });

    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const balance = order.pricing.total - totalPaid;

    res.status(200).json({
      status: 'success',
      data: {
        order,
        payments,
        summary: {
          totalPaid,
          balance,
          paymentStatus: order.paymentStatus
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

