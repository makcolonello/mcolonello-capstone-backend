const User = require('../model/User');


const handleDeposit = async (req, res) => {
      const { username, amount } = req.body;
    
      if (amount <= 0) {
        return res.status(400).json({ message: 'Deposit amount must be a positive number.' });
      }
    
      try {
        // Find the user by username
        const user = await User.findOne({ username });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        }
    
        // Increment the user's balance by the deposit amount
        user.balance += amount;
    
        // Save the updated user
        await user.save();
    
        // Respond with the updated balance
        res.json({ balance: user.balance, message: 'Deposit successful.' });
      } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'An error occurred while processing the deposit.' });
      }
    };
    
    module.exports = {
     handleDeposit
    };
    