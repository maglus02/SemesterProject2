export function handleGlobalError(error) {
    const toastContainer = document.getElementById("errorToast");
    const toast = new bootstrap.Toast(toastContainer);
    
    const toastBody = toastContainer.querySelector(".toast-body");
    toastBody.textContent = error;

    toast.show();
}