const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = 8000;
const db = require('./models');
const authRoute = require('./routes/auth');
const weaponRoute = require('./routes/weapon');
const billRoute = require('./routes/bill');
const pllRoute = require('./routes/pll');
const ammuRoute = require('./routes/ammu');
const targetRoute = require('./routes/target');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoute);
app.use('/api/weapon', weaponRoute);
app.use('/api/bill', billRoute);
app.use('/api/pll', pllRoute);
app.use('/api/ammu', ammuRoute);
app.use('/api/target', targetRoute);

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`server running with port ${PORT}`);
  });
});
