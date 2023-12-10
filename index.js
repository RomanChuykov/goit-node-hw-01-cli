

import { program} from "commander"
import * as functions from "./contacts.js"

program
    .option('-a, --action <type>')
    .option('-i, --id <type>')
    .option('-n, --name <type>')
    .option('-e, --email <type>')
    .option('-p, --phone <type>')
program.parse()
const commandLine=program.opts();
console.log(commandLine);

const contactsActions=async({action, id, name,email, phone})=>{
    switch (action) {
        case "list":
            const allContacts=await functions.listContacts()
            return console.log(allContacts);
        case "id":  
            return console.log(await functions.getContactById(id));
        case "remove":
            return console.log(await functions.removeContact(id));  
        case "add":
            return console.log(await functions.addContact(name, email, phone ))
    }
}
contactsActions(commandLine)
// contactsActions({action:"list"});
// contactsActions({ action: "id", id: "C9sjBfCo4UJCWjzBnOtxl" });
// contactsActions({ action: "remove", id: "tAQPLFKSZIQR6oXjnF-DK" });
// contactsActions({ action: "add", name:"Roman", email:"qwe@qwe", phone:"123456" });
