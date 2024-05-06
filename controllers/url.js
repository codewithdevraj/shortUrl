const shortid = require('shortid')
const URL = require('../models/url')

async function handelGetAllLinks(req, res) {
  const urls = await URL.find();
  return res.json(urls);
}

async function handleGenerateNewUrl(req, res) {
  const body = req.body;
  if(!body.url) return res.status(400).json({ message: 'redirectURL is required'})
  
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: []
  })
  return res.render("home", {
    id: shortID,
  });
  // return res.json({id:shortID});
}

async function handelRedirectToUrl(req, res) {
  const shortId = req.params.id;
  const url = await URL.findOne({shortId});
  if (!url) return res.status(404).json({ message: 'URL not found' })
  url.visitHistory.push({timestamp: Date.now()})
  await url.save();
  return res.redirect(url.redirectURL);
}

async function handelDeleteShorturl(req, res) {
  const shortId = req.params.id;
  const url = await URL.findOneAndDelete({shortId});
  if (!url) return res.status(404).json({ message: 'URL not found' })
  return res.json({message: 'URL deleted successfully'});
}

async function handelUpdateRedirectedUrl(req, res) {
  const shortId = req.params.id;
  const url = await URL.findOne({shortId});
  if (!url) return res.status(404).json({ message: 'URL not found' })
  url.redirectURL = req.body.url;
  await url.save();
  return res.json({message: 'URL updated successfully'});
}

async function handelAnalytics(req, res) {
  const shortId = req.params.id;
  const url = await URL.findOne({shortId});
  if (!url) return res.status(404).json({ message: 'URL not found' })
  return res.json({visitHistory: url.visitHistory.length});
}

module.exports ={
  handleGenerateNewUrl,
  handelRedirectToUrl,
  handelDeleteShorturl,
  handelUpdateRedirectedUrl,
  handelGetAllLinks,
  handelAnalytics,
}