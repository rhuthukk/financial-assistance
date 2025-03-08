const express = require('express');
const Budget = require('../models/Budget');
const User = require('../models/User');

const router = express.Router();

// Create a new budget entry
router.post('/', async (req, res) => {
    try {
        const { userId, category, amount } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const budget = new Budget({ userId, category, amount });
        await budget.save();

        res.status(201).json({ message: 'Budget created', budget });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;
