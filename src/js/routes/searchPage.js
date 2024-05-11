import { searchListings } from "../api/listings/search.js";

export async function searchPage() {
    searchListings();
}