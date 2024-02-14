const { ObjectId, ExplainVerbosity } = require('mongodb');
const connection = require('../db/connection')

// GET ALL CONTACTS
const getAll = async (req, res) => {
    db = await connection.getDb();
    try {
        data = db.db("contacts").collection("contacts").find();
        contactsArray = await data.toArray();
        res.status(200).send(contactsArray);
    } catch (e) {
        res.status(500).send(e.message)
    }

};

// GET SINGLE CONTACT
const getIndividual = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Contact id is not valid.")
    }
    const contactId = new ObjectId(req.params.id);
    db = await connection.getDb();
    try {
        data = db.db("contacts").collection("contacts").find({_id: contactId});
        contactsArray = await data.toArray();
        res.status(200).send(contactsArray[0]);
    } catch (e) {
        res.status(500).send(e.message)
    }

}

// CREATE SINGLE CONTACT
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

// UPDATE SINGLE CONTACT
const updateContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Contact id is not valid.");
        return
    }
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

// DELETE SINGLE CONTACT
const deleteContact = async  (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(500).json("Contact id is not valid.")
        return
    }
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