export async function searchListener() {
    const searchInput = document.querySelector(".searchInput");

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                const url = `../search.html?query=${encodeURIComponent(query)}`;
                window.location.href = url;
            }
        }
    });
};