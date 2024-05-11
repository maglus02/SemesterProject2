import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_BASE, API_LISTINGS, API_LISTINGS_SEARCH } from "../constants.js";
import { authFetch } from "../fetch.js";
import { createListingElement } from "./listingElement.js";

export function renderPagination(meta, search = false) {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = "";

    const { currentPage, pageCount } = meta;

    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(startPage + 2, pageCount);

    if (endPage - startPage < 2) {
        startPage = Math.max(endPage - 2, 1);
    }

    if (currentPage > 1) {
        const prevLi = document.createElement("li");
        prevLi.classList.add("page-item");
        const prevA = document.createElement("a");
        prevA.classList.add("page-link");
        prevA.innerHTML = `<i class="fa-solid fa-chevron-left"></i>`;
        prevA.href = "#";
        prevA.addEventListener("click", () => goToPage(currentPage - 1, search));
        prevLi.appendChild(prevA);
        paginationContainer.appendChild(prevLi);
    }

    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement("li");
        li.classList.add("page-item");
        if (i === currentPage) {
            li.classList.add("active");
        }
        const a = document.createElement("a");
        a.classList.add("page-link");
        a.textContent = i;
        a.href = "#";
        a.addEventListener("click", () => goToPage(i, search));
        li.appendChild(a);
        paginationContainer.appendChild(li);
    }

    if (currentPage < pageCount) {
        const nextLi = document.createElement("li");
        nextLi.classList.add("page-item");
        const nextA = document.createElement("a");
        nextA.classList.add("page-link");
        nextA.innerHTML = `<i class="fa-solid fa-chevron-right"></i>`;
        nextA.href = "#";
        nextA.addEventListener("click", () => goToPage(currentPage + 1, search));
        nextLi.appendChild(nextA);
        paginationContainer.appendChild(nextLi);
    }
}

async function goToPage(pageNumber, search) {
    try {
        let query = "";

        if (search == true) {
            const queryParams = new URLSearchParams(window.location.search);
            query = queryParams.get('query');
        }
        
        let url = search ? API_BASE + API_LISTINGS_SEARCH + `?q=${query}&page=${pageNumber}` : API_BASE + API_LISTINGS + `?page=${pageNumber}`;

        const response = await authFetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error("Failed to fetch listings. " + errorData.statusCode + " " + errorData.status + ".");
        }

        const { data, meta } = await response.json();

        const auctionsContainer = document.querySelector(".auctionsContainer");
        auctionsContainer.innerHTML = "";

        for (const listing of data) {
            const listingElement = createListingElement(listing);
            auctionsContainer.appendChild(listingElement);
        }

        renderPagination(meta, search);
    } catch (error) {
        handleGlobalError(error);
    }
}
