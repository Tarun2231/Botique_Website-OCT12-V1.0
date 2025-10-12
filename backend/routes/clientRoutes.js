const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { protect, authorize } = require('../middleware/auth');
const { clientValidation, validate } = require('../middleware/validator');

// All routes are protected
router.use(protect);

// Statistics route (must be before /:id)
router.get('/stats', clientController.getClientStats);

// CRUD routes
router.route('/')
  .get(clientController.getAllClients)
  .post(clientValidation.create, validate, clientController.createClient);

router.route('/:id')
  .get(clientController.getClient)
  .put(clientValidation.update, validate, clientController.updateClient)
  .delete(authorize('admin'), clientController.deleteClient);

// Additional routes
router.put('/:id/measurements', protect, clientController.updateMeasurements);
router.post('/:id/photos', protect, clientController.addPhoto);

module.exports = router;

