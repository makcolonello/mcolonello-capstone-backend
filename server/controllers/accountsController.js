

const User = require('../model/User');

const getAllAccounts = async (req, res) => {
    const accounts = await User.find();
    if (!accounts) return res.status(204).json({ 'message': 'No account found'});
    res.json(accounts);
}

const deleteAccount = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID required'});
    const account = await User.findOne({_id: req.body.id }).exec();
    if (!account) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found`});
    }
    const result = await account.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getAccount = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json ({ 'message': 'User ID required' });
    const account = await User.findOne({ _id: req.params.id }).exec();
    if (!account) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found`});
    }
    res.json(account);
}

module.exports = {
    getAllAccounts,
    deleteAccount,
    getAccount
}