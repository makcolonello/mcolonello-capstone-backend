
const AllData = require('../model/AllData');


const getAllData = async (req, res) => {
    const data = await AllData.find();
    if (!data) return res.status(204).json({ 'message': 'Data not found'});
    res.json(data);   
}


const createNewData =  async (req, res) => {
    const duplicate = await AllData.findOne({ username: req.body.username }).exec()
    if (duplicate) return res.sendStatus(409); // conflict code
  
    if (!req?.body?.firstName || !req?.body?.lastName
     || !req?.body?.email || !req?.body?.username || !req?.body?.password || !req?.body?.accountId || !req?.body?.balance ) {
        return res.status(400).json({ 'message': 'Please enter the required fields to create new data' });  
     }
    
     try {
         const result = await AllData.create({
             firstName: req.body.firstName,
             lastName: req.body.lastName,
             email: req.body.email,
             username: req.body.username,
             password: req.body.password,
             accountId: req.body.accountId,
             balance: req.body.balance
         });
         res.status(201).json(result);
     } catch (err) {
         console.error(err)
     }
    

 }
 

    const updateData = async (req, res) => {
   
        if (!req?.body?.id) {
            return res.status(400).json({ 'message': 'ID parameter is required' });
        }

        const data = await AllData.findOne({ _id: req.body.id}).exec();
        if (!data) {
            return res.status(204).json({ 'message': `No data matches ID ${req.body.id}.`});
        }
        if(req.body?.firstName) data.firstName = req.body.firstName;
        if(req.body?.lastName) data.lastName = req.body.lastName;
        if(req.body?.email) data.email = req.body.email;
        if(req.body?.username) data.username = req.body.username;
        if(req.body?.password) data.password = req.body.password;
        if(req.body?.accountId) data.accountId = req.body.accountId;
        if(req.body?.balance) data.balance = req.body.balance;
        const result = await data.save();
        res.json(result);
      
    }

    const deleteData = async  (req, res) => {
        if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID required'});
        const data = await AllData.findOne({_id: req.body.id}).exec();
        if (!data) {
            return res.status(204).json({ "message": `User ID ${req.body.id} not found`});
        }
        const result = await data.deleteOne(); //{ _id: req.body.id};
        res.json(result);
    }

    const getData = async (req, res) => {
        if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required'});
        const data = await AllData.findOne({ _id: req.params.id}).exec();
        if(!data) {
            return res.status(204).json({ "message": `No data matches ID ${req.params.id}.` });
        }
        res.json(data);
    }
    module.exports = {
        getAllData,
        createNewData,
        updateData,
        deleteData,
        getData
    }