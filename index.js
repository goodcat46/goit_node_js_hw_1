const contacts = require("./db/contacts");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      return allContacts;
    case "get":
      const contact = await contacts.getContactById({ id });
      console.log(contact);
      return contact;
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;
    case "remove":
      const deletedContact = await contacts.removeContact({ id });
      console.log(deletedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "5" });
// invokeAction({ action: "remove", id: "5f65P" });
// invokeAction({
//   action: "add",
//   name: "Cyrus Jackson",
//   email: "nibh@semsempererat.com",
//   phone: "(501) 472-5218",
// });
