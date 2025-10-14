const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Client = require('../models/Client');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

// Load env vars
dotenv.config();

// Sample data
const users = [
  {
    username: 'admin',
    email: 'admin@elegantstitches.com',
    password: 'admin123',
    fullName: 'Admin User',
    role: 'admin',
    phone: '555-0100',
    isActive: true
  },
  {
    username: 'staff1',
    email: 'staff@elegantstitches.com',
    password: 'staff123',
    fullName: 'Staff Member',
    role: 'staff',
    phone: '555-0101',
    isActive: true
  }
];

const clients = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '555-1234',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    measurements: {
      bust: 36,
      waist: 28,
      hips: 38,
      height: 165,
      shirtSize: 'M',
      pantSize: '8'
    },
    status: 'active'
  },
  {
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '555-2345',
    address: {
      street: '456 Oak Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'USA'
    },
    measurements: {
      bust: 34,
      waist: 26,
      hips: 36,
      height: 160,
      shirtSize: 'S',
      pantSize: '6'
    },
    status: 'vip'
  },
  {
    name: 'Michael Brown',
    email: 'michael.b@email.com',
    phone: '555-3456',
    address: {
      street: '789 Pine Road',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'USA'
    },
    measurements: {
      chest: 40,
      waist: 32,
      shoulders: 18,
      height: 180,
      shirtSize: 'L',
      pantSize: '32'
    },
    status: 'active'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('📦 Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    try {
      await mongoose.connection.dropDatabase();
      console.log('✅ Database dropped and cleared');
    } catch (error) {
      console.log('Note: Database was already empty or error dropping:', error.message);
    }

    // Create users
    console.log('👤 Creating users...');
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create clients
    console.log('👥 Creating clients...');
    const clientsWithCreator = clients.map(client => ({
      ...client,
      createdBy: createdUsers[0]._id
    }));
    const createdClients = await Client.create(clientsWithCreator);
    console.log(`✅ Created ${createdClients.length} clients`);

    // Create sample orders
    console.log('📋 Creating sample orders...');
    const orders = [
      {
        client: createdClients[0]._id,
        items: [
          {
            itemType: 'dress',
            description: 'Custom evening dress with lace details',
            fabric: 'Silk',
            color: 'Navy Blue',
            quantity: 1,
            price: 450
          }
        ],
        pricing: {
          subtotal: 450,
          tax: 40.5,
          discount: 0,
          total: 490.5
        },
        status: 'in-progress',
        paymentStatus: 'partial',
        priority: 'high',
        dates: {
          orderDate: new Date(),
          expectedDelivery: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        },
        createdBy: createdUsers[0]._id
      },
      {
        client: createdClients[1]._id,
        items: [
          {
            itemType: 'suit',
            description: 'Custom tailored business suit',
            fabric: 'Wool',
            color: 'Charcoal Grey',
            quantity: 1,
            price: 650
          }
        ],
        pricing: {
          subtotal: 650,
          tax: 58.5,
          discount: 50,
          total: 658.5
        },
        status: 'pending',
        paymentStatus: 'pending',
        priority: 'normal',
        dates: {
          orderDate: new Date(),
          expectedDelivery: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
        },
        createdBy: createdUsers[0]._id
      },
      {
        client: createdClients[2]._id,
        items: [
          {
            itemType: 'alteration',
            description: 'Hemming pants',
            quantity: 2,
            price: 30
          }
        ],
        pricing: {
          subtotal: 60,
          tax: 5.4,
          discount: 0,
          total: 65.4
        },
        status: 'completed',
        paymentStatus: 'paid',
        priority: 'low',
        dates: {
          orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          expectedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        },
        createdBy: createdUsers[0]._id
      }
    ];

    const createdOrders = [];
    for (const orderData of orders) {
      const order = await Order.create(orderData);
      createdOrders.push(order);
    }
    console.log(`✅ Created ${createdOrders.length} orders`);

    // Update client statistics
    for (const client of createdClients) {
      const clientOrders = createdOrders.filter(
        order => order.client.toString() === client._id.toString()
      );
      
      client.totalOrders = clientOrders.length;
      client.totalSpent = clientOrders.reduce((sum, order) => sum + order.pricing.total, 0);
      client.lastOrderDate = clientOrders.length > 0 ? clientOrders[clientOrders.length - 1].dates.orderDate : null;
      
      await client.save();
    }

    // Create sample payments
    console.log('💳 Creating sample payments...');
    const payments = [
      {
        order: createdOrders[0]._id,
        client: createdClients[0]._id,
        amount: 200,
        paymentMethod: 'credit_card',
        paymentGateway: 'stripe',
        status: 'completed',
        processedBy: createdUsers[0]._id
      },
      {
        order: createdOrders[2]._id,
        client: createdClients[2]._id,
        amount: 65.4,
        paymentMethod: 'cash',
        paymentGateway: 'manual',
        status: 'completed',
        processedBy: createdUsers[0]._id
      }
    ];

    const createdPayments = await Payment.create(payments);
    console.log(`✅ Created ${createdPayments.length} payments`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login credentials:');
    console.log('   Admin: admin@elegantstitches.com / admin123');
    console.log('   Staff: staff@elegantstitches.com / staff123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();

