'use strict';

var express = require('express');
var controller = require('./message.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.delete('/', auth.isAuthenticated(), auth.hasRole('admin'), controller.removeAll);

module.exports = router;
