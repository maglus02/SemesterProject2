import { isLoggedIn } from "../../../ui/views/loggedIn.js";

export async function updateListingTimeLeft(listing) {
    const timeLeftText = await getTimeLeftText(listing);
    document.querySelector('.time-left').textContent = timeLeftText;
}

async function getTimeLeftText(listing) {
    const endsAt = new Date(listing.endsAt).getTime();
    const currentTime = new Date().getTime();
    const timeLeftInMillis = endsAt - currentTime;
    let timeLeftText;

    if (timeLeftInMillis <= 0) {
        timeLeftText = "Auction ended";
        document.querySelector('.cBid').textContent = "Winning Bid";
        document.querySelector('.bid-button').style.display = 'none';
    } else {
        const daysLeft = Math.floor(timeLeftInMillis / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeLeftInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeLeftInMillis % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeLeftInMillis % (1000 * 60)) / 1000);

        if (daysLeft > 0) {
            timeLeftText = `${daysLeft} day${daysLeft > 1 ? 's' : ''}, ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`;
        } else if (hoursLeft > 0) {
            timeLeftText = `${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}, ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}`;
        } else if (minutesLeft > 0) {
            timeLeftText = `${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}, ${secondsLeft} second${secondsLeft > 1 ? 's' : ''}`;
        } else {
            timeLeftText = `${secondsLeft} second${secondsLeft > 1 ? 's' : ''}`;
        }

        const loggedIn = await isLoggedIn();
        if (loggedIn) {
            document.querySelector('.bid-button').style.display = 'block';
        }
    }

    return timeLeftText;
}