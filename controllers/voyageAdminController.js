const path = require("path");
const { Op } = require('sequelize');

const { Voyage, Hotel, Transport, Activity } = require("../models");

// formatage des dates en y-m-d
function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (isNaN(date)) return "";

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// créer un voyage
exports.createVoyage = async (req, res) => {
  try {
    console.log("req.files =>", req.files);
    console.log("req.body =>", req.body);

    const voyageData = {
      description: req.body.description,
      depart: req.body.depart,
      destination: req.body.destination,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      image_url: req.files['image'] && req.files['image'][0]
        ? '/uploads/' + req.files['image'][0].filename
        : null,
    };

    let hotels = [];
    if (req.body.Hotels) {
      hotels = JSON.parse(req.body.Hotels);
      const hotelsImages = req.files['HotelsImages'] || [];
      if (req.files['HotelsImages']) {
        hotels = hotels.map((h, i) => ({
        ...h,
        image_url: hotelsImages[i] ? '/uploads/' + hotelsImages[i].filename : null
        }));
      }
    }

    let transports = [];
    if (req.body.Transports) {
      transports = JSON.parse(req.body.Transports);
      const transportsImages = req.files['TransportsImages'] || [];
      if (req.files['TransportsImages']) {
        transports = transports.map((t, i) => ({
        ...t,
        image_url: transportsImages[i] ? '/uploads/' + transportsImages[i].filename : null
        }));
      }
    }

    let activities = [];
    if (req.body.Activities) {
      activities = JSON.parse(req.body.Activities);
      const activitiesImages = req.files['ActivitiesImages'] || [];
      if (req.files['ActivitiesImages']) {
        activities = activities.map((a, i) => ({
        ...a,
        image_url: activitiesImages[i] ? '/uploads/' + activitiesImages[i].filename : null
        }));
      }
    }

    let voyage = await Voyage.create(voyageData);

    if (hotels.length > 0) {
      await Promise.all(hotels.map(h => Hotel.create({ ...h, VoyageId: voyage.id })));
    }
    if (transports.length > 0) {
      await Promise.all(transports.map(t => Transport.create({ ...t, VoyageId: voyage.id })));
    }
    if (activities.length > 0) {
      await Promise.all(activities.map(a => Activity.create({ ...a, VoyageId: voyage.id })));
    }

    voyage = await Voyage.findByPk(voyage.id, {
      include: [Hotel, Transport, Activity]
    });

    res.status(201).json(voyage);

  } catch (error) {
    console.error("Erreur création voyage :", error); 
    res.status(500).json({ message: 'Erreur lors de la création du voyage', error: error.message });
  }
};

// lire un voyage par id
exports.getOneVoyage = async (req, res) => {
  try {
    const id = req.params.id;
    const voyage = await Voyage.findByPk(id, {
      include: [Hotel, Transport, Activity]
    });

    if (!voyage) return res.status(404).json({ message: "Voyage introuvable" });

    const data = voyage.toJSON();
    const BASE_URL = 'http://localhost:8080'; 

    data.start_date = formatDate(data.start_date);
    data.end_date = formatDate(data.end_date);

    if (data.image_url) {
      data.image_url = `${BASE_URL}${data.image_url}`;
    }

    data.Hotels = data.Hotels.map(h => ({
      ...h,
      image_url: h.image_url ? `${BASE_URL}${h.image_url}` : null,
      start_date: formatDate(h.start_date),
      end_date: formatDate(h.end_date),
    }));

    data.Transports = data.Transports.map(t => ({
      ...t,
      image_url: t.image_url ? `${BASE_URL}${t.image_url}` : null,
      departure_date: formatDate(t.departure_date),
      departure_time: t.departure_time?.slice(0, 5),
      return_date: formatDate(t.return_date),
      return_time: t.return_time?.slice(0, 5),
    }));

    data.Activities = data.Activities.map(a => ({
      ...a,
      image_url: a.image_url ? `${BASE_URL}${a.image_url}` : null,
      activity_time: a.activity_time?.slice(0, 5),
      date: formatDate(a.date),
    }));

    res.json(data);
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ message: "Erreur serveur", err });
  }
};

// lire tous les voyages
exports.getAllVoyages = async (req, res) => {
  try {
    const voyages = await Voyage.findAll({
      include: [Hotel, Transport, Activity]
    });

    const BASE_URL = 'http://localhost:8080';
    const formatted = voyages.map(v => {
      const voyage = v.toJSON();
      if (voyage.image_url) {
        voyage.image_url = BASE_URL + voyage.image_url;
      }

      voyage.Hotels = voyage.Hotels.map(h => ({
        ...h,
        image_url: h.image_url ? BASE_URL + h.image_url : null,
        start_date: formatDate(h.start_date),
        end_date: formatDate(h.end_date),
      }));

      voyage.Transports = voyage.Transports.map(t => ({
        ...t,
        image_url: t.image_url ? BASE_URL + t.image_url : null,
        time: t.time?.slice(0, 5)
        
      }));

      voyage.Activities = voyage.Activities.map(a => ({
        ...a,
        image_url: a.image_url ? BASE_URL + a.image_url : null,
        activity_time: a.activity_time?.slice(0, 5),
        date: formatDate(a.date),
      }));

      return voyage;
    });

    res.json(formatted);
  } catch (err) {
    console.error("Erreur getAllVoyages :", err);
    res.status(500).json({ message: "Erreur lors de la récupération des voyages" });
  }
};

// modifier un voyage
exports.updateVoyage = async (req, res) => {
  try {
    const id = req.params.id;
    const voyage = await Voyage.findByPk(id, {
      include: [Hotel, Transport, Activity],
    });

    if (!voyage) {
      return res.status(404).json({ message: 'Voyage non trouvé' });
    }

    const imageFile = req.files?.image?.[0];
    await voyage.update({
      description: req.body.description,
      depart: req.body.depart,
      destination: req.body.destination,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      image_url: imageFile ? `/uploads/${imageFile.filename}` : voyage.image_url,
    });

    const hotels = JSON.parse(req.body.Hotels || '[]');
    const transports = JSON.parse(req.body.Transports || '[]');
    const activities = JSON.parse(req.body.Activities || '[]');

    const hotelImageFiles = req.files?.HotelsImages || [];
    const hotelIds = [];

    for (let i = 0; i < hotels.length; i++) {
      const h = hotels[i];
      const image = hotelImageFiles[i];
      if (h.id) {
        await Hotel.update(
          {
            ...h,
            image_url: image ? `/uploads/${image.filename}` : undefined,
          },
          { where: { id: h.id } }
        );
        hotelIds.push(h.id);
      } else {
        const newHotel = await Hotel.create({
          ...h,
          image_url: image ? `/uploads/${image.filename}` : null,
          VoyageId: voyage.id,
        });
        hotelIds.push(newHotel.id);
      }
    }

    await Hotel.destroy({
      where: {
        VoyageId: voyage.id,
        id: { [Op.notIn]: hotelIds },
      },
    });

    const transportImageFiles = req.files?.TransportsImages || [];
    const transportIds = [];

    for (let i = 0; i < transports.length; i++) {
      const t = transports[i];
      const image = transportImageFiles[i];
      if (t.id) {
        await Transport.update(
          {
            ...t,
            image_url: image ? `/uploads/${image.filename}` : undefined,
          },
          { where: { id: t.id } }
        );
        transportIds.push(t.id);
      } else {
        const newTransport = await Transport.create({
          ...t,
          image_url: image ? `/uploads/${image.filename}` : null,
          VoyageId: voyage.id,
        });
        transportIds.push(newTransport.id);
      }
    }

    await Transport.destroy({
      where: {
        VoyageId: voyage.id,
        id: { [Op.notIn]: transportIds },
      },
    });

    const activityImageFiles = req.files?.ActivitiesImages || [];
    const activityIds = [];

    for (let i = 0; i < activities.length; i++) {
      const a = activities[i];
      const image = activityImageFiles[i];
      if (a.id) {
        await Activity.update(
          {
            ...a,
            image_url: image ? `/uploads/${image.filename}` : undefined,
          },
          { where: { id: a.id } }
        );
        activityIds.push(a.id);
      } else {
        const newActivity = await Activity.create({
          ...a,
          image_url: image ? `/uploads/${image.filename}` : null,
          VoyageId: voyage.id,
        });
        activityIds.push(newActivity.id);
      }
    }

    await Activity.destroy({
      where: {
        VoyageId: voyage.id,
        id: { [Op.notIn]: activityIds },
      },
    });

    return res.status(200).json({ message: 'Voyage mis à jour avec succès' });

  } catch (error) {
    console.error('Erreur update voyage:', error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

// supprimer un voyage
exports.deleteVoyage = async (req, res) => {
  try {
    const id = req.params.id;
    const voyage = await Voyage.findByPk(id);
    if (!voyage) return res.status(404).json({ message: "Voyage introuvable" });

    await voyage.destroy();
    res.json({ message: "Voyage supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du voyage" });
  }
};
