export function getAuthenticatedUser() {
    const userJson = localStorage.getItem("profile");
    return userJson ? JSON.parse(userJson) : null;
}

export function checkAuthentication() {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated;
}