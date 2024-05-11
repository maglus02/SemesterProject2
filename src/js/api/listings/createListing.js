import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_BASE, API_LISTINGS } from "../constants.js";
import { authFetch } from "../fetch.js";

export async function createListing() {
    const createListingForm = document.querySelector('.create-listing form');

    createListingForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const deadline = document.getElementById('deadline').value;
        const mediaUrl = document.getElementById('media').value;

        const listingData = {
            title: title,
            endsAt: new Date(deadline)
        };

        if (description) {
            listingData.description = description;
        }

        if (mediaUrl) {
            listingData.media = [{
                url: mediaUrl,
                alt: "Listing Image"
            }];
        }

        try {
            const response = await authFetch(API_BASE + API_LISTINGS, {
                method: 'POST',
                body: JSON.stringify(listingData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error("Failed to create listing. " + errorData.statusCode + " " + errorData.status + ".");
            }

            const responseData = await response.json();
            const newListingId = responseData.data.id;

            window.location.href = `/auctions/listing.html?id=${newListingId}`;
        } catch (error) {
            handleGlobalError(error);
        }
    });
}
