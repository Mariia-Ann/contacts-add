import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

import { refs } from "./refs";
import { loginUserService } from "./api";

refs.loginBtn.addEventListener("click", openLoginModal);

const modal = basicLightbox.create(document.querySelector("#login"));

function openLoginModal() {
  modal.show();
  const form = document.querySelector(".login-form");
  form.addEventListener("submit", onSubmit);
}

async function onSubmit(e) {
  e.preventDefault();
  const { email, password } = e.currentTarget.elements;
  const user = {
    email: email.value.trim(),
    password: password.value.trim(),
  };

  const data = await loginUserService(user);
  localStorage.setItem(refs.LS_KEY, data.token);
  e.target.reset();
  location.replace('/contacts.html')
}
