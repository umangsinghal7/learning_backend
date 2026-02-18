const express = require('express');
const app = express();
const shelterRoutes = require('./routes/shelter');
const dogRoutes = require('./routes/dogs');
const adminRoutes = require('./routes/admin');



app.use('/dogs', dogRoutes);
app.use('/admin', adminRoutes);
app.use('/shelter', shelterRoutes);

app.listen(7000, () => {
    console.log("APP IS LISTENING ON PORT 7000!")
}   )