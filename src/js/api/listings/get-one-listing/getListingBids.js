export function updateListingBids(listing) {
    const bidsContainer = document.querySelector('.bids-container');
    if (listing.bids) {
        let highestBidAmount = 0;
        listing.bids.forEach(bid => {
            if (bid.amount > highestBidAmount) {
                highestBidAmount = bid.amount;
            }
        });
        document.querySelector('.current-bid').textContent = `$${highestBidAmount}`;

        if (listing.description) {
            document.querySelector('.desc p').textContent = listing.description;
        } else {
            document.querySelector('.desc p').textContent = "No description provided.";
        }

        const reversedBids = [...listing.bids].reverse();

        bidsContainer.innerHTML = '';
        reversedBids.forEach(bid => {
            const bidElement = document.createElement('div');
            bidElement.classList.add('bid', 'p-3');

            const content = `
        <div class="content d-flex justify-content-between">
          <div class="left">
            <img class="rounded-circle" src="${bid.bidder.avatar.url}">
            <p class="user">${bid.bidder.name}</p>
          </div>
          <div class="right">
            <p class="amount">$${bid.amount}</p>
          </div>
        </div>
      `;

            bidElement.innerHTML = content;
            bidsContainer.appendChild(bidElement);
        });
    } else {
        bidsContainer.innerHTML = `<div class="alert alert-info m-2" role="alert">
        <a href="#" data-bs-toggle="modal"
        data-bs-target="#signInModal" class="alert-link">Sign in</a> to view bids!
      </div>
      `
    }
}