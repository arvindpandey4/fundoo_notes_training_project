const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const routes = require('./routes');
const { errorHandler, notFound } = require('./middlewares/error.middleware');
const logger = require('./utils/logger');

dotenv.config();
connectDB();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));

app.get('/', (req, res) => res.json({ message: 'Fundoo API v1' }));
app.use('/api/v1', routes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => logger.info(`Server running on ${PORT}`));

process.on('unhandledRejection', (err) => {
    logger.error(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});
module.exports = app;
