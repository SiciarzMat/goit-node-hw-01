import { readFile, writeFile } from 'node:fs/promises';
import { join } from "path";
import { nanoid } from "nanoid";
import colors from "colors";

const directoryName = "db"
const fileName = "contacts.json"
const contactsPath = join(directoryName, fileName);


export const listContacts = async () => {
    try {
        const contacts = await readFile(contactsPath, { encoding: "utf-8" });
        return JSON.parse(contacts)
    } catch (error) {
        console.log(error);
    }
}

export const getContactById = async (contactId) => {
    try {
        const parsedContacts = await listContacts();
        const searchedContact = parsedContacts.find(contact => contact.id === contactId)
        if (searchedContact) {

            return console.log(colors.cyan("This is a contact, you were looking for: "), searchedContact)
        } else {
            return console.log(colors.red("There is no contact with this id"))
        }

    } catch (error) {
        console.log(error)
    }
}

export const removeContact = async (contactId) => {
    try {

        const parsedContacts = await listContacts();
        const contactIndex = parsedContacts.findIndex(contact => contact.id === contactId)

        if (contactIndex === -1) {
            return console.log(colors.red("There is no contact with this id"))
        } else {
            const newContactsList = parsedContacts.filter(contact => contact.id !== contactId)
            await writeFile(contactsPath, JSON.stringify(newContactsList, null, 2))
            return console.log(colors.cyan(`You have removeded contact with id ${contactId}!`))
        }

    } catch (error) {
        console.log(error)
    }
}


export const addContact = async (name, email, phone) => {
    const newContact = {
        id: nanoid(),
        name: name,
        email: email,
        phone: phone,
    }

    const parsedContacts = await listContacts();
    const newContactsArray = [...parsedContacts, newContact]
    writeFile(contactsPath, JSON.stringify(newContactsArray, null, 2))
    return console.log(colors.cyan(`You have added a new contact: ${name}!`))
}