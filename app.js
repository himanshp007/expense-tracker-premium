const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./utils/database');
const User = require('./models/user');
const Expense = require('./models/add-expense');
const Order = require('./models/order');
const ForgotPasswordReset = require("./models/ForgotPasswordRequests");
const DownloadedFiles = require('./models/downloadedfiles');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/add-expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);



User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(DownloadedFiles);
DownloadedFiles.belongsTo(User);

User.hasMany(ForgotPasswordReset);
ForgotPasswordReset.belongsTo(User);

sequelize.sync()
  .then(() => {
    console.log("Database sync successful");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(err => {
    console.error("Database sync error:", err);
});

