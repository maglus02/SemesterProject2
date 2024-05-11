import { getListingDetails } from "../../routes/listingPage.js";
import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_BASE, API_LISTINGS } from "../constants.js";
import { authFetch } from "../fetch.js";

export function makeBidOnListing() {
    const makeBidForm = document.forms['makeABid'];

    makeBidForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const bidAmount = parseFloat(makeBidForm.elements['bidAmountInput'].value.trim());

        const urlParams = new URLSearchParams(window.location.search);
        const listingId = urlParams.get("id");

        try {

            const response = await authFetch(API_BASE + API_LISTINGS + `/${listingId}/bids`, {
                method: 'POST',
                body: JSON.stringify({ amount: bidAmount })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors[0].message + ".");
            }

            getListingDetails();
        } catch (error) {
            handleGlobalError(error);
        }
    });
};