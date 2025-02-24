import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

import { refs } from "./refs";
import { updateContactService } from "./api";
import { reloadPage } from "./contacts";


refs.updateBtn.addEventListener("click", openUpdateModal);

const modal = basicLightbox.create(document.querySelector("#update"));

function openUpdateModal() {
  modal.show();
  const form = document.querySelector(".update-form");
  form.addEventListener("submit", onSubmitUpdate);
}

async function onSubmitUpdate(e) {
  e.preventDefault();
  const { id, name, number } = e.currentTarget.elements;
  const contact = {
    id: id.value.trim(),
    name: name.value.trim(),
    number: number.value.trim(),
  };
  const data = await updateContactService(contact);
  if (data) {
    await reloadPage();
    modal.close();
  }
  e.target.reset();
}
