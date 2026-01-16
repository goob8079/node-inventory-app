const deleteBtn = document.querySelector("#delete-btn");

// automatically redirect the URL back to / whenever deleteError is in the URL query
document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(window.location.href);

    if (url.searchParams.has('deleteError')) {
        window.history.replaceState({}, document.title, '/');
    }
});

function openPopup() {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".popup").style.display = "block";
}

function closePopup() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".popup").style.display = "none";

    window.history.replaceState({}, document.title, '/');
}