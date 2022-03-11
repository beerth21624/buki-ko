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
const subBillRoute = require('./routes/subBill');
const userRoute = require('./routes/user');
const todoRoute = require('./routes/todo');
const docRoute = require('./routes/doc');

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
app.use('/api/subbill', subBillRoute);
app.use('/api/user', userRoute);
app.use('/api/todo', todoRoute);
app.use('/api/doc', docRoute);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`server running with port ${PORT}`);
  });
});
