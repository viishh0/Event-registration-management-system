var express = require('express');
const Registration = require('../models/Registration');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/registration', async (req, res) => {

    let registration = new Registration({
        userName: req.body.userName,
        ticketCount: req.body.ticketCount,
        contact:req.body.contact,
        paymentStatus:req.body.paymentStatus
    });

    await registration.save();

    res.json({
        message: "registration Added Successfully thankyou"
    });

});


router.get('/registrations', async (req, res) => {

    let registration = await Registration.find();

    res.json(registration);

});


router.get('/registrations/:id', async (req, res) => {

    let registrationId = req.params.id;

    let registration = await Registration.findById(registrationId);

    res.json(registration);

});

router.put('/registrations/:id', async (req, res) => {

    let registrationId = req.params.id;

    await Registration.findByIdAndUpdate(registrationId, {
        userName: req.body.userName,
        ticketCount: req.body.ticketCount,
        contact:req.body.contact,
        paymentStatus:req.body.paymentStatus
    });

    res.json({
        message: "registration Updated Successfully thank you" 
    });

});

router.delete('/registrations/:id', async (req, res) => {

    let registrationId = req.params.id;

    await Registration.findByIdAndDelete(registrationId);

    res.json({
        message: "registration Deleted Successfully thank you"
    });

});
module.exports = router;
