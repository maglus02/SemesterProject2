import { getProfileData } from "../../ui/views/profileData.js";
import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_BASE, API_PROFILES } from "../constants.js";
import { authFetch } from "../fetch.js";
import { injectProfileData } from "./profileData.js";

export async function fetchUserProfile() {
    const profileContainer = document.querySelector(".card");
    const loadingSpinner = document.querySelector(".loadingSpinner");

    try {
        loadingSpinner.style.display = "block";

        const profile = await getProfileData();

        if (profile == null) {
            loadingSpinner.style.display = "none";
            throw new Error("No user signed in.");
        }
        
        const response = await authFetch(API_BASE + API_PROFILES + "/" + profile.name);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Failed to fetch profile. " + errorData.statusCode + " " + errorData.status + ".");
        }

        const data = await response.json();
        const profileData = data.data;

        profileContainer.innerHTML = "";

        const profileElement = injectProfileData(profileData);
        profileContainer.appendChild(profileElement);

        document.title = `@${profileData.name} | BidWise`;

        loadingSpinner.style.display = "none";
    } catch (error) {
        handleGlobalError(error);
    }
}