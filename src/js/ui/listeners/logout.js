import { logoutHandler } from "../../utils/logoutHandler.js";

export async function logout() {
    const logoutButton = document.querySelector(".logoutConfirmBtn");

    if (logoutButton) {
        logoutButton.addEventListener("click", logoutHandler);
    }

};