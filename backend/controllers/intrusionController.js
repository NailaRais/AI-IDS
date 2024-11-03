const Intrusion = require('../models/intrusionModel');

exports.logAlert = async (req, res) => {
    try {
        const newAlert = new Intrusion(req.body);
        await newAlert.save();
        res.status(201).json(newAlert);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Intrusion.find();
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
