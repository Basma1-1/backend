const db = require('../models'); 

async function getReservationDetails(reservationId) {
 
  const reservation = await db.Reservation.findByPk(reservationId);
  const voyage = await db.Voyage.findByPk(reservation.voyage_id);
  const hotel = await db.Hotel.findOne({ where: { voyage_id: voyage.id } });
  const transport = await db.Transport.findOne({ where: { voyage_id: voyage.id } });
  const activities = await db.Activity.findAll({ where: { voyage_id: voyage.id } });

  return { reservation, voyage, hotel, transport, activities };
}

module.exports = { getReservationDetails };
