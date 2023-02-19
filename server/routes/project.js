const express = require('express');
const router = express.Router();
const projectController = require("../controllers/projectController");
const passport = require('passport');

router.post('/add', passport.authenticate('jwt', { session: false }), projectController.addProject);

router.get('/', passport.authenticate('jwt', { session: false }), projectController.getProjects);

router.patch('/', passport.authenticate('jwt', { session: false }), projectController.updateProject);

router.get('/stats', passport.authenticate('jwt', { session: false }), projectController.getStats);

module.exports = router;