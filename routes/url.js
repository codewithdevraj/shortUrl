const express = require('express')
const {handleGenerateNewUrl, handelRedirectToUrl, handelDeleteShorturl, handelUpdateRedirectedUrl, handelGetAllLinks,handelAnalytics} = require('../controllers/url')
const router = express.Router();


router.route('/')
  .get(handelGetAllLinks)
  .post(handleGenerateNewUrl);


router.route('/:id')
  .get(handelRedirectToUrl)
  .delete(handelDeleteShorturl)
  .patch(handelUpdateRedirectedUrl)

router.route('/analytics/:id')
  .get(handelAnalytics)

module.exports = router;