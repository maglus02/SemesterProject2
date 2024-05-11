export function createFeaturedListingElement(listing) {
    const auctionLink = document.createElement('a');
    auctionLink.href = '/auctions/listing.html?id=' + listing.id;
    auctionLink.classList.add('auction-item');

    const auctionBg = document.createElement('div');
    auctionBg.classList.add('auction-bg');
    auctionBg.style.backgroundImage = `url('${listing.media[0].url}')`;

    const auctionInfo = document.createElement('div');
    auctionInfo.classList.add('auction-info');

    const auctionTitle = document.createElement('h2');
    auctionTitle.classList.add('auction-title');
    auctionTitle.textContent = listing.title;

    const featured = document.createElement('p');
    featured.classList.add('featured');
    featured.textContent = "Featured";

    const auctionPrice = document.createElement('p');
    auctionPrice.classList.add('auction-price');
    auctionPrice.textContent = `Bids: ${listing._count.bids}`;

    auctionInfo.appendChild(auctionTitle);
    auctionInfo.appendChild(featured);
    auctionInfo.appendChild(auctionPrice);
    auctionBg.appendChild(auctionInfo);
    auctionLink.appendChild(auctionBg);

    return auctionLink;
}