const User = require('../model/User');



const handleBalance = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });
        if (user) {
            res.json({ balance: user.balance });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.'})
    }};

    
    

  
module.exports = { 
    
    handleBalance
 
};