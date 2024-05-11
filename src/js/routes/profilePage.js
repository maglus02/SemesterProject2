import { fetchUserProfile } from "../api/profile/getProfile.js";
import { getProfileListings } from "../api/profile/getProfileListing.js";
import { updateProfileAPI } from "../api/profile/updateProfile.js";
import { logout } from "../ui/listeners/logout.js";

export async function profilePage() {
    fetchUserProfile();

    getProfileListings();

    updateProfileAPI();

    logout();
}