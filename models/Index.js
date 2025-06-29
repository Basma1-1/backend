const sequelize = require('../config/db');
const { Model } = require("sequelize");

const User = require('./User');
const Voyage = require('./Voyage');
const Hotel = require('./Hotel');
const Transport = require('./Transport');
const Activity = require('./Activity');
const Reservation = require('./Reservation');
const Document = require('./Document');
const Notification = require('./Notification');
const Paiement = require('./Paiement');
const Role = require('./Role');

Reservation.hasMany(Document);
Reservation.hasOne(Paiement);
Reservation.belongsTo(User);
Reservation.belongsTo(Voyage);
Reservation.belongsTo(Transport);
Reservation.belongsTo(Hotel);

class ReservationActivity extends Model {}
ReservationActivity.init({}, { sequelize })
Reservation.belongsToMany(Activity, { through: ReservationActivity });

User.hasMany(Reservation);
User.belongsTo(Role);
User.hasMany(Notification);

Role.hasMany(User)

Voyage.hasMany(Hotel);
Voyage.hasMany(Transport);
Voyage.hasMany(Activity);
Voyage.hasMany(Reservation);

Hotel.hasMany(Reservation);
Hotel.belongsTo(Voyage);

Activity.belongsToMany(Reservation, { through: ReservationActivity });
Activity.belongsTo(Voyage);

Notification.belongsTo(User);

Transport.belongsTo(Voyage);

module.exports = {
  sequelize,
  User,
  Role,
  Voyage,
  Hotel,
  Transport,
  Activity,
  Reservation,
  Document,
  Notification
};
