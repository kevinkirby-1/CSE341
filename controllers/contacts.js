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

const createContact = async (req, res) => {
    const data = req.body;
    const contact = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        favoriteColor: data.favoriteColor,
        birthday: data.birthday
    };

    db = await connection.getDb();
    try {
        result = await db.db('contacts').collection('contacts').insertOne(contact);
        console.log("contact with id: " + result.insertedId + " created")
        res.status(201).json(result)
    }catch (e) {
        res.status(500).send(e.message)
    }
}

const updateContact = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const data = req.body;
    const contact = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        favoriteColor: data.favoriteColor,
        birthday: data.birthday
    };

    db = await connection.getDb();
    try {
        result = await db.db('contacts').collection('contacts').replaceOne({_id: id}, contact);
        console.log(result.modifiedCount + " document[s] updated.");
        res.status(204).send()
    } catch(e) {
        res.status(500).send(e.message)
    }

}

const deleteContact = async  (req, res) => {
    const id = new ObjectId(req.params.id);

    db = await connection.getDb();
    try {
        result = await db.db('contacts').collection('contacts').deleteOne({_id: id})
        console.log(result.deletedCount + " document[s] deleted")
        res.status(200).send()
    } catch(e) {
        res.status(500).send(e.message)
    }
}

module.exports = {
    getAll,
    getIndividual,
    createContact,
    updateContact,
    deleteContact
}