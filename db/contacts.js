const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(data);
}
async function getContactById({ id }) {
  const data = await listContacts();

  const result = data.find((contact) => contact.id === id);
  return result ? result : "Не знайдено";
}

async function addContact({ name, email, phone }) {
  const data = await listContacts();
  const newContact = { id: nanoid(5), name, email, phone };
  data.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newContact;
}
async function removeContact({ id }) {
  const data = await listContacts();
  const contactForDelete = data.find((contact) => contact.id === id);

  if (contactForDelete) {
    const result = data.filter((contact) => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));
    return { id: id };
  } else {
    return "Немає контакту для видаення";
  }
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
