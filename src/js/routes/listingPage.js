import { makeBidOnListing } from "../api/listings/bidOnListing.js";
import { fetchListingAndBidders} from "../api/listings/get-one-listing/fetchListing.js";
import { injectListingDetailsAndBidders } from "../api/listings/get-one-listing/listingDetails.js";

export async function getListingDetails() {
  fetchListingAndBidders()
    .then(data => {
      // Call the injectListingDetailsAndBidders function with the fetched data
      injectListingDetailsAndBidders(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

export async function listingPage() {
  makeBidOnListing();
}
