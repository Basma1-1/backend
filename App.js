const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const multer = require('multer');
const { sequelize } = require("./models");
require('./models');

const authRoutes = require('./routes/authRoute');
const voyageRoutes = require('./routes/voyageUserRoute'); 
const reservationRoutes = require('./routes/reservationRoute');
const notificationRoutes = require('./routes/notificationRoute');
const adminRoutes = require("./routes/adminRoute");
const voyageAdminRoutes = require('./routes/voyageAdminRoute');
const hotelAdminRoutes = require('./routes/hotelAdminRoute');
const transportAdminRoutes = require('./routes/transportAdminRoute');
const activityAdminRoutes = require('./routes/activityAdminRoute');
const adminNotificationRoutes = require("./routes/adminNotificationRoute");
const userAdminRoutes = require("./routes/userAdminRoute"); 
const statsRoutes = require("./routes/statsRoute")
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors());

app.use('/pdfs', express.static(path.join(__dirname, 'pdfs')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes
app.use('/auth', authRoutes);
app.use('/voyages', voyageRoutes); 
app.use('/reservation', reservationRoutes);
app.use('/notification', notificationRoutes);
app.use("/admin", adminRoutes);
app.use('/admin/voyage', voyageAdminRoutes);
app.use('/admin/hotels', hotelAdminRoutes);
app.use('/admin/transports', transportAdminRoutes);
app.use('/admin/activities', activityAdminRoutes);
app.use("/admin/notification", adminNotificationRoutes);
app.use("/admin/user", userAdminRoutes);
app.use('/admin', adminRoutes);
app.use('/admin' ,statsRoutes )


const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true, logging: false })
.then(() => {
  console.log("DB connectée avec succès");
  app.listen(8080, () => {
    console.log("Serveur démarré sur http://localhost:8080");
  });
  })
  .catch((error) => {
    console.error("Erreur connexion DB : ", error);
  });


module.exports = app;