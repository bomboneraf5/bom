const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const reservationsRouter = require('./routes/reservations');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/reservations', reservationsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
