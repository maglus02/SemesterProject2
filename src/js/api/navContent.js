import { API_BASE, API_PROFILES } from "./constants.js";
import { authFetch } from "./fetch.js";
import { handleGlobalError } from "../utils/errorHandler.js";

export async function replaceSignUpButtonWithUsername() {
    const userButton = document.querySelector('.userButton');
    const profileData = localStorage.getItem('profile');
    const profile = JSON.parse(profileData);

    if (profile) {
        try {
        const response = await authFetch(API_BASE + API_PROFILES + "/" + profile.name);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Failed to fetch profile. " + errorData.statusCode + " " + errorData.status + ".");
        }

        const data = await response.json();

        const userElement = document.createElement('a');
        userElement.classList.add("p-1", "nav-user-element", "d-flex");
        userElement.href = "../profile.html";

        const pfp = document.createElement('img');
        pfp.classList.add("nav-pfp", "rounded-circle");
        pfp.src = data.data.avatar.url;

        const userName = document.createElement('p');
        userName.classList.add("nav-userName");
        userName.textContent = data.data.name;

        userElement.appendChild(pfp);
        userElement.appendChild(userName);


        userButton.parentNode.replaceChild(userElement, userButton);

        /* Show available credits on listing pages */
        const credits = document.querySelector('.available-credits');
        if (credits) {
            credits.textContent = '$' + data.data.credits;
        }
    } catch (error) {
        handleGlobalError(error);
    }
    } else {
        return;
    }
}