import { save } from "../../storage/save.js";
import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_AUTH, API_BASE, API_LOGIN } from "../constants.js";
import { authFetch } from "../fetch.js";

/**
 * Imports email and password inputs from the login page and uses them to login through the API. If response is good it stores the access token and profile in local storage.
 * @param {string} email Email input
 * @param {string} password Password input
 * @returns Profile
 */
export async function login(email, password) {
    try {
        const response = await authFetch(API_BASE + API_AUTH + API_LOGIN, {
            method: "POST",
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const { accessToken, ...profile } = (await response.json()).data;
            save("token", accessToken);
            save("profile", profile);

            window.location.reload();

            return profile
        } else {
            const errorData = await response.json();
            throw new Error("Could not login to the account. " + errorData.errors[0].message + ".");
        }

    } catch(error) {
        handleGlobalError(error);
    }
}