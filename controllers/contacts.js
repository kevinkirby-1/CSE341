const { ObjectId } = require('mongodb');
const connection = require('../db/connection')

const getAll = async (req, res) => {
    db = await connection.getDb();
    data = db.db("contacts").collection("contacts").find();
    contactsArray = await data.toArray();
    res.send(contactsArray);
};

const getIndividual = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    db = await connection.getDb();
    data = db.db("contacts").collection("contacts").find({_id: contactId});
    contactsArray = await data.toArray();
    res.send(contactsArray[0]);
}

module.exports = {
    getAll,
    getIndividual
}