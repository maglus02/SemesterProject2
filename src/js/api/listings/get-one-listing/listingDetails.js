import { updateListingBids } from "./getListingBids.js";
import { updateListingTimeLeft } from "./getTimeLeft.js";

export async function injectListingDetailsAndBidders(listing) {
    updateListingTitleAndImage(listing);
    updateListingTimeLeft(listing);
    updateListingBids(listing);
    updateListingDescription(listing);
    updateBidsCount(listing);
}

function updateListingTitleAndImage(listing) {
    document.querySelector('.listing-title').textContent = listing.title;
    document.querySelector('.listing-img').src = listing.media[0].url;
}

function updateListingDescription(listing) {
    const description = listing.description || "No description provided.";
    document.querySelector('.desc p').textContent = description;
}

function updateBidsCount(listing) {
    document.querySelector('.bidsNr').textContent = listing._count.bids;
}
