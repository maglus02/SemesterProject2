export async function getProfileData() {
    const profileData = localStorage.getItem("profile");
    const profile = JSON.parse(profileData);

    return profile;
}