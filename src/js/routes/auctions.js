import { getListings } from "../api/listings/getAll.js";
import { getFeaturedListing } from "../api/listings/getFeatured.js";

export async function getAuctions() {
    getListings();
    getFeaturedListing();
}