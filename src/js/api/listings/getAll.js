import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_BASE, API_LISTINGS } from "../constants.js";
import { authFetch } from "../fetch.js";
import { createListingElement } from "./listingElement.js";
import { renderPagination } from "./pagination.js";

export async function getListings() {
    const auctionsContainer = document.querySelector(".auctionsContainer");
    const loadingSpinner = document.querySelector(".loadingSpinner");

    try {
        loadingSpinner.style.display = "block";

        const response = await authFetch(API_BASE + API_LISTINGS);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Failed to fetch posts. " + errorData.statusCode + " " + errorData.status + ".");
        }

        const { data, meta } = await response.json();

        auctionsContainer.innerHTML = "";

        for (const listing of data) {
            const listingElement = createListingElement(listing);
            auctionsContainer.appendChild(listingElement);
        }

        renderPagination(meta, false);

        loadingSpinner.style.display = "none";

    } catch (error) {
        handleGlobalError(error);
    }
}
