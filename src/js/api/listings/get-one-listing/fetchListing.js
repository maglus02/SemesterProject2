import { isLoggedIn } from "../../../ui/views/loggedIn.js";
import { handleGlobalError } from "../../../utils/errorHandler.js";
import { API_BASE, API_LISTINGS } from "../../constants.js";
import { authFetch } from "../../fetch.js";

export async function fetchListingAndBidders() {
    const listingId = getListingIdFromURL();
    const loggedIn = await isLoggedIn();

    try {
        const response = await fetchListingData(listingId, loggedIn);
        const listing = await handleResponse(response);

        document.title = `${listing.title} | BidWise`;

        return listing;
    } catch (error) {
        handleGlobalError(error);
    }
}

function getListingIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

async function fetchListingData(listingId, loggedIn) {
    let response;
    if (loggedIn) {
        response = await authFetch(API_BASE + API_LISTINGS + "/" + listingId + "?_bids=true");
    } else {
        response = await authFetch(API_BASE + API_LISTINGS + "/" + listingId);
    }
    if (!listingId) {
        throw new Error("Listing ID not found in the URL.");
    }
    return response;
}

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Failed to fetch posts. " + errorData.statusCode + " " + errorData.status + ".");
    }
    const data = await response.json();
    return data.data;
}