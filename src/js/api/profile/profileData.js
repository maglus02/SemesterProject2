export function injectProfileData(profileData) {
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const bannerImg = document.createElement('img');
    bannerImg.classList.add('banner');
    bannerImg.src = profileData.banner.url;
    bannerImg.alt = "User Banner";
    const bannerDiv = document.createElement('div');
    bannerDiv.classList.add('text-center');
    bannerDiv.appendChild(bannerImg);
    cardBody.appendChild(bannerDiv);

    const avatarImg = document.createElement('img');
    avatarImg.classList.add('rounded-circle', 'pfp');
    avatarImg.src = profileData.avatar.url;
    avatarImg.alt = profileData.name;
    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('text-center', 'mb-4');
    avatarDiv.appendChild(avatarImg);
    cardBody.appendChild(avatarDiv);

    const profileNameAndEdit = document.createElement('div');
    profileNameAndEdit.classList.add('d-flex', 'align-content-center', 'justify-content-between', 'flex-lg-row', 'flex-sm-column', 'flex-column');
    const editAndLogOut = document.createElement('div');
    editAndLogOut.classList.add('d-flex', 'align-content-center', 'justify-content-between', 'flex-lg-row', 'flex-sm-column', 'flex-column');
    const profileName = document.createElement('h2');
    profileName.classList.add('profile-name');
    profileName.textContent = profileData.name;
    const editProfile = document.createElement('button');
    editProfile.textContent = 'Edit Profile';
    editProfile.classList.add('btn', 'btn-primary', 'p-2');
    editProfile.setAttribute('data-bs-toggle', 'modal');
    editProfile.setAttribute('data-bs-target', '#updateProfile');
    const logOut = document.createElement('button');
    logOut.textContent = 'Sign Out';
    logOut.classList.add('btn', 'btn-danger', 'p-2', 'logOutBtn');
    logOut.setAttribute('data-bs-toggle', 'modal');
    logOut.setAttribute('data-bs-target', '#signOut');
    cardBody.appendChild(profileNameAndEdit);
    profileNameAndEdit.appendChild(profileName);
    profileNameAndEdit.appendChild(editAndLogOut);
    editAndLogOut.appendChild(editProfile);
    editAndLogOut.appendChild(logOut);

    const line = document.createElement('hr');
    cardBody.appendChild(line);

    const creditsHeading = document.createElement('h5');
    creditsHeading.textContent = 'Credits:';
    const creditsText = document.createElement('p');
    creditsText.classList.add('credits');
    creditsText.textContent = '$' + profileData.credits;
    const creditsDiv = document.createElement('div');
    creditsDiv.classList.add('mt-4');
    creditsDiv.appendChild(creditsHeading);
    creditsDiv.appendChild(creditsText);
    cardBody.appendChild(creditsDiv);

    const bioHeading = document.createElement('h5');
    bioHeading.textContent = 'Bio:';
    const bioText = document.createElement('p');
    bioText.classList.add('bio');
    if (profileData.bio == null || profileData.bio == "") {
        bioText.textContent = "No bio provided.";
    } else {
        bioText.textContent = profileData.bio;
    }
    const bioDiv = document.createElement('div');
    bioDiv.classList.add('mt-4');
    bioDiv.appendChild(bioHeading);
    bioDiv.appendChild(bioText);
    cardBody.appendChild(bioDiv);

    return cardBody;
}