import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

import { refs } from "./refs";
import { registerUserService } from "./api";

refs.signupBtn.addEventListener("click", openRegistrationModal);

const modal = basicLightbox.create(document.querySelector("#register"));

function openRegistrationModal() {
  modal.show();
  const form = document.querySelector(".register-form");
  form.addEventListener("submit", onSubmit);
}

async function onSubmit(e) {
  e.preventDefault();
  const { name, email, password } = e.currentTarget.elements;
  const user = {
    name: name.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
  };

  const data = await registerUserService(user);
  localStorage.setItem(refs.LS_KEY, data.token);
  e.target.reset();
  location.replace('/contacts.html');
}
