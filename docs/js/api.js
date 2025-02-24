import axios from "axios";
import { refs } from "./refs";

const token = localStorage.getItem(refs.LS_KEY);
axios.defaults.baseURL = "https://connections-api.goit.global/";
axios.defaults.headers.common.Authorization = `Bearer ${token}`;

export async function registerUserService(user) {
  try {
    const { data } = await axios.post("/users/signup", user);
    return data;
  } catch(e) {
    console.log(e.message);
  }
}

export async function loginUserService(user) {
    try {
        const { data } = await axios.post("/users/login", user);
        return data;
      } catch(e) {
        console.log(e.message);
      }
}

export async function addContactService(contact) {
    try {
        const { data } = await axios.post("/contacts", contact);
        return data;
      } catch(e) {
        console.log(e.message);
      }
}

export async function getContactService() {
    try {
        const { data } = await axios("/contacts");
        return data;
      } catch(e) {
        console.log(e.message);
      }
}

export async function deleteContactService(id) {
    try {
        const { data } = await axios.delete(`/contacts/${id}`);
        return data;
      } catch(e) {
        console.log(e.message);
      }
}

export async function logoutUserService() {
    try {
        const { data } = await axios.post("/users/logout");
        return data;
      } catch(e) {
        console.log(e.message);
      }
}

export async function updateContactService(contact) {
    try {
        const { data } = await axios.patch(`/contacts/${contact.id}`, {
            name: contact.name,
            number: contact.number,
          });
        return data;
      } catch(e) {
        console.log(e.message);
      }
}