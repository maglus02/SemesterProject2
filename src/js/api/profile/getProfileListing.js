import { getProfileData } from "../../ui/views/profileData.js";
import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_BASE, API_PROFILES } from "../constants.js";
import { authFetch } from "../fetch.js";
import { createListingElement } from "../listings/listingElement.js";

export async function getProfileListings() {

    const listingsContainer = document.querySelector(".listingsContainer");

    try {
        const profile = await getProfileData();

        if (profile == null) {
            throw new Error("No user signed in.");
        }

        const response = await authFetch(API_BASE + API_PROFILES + "/" + profile.name + "/listings");

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Failed to fetch posts. " + errorData.statusCode + " " + errorData.status + ".");
        }

        const data = await response.json();

        listingsContainer.innerHTML = "";

        if (data.data.length > 0) {
            for (const listing of data.data) {
                const listingElemet = createListingElement(listing);
                listingsContainer.appendChild(listingElemet);
            }
        } else {
            listingsContainer.innerHTML = "<p class='no-listings'>No listings posted.</p>"
        }

    } catch (error) {
        handleGlobalError(error);
    }
}
