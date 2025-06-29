const express = require('express');
const router = express.Router();
const activityAdminController = require('../controllers/activityAdminController');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

router.use(verifyToken, isAdmin);

// ajouter activity
router.post('/:voyageId', activityAdminController.createActivity);

// modifier  activity
router.put('/:id', activityAdminController.updateActivity);

// supprimer  activity
router.delete('/:id', activityAdminController.deleteActivity);

// voir toutes  activity 
router.get('/voyage/:voyageId', activityAdminController.getActivitiesByVoyage);

module.exports = router;
