const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

const voyageController = require('../controllers/voyageAdminController');
const verifyToken  = require('../middleware/verifyToken');
const isAdmin  = require('../middleware/isAdmin');


  const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'HotelsImages' },
    { name: 'TransportsImages' },
    { name: 'ActivitiesImages' },
  ]);


  router.post('/', verifyToken, isAdmin, uploadFields, voyageController.createVoyage);
  router.get('/', voyageController.getAllVoyages); 
  router.get('/:id', voyageController.getOneVoyage);
  router.put('/:id', verifyToken, isAdmin, uploadFields, voyageController.updateVoyage);
  router.delete('/:id', verifyToken, isAdmin, voyageController.deleteVoyage);

module.exports = router;
