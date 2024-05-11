import { login } from "../../api/auth/login.js";
import { register } from "../../api/auth/register.js";

export async function onAuth(event) {
    event.preventDefault()
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (event.submitter.dataset.auth === "login") {
        await login(email, password);
    } else {
        const avatarURL = event.target.avatarURL.value;
        const bannerURL = event.target.bannerURL.value;
        const bio = event.target.bio.value;
        
        await register(name, email, password, avatarURL, bannerURL, bio);
    }
}