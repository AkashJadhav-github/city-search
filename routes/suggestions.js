var express = require('express');
var router = express.Router();
const suggestionService = require('../services/suggestionsService')

/* GET suggestion listing. */
router.get('/', suggestionService.search);

module.exports = router;
