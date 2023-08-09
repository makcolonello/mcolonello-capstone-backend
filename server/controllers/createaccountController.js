const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    if (!firstName || !lastName || !email || !username || !password )
    return res.status(400).json({'message': 'Please enter the required fields to create an account!'})
    
    // check for duplicate usernames in the database
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); // conflict code

    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create and store the new user
        const result = await User.create({ 
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "username": username,
            "password": hashedPassword,
          
        });

     
        console.log(result);
        
       res.status(201).json({ 'success': `New user ${username} created!`})
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    } 
}

module.exports ={ handleNewUser };