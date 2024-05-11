import { profilePage } from "../../routes/profilePage.js";
import { getProfileData } from "../../ui/views/profileData.js";
import { handleGlobalError } from "../../utils/errorHandler.js";
import { API_BASE, API_PROFILES } from "../constants.js";
import { authFetch } from "../fetch.js";

export async function updateProfileAPI() {
    const updateProfileForm = document.forms['updateProfile'];

    updateProfileForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const avatarURL = updateProfileForm.elements['avatarInput'].value;
        const bannerURL = updateProfileForm.elements['bannerInput'].value;
        const bio = updateProfileForm.elements['bioInput'].value;

        const requestData = {};

        if (avatarURL) {
            requestData.avatar = {
                url: avatarURL
            };
        }

        if (bannerURL) {
            requestData.banner = {
                url: bannerURL
            };
        }

        if (bio) {
            requestData.bio = bio;
        }

        if (Object.keys(requestData).length === 0) {
            return;
        }


        try {
            const profile = await getProfileData();

            if (profile == null) {
                throw new Error("No user signed in.");
            }

            const response = await authFetch(API_BASE + API_PROFILES + "/" + profile.name, {
                method: 'PUT',
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors[0].message + ".");
            }

            profilePage();
        } catch (error) {
            handleGlobalError(error);
        }
    });
};