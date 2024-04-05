const express = require("express");
const app = express();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const fs = require('fs');
const mime = require('mime');
const port = process.env.PORT || 3000;
const dir = "public/";
const cors = require('cors');
app.use(cors());

app.use(express.static("public"))
app.use(express.json())


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@${process.env.HOST}`
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

let collection = null;

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  deliveryInstructions: String,
  phone: String,
  toppings: [String],
  dietary: String,
  deliveryDate: String,
  deliveryTime: String,
  orderRank: Number,
  paid: String,
  comments: String,
});

const Order = mongoose.model('Order', orderSchema);

// Middleware
app.use(express.json());
app.use(express.static(dir));

// Handle POST request
app.post("/submit", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    await sortAndRankOrders();
    res.send({ message: "Order received and ranked" });
  } catch (err) {
    // Log the error for server-side visibility
    console.error(err);

    // Send a more detailed error response to the client
    res.status(400).json({
      message: "Error processing request",
      error: err.message // Sending back a more specific error message
    });
  }
});

// Function to sort and rank orders
async function sortAndRankOrders() {
  const orders = await Order.find({});
  orders.sort((a, b) => {
    const dateA = new Date(`${a.deliveryDate}T${a.deliveryTime}`);
    const dateB = new Date(`${b.deliveryDate}T${b.deliveryTime}`);
    return dateA - dateB;
  });

  for (let i = 0; i < orders.length; i++) {
    orders[i].orderRank = i + 1;
    await orders[i].save();
  }
}

// Handle GET requests
app.get("/orders", async (req, res) => {
  const userEmail = req.query.email; // Retrieve the email from query parameters
  try {
    // Filter orders by the provided email
    const orders = await Order.find({ email: userEmail }).sort('orderRank');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while fetching orders.");
  }
});

app.delete('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete the order', error: err.message });
  }
});

app.patch('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    // Find the order by ID and update it with the new data
    // Assuming updateData contains the field to update and the new value
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedOrder) {
      return res.status(404).send({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update the order', error: err.message });
  }
});

// Serve HTML files
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/order.html');
});

app.get('/all_orders.html', (req, res) => {
  Order.find({}).sort('orderRank').then(orders => {
    fs.readFile("public/all_orders.html", 'utf8', (err, content) => {
      if (err) return res.status(404).send("404 Error: File Not Found");
      console.log(localStorage.getItem('userEmail'));
      let ordersHtml = orders.map(order => {
        return `<tr>
          <td>${order.name}</td>
          <td>${localStorage.getItem('userEmail')}</td>
          <td>${order.address}</td>
          <td>${order.deliveryInstructions}</td>
          <td>${order.phone}</td>
          <td>${order.toppings.join(", ")}</td>
          <td>${order.dietary}</td>
          <td>${order.deliveryDate}</td>
          <td>${order.deliveryTime}</td>
          <td>${order.orderRank}</td>
          <td>${order.paid}</td>
          <td>${order.comments}</td>
        </tr>`;
      }).join('');

      content = content.replace('<tbody></tbody>', `<tbody>${ordersHtml}</tbody>`);
      res.send(content);
    });
  }).catch(err => res.status(500).send(err));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
