import { refs } from "./refs";
import { markupContact } from "./markup";
import { addContactService, deleteContactService, getContactService, logoutUserService } from "./api";

refs.contactsForm.addEventListener("submit", onSubmit);

async function onSubmit(e) {
  e.preventDefault();
  const { name, number } = e.currentTarget.elements;
  const contact = {
    name: name.value.trim(),
    number: number.value.trim(),
  };
  const data = await addContactService(contact);
  const markup = markupContact(data);
  refs.contactsList.insertAdjacentHTML("beforeend", markup);
  e.target.reset();
}

async function reloadPage() {
    const data = await getContactService();
    const markup = data.map(markupContact).join("");
    refs.contactsList.innerHTML = markup
}

const token = localStorage.getItem(refs.LS_KEY);
if (!token) {
    location.replace('/')
} else {
    reloadPage();
}

refs.contactsList.addEventListener("click", deleteContact);

async function deleteContact(e) {
    if(e.target.nodeName !== "BUTTON") {
        return;
    }
    await deleteContactService(e.target.parentNode.id);
    e.target.parentNode.remove();
}

refs.logoutBtn.addEventListener("click", logout);

async function logout() {
    await logoutUserService();
    localStorage.removeItem(refs.LS_KEY);
    location.replace('/');
}