import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";


const contactsPath=path.resolve("db","contacts.json");
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('error', error);
    throw error; // Если вы хотите обработать ошибку вне этой функции, выбросьте ее дальше
  }
}
  
  async function  getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const allContacts= await listContacts();
    const result= allContacts.find(item=>item.id===contactId);
    return result ||null;
   
  }
   async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    const allContacts= await listContacts();
    const index=allContacts.findIndex(item=>item.id===contactId)
    if (index===-1) {
      return null;
    }
    const result=allContacts.splice(index,1);
    await updateContacts(allContacts);
    return result[0];
  }
  
  async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту. 
    const allContacts= await listContacts();
    const newContact={
      id:nanoid(),
      name:name,
      email:email,
      phone:phone
    };
    allContacts.push(newContact);
    await updateContacts(allContacts);    
    return newContact

  }
  /*module.exports = {
    listContacts: listContacts
  };*/
  export { listContacts, getContactById, addContact, removeContact };