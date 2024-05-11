import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_BASE, API_LISTINGS } from "../constants.js";
import { authFetch } from "../fetch.js";
import { createFeaturedListingElement } from "./featuredListingElement.js";


export async function getFeaturedListing() {
    const listingContainer = document.querySelector(".auctionContainer");

    try {
        const response = await authFetch(API_BASE + API_LISTINGS + "/d7a7ff9d-4759-4524-be26-15b32c3bf4c6");

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