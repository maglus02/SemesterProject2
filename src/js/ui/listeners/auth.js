import { onAuth } from "../events/onAuth.js";

export function setAuthListener() {
    document.forms.signIn.addEventListener("submit", onAuth);
    document.forms.signUp.addEventListener("submit", onAuth);
}