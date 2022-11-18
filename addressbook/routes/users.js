// This file, to use with POSTMAN application.

import express from 'express';
import { v4 as uuidv4 } from 'uuid'; // import from "uuid" (random id generator)


const router = express.Router();

let users = [ //initially, existing users 
{   
    firstName: "Kelly",
    lastName:"Micheal",
    Number: 5312345678,
    id: "f8626118-1386-488a-96b8-91226404fb23"
}

];

// ROUTER FUNCTIONS
router.get('/', (req, res) => {

    res.send(users);
});

router.post('/', (req, res) => {
    const user = req.body;

    users.push({...user, id: uuidv4()});

    res.send(`User with the name ${user.firstName} added to the database!`);
});

router.get('/:id', (req,res) => {
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);
    res.send(foundUser);
});

router.delete('/:id', (req,res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id === id);
    res.send(`User with the id ${id} deleted from the database!`);
});

router.patch('/:id', (req,res) => { 
    const { id } = req.params;
    const { firstName, lastName, Number } =req.body;

    const user = users.find((user) => user.id === id);

    if(firstName) {
        user.firstName = firstName;
    }
    if(lastName) {
        user.lastName = lastName;
    }
    if(Number) {
        user.Number = Number;
    }
    res.send(`User with the id ${id} has been updated.`);
});

export default router;