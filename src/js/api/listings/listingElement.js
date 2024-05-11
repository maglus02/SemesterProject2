export function createListingElement(listing) {
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('col-md-3', 'col-6');

    const auctionLink = document.createElement('a');
    auctionLink.href = '/auctions/listing.html?id=' + listing.id;
    auctionLink.classList.add('auction-item');

    const auctionBg = document.createElement('div');
    auctionBg.classList.add('auction-bg');
    if (listing.media && listing.media.length > 0) {
        auctionBg.style.backgroundImage = `url('${listing.media[0].url}')`;
    } else {
        auctionBg.style.backgroundImage = `url('src/media/images/default-listing-image.jpg')`;
    }

    const auctionInfo = document.createElement('div');
    auctionInfo.classList.add('auction-info');

    const auctionPrice = document.createElement('p');
    auctionPrice.classList.add('auction-price');
    auctionPrice.textContent = `Bids: ${listing._count.bids}`;

    const auctionTitle = document.createElement('h2');
    auctionTitle.classList.add('auction-title');
    auctionTitle.textContent = listing.title;

    auctionInfo.appendChild(auctionPrice);
    auctionBg.appendChild(auctionInfo);
    auctionLink.appendChild(auctionBg);
    auctionLink.appendChild(auctionTitle);
    columnDiv.appendChild(auctionLink);

    return columnDiv;
}