const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser & CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Mobile Auth API' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Auto-ping to keep Render server awake (every 5 minutes)
  setInterval(() => {
    // RENDER_EXTERNAL_URL là biến môi trường tự động có trên Render, hoặc bạn có thể tự cấu hình biến SERVER_URL trong .env
    const url = process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL || `http://localhost:${PORT}`;
    const httpModule = url.startsWith('https') ? require('https') : require('http');
    
    httpModule.get(url, (res) => {
      console.log(`[Auto-Ping] Trạng thái: ${res.statusCode} - Chống ngủ đông thành công!`);
    }).on('error', (err) => {
      console.error(`[Auto-Ping] Lỗi: ${err.message}`);
    });
  }, 5 * 60 * 1000); // 300,000 ms = 5 phút
});
