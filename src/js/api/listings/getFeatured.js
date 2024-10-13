import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_BASE, API_LISTINGS } from "../constants.js";
import { authFetch } from "../fetch.js";
import { createFeaturedListingElement } from "./featuredListingElement.js";


export async function getFeaturedListing() {
    const listingContainer = document.querySelector(".auctionContainer");

    try {
        const response = await authFetch(API_BASE + API_LISTINGS + "/00b2ede8-057e-49ec-b399-b5e0b37a6881");

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Failed to fetch posts. " + errorData.statusCode + " " + errorData.status + ".");
        }

        const data = await response.json();
        const listing = data.data;

        listingContainer.innerHTML = "";

        const listingElement = createFeaturedListingElement(listing);
        listingContainer.appendChild(listingElement);
    } catch (error) {
        handleGlobalError(error);
    }
}
