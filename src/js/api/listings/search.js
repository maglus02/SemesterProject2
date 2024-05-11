import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_BASE, API_LISTINGS_SEARCH } from "../constants.js";
import { authFetch } from "../fetch.js";
import { createListingElement } from "./listingElement.js";
import { renderPagination } from "./pagination.js";

export async function searchListings() {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get('query');

    const auctionsContainer = document.querySelector('.auctionsContainer');
    const loadingSpinner = document.querySelector('.loadingSpinner');
    const footer = document.querySelector('footer');


    try {
        loadingSpinner.style.display = 'block';

        const response = await authFetch(API_BASE + API_LISTINGS_SEARCH + `?q=${query}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to search listings. ${errorData.statusCode} ${errorData.status}.`);
        }

        const { data, meta } = await response.json();

        auctionsContainer.innerHTML = "";

        if (data.length === 0) {
            const noResultsElement = document.createElement('div');
            noResultsElement.textContent = 'No results found.';
            auctionsContainer.appendChild(noResultsElement);

            footer.style.position = 'absolute';
            footer.style.bottom = 0;
            footer.style.left = 0;
            footer.style.right = 0;
        } else {
            for (const listing of data) {
                const listingElement = createListingElement(listing);
                auctionsContainer.appendChild(listingElement);
            }

            renderPagination(meta, true);
        }

        const searchQueryHTML = document.querySelector('.searchQuery');
        searchQueryHTML.textContent = '"' + query + '"';

        document.title = `Search: ${query} | BidWise`;

        loadingSpinner.style.display = 'none';

    } catch (error) {
        handleGlobalError(error);
    }
}