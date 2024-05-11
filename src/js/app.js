import { allPages } from "./routes/allPages.js";
import { getAuctions } from "./routes/auctions.js";
import { createListingPage } from "./routes/createListingPage.js";
import { getListingDetails, listingPage } from "./routes/listingPage.js";
import { profilePage } from "./routes/profilePage.js";
import { searchPage } from "./routes/searchPage.js";

function router() {
    const pathname = window.location.pathname;

    switch (pathname) {
        case "/":
        case "/index.html":
            allPages();
            getAuctions();
            break;

        case "/create-listing.html":
            allPages();
            createListingPage();
            break;

        case "/profile.html":
            allPages();
            profilePage();
            break;

        case "/search.html":
            allPages();
            searchPage();
            break;

        case "/auctions/listing.html":
            allPages();
            getListingDetails();
            listingPage();
            break;
    }
}

router();