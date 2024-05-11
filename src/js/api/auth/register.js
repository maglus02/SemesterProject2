import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_AUTH, API_BASE, API_REGISTER } from "../constants.js";
import { authFetch } from "../fetch.js";

/**
 * Gets input from the register page, and uses the API to register account and returns with the API response.
 * @param {string} name 
 * @param {string} email 
 * @param {string} password 
 * @returns response in JSON.
 */
export async function register(name, email, password, avatarURL, bannerURL, bio) {
    try {
        const userData = {
            name,
            email,
            password
        };

        if (avatarURL) {
            userData.avatar = { url: avatarURL };
        }
        if (bannerURL) {
            userData.banner = { url: bannerURL };
        }
        if (bio) {
            userData.bio = bio;
        }

        const response = await authFetch(API_BASE + API_AUTH + API_REGISTER, {
            method: "POST",
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            const data = response.json();

            window.location.reload();

            return data;
        } else {
            const errorData = await response.json();
            throw new Error("Could not register the account. " + errorData.errors[0].message + ".");
        }

    } catch (error) {
        handleGlobalError(error);
    }
}