const deleteBtn = document.querySelector("#delete-btn");

function passwordPopup() {
    document.querySelector(".overlay").style.display = "block";
    document.querySelector(".popup").style.display = "block";
}

function closePopup() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".popup").style.display = "none";
}