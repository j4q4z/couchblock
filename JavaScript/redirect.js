
// generate random number for img selection
const randomNumber = Math.floor((Math.random() * 14) + 1);

// document.getElementById("image").src = `../images/${randomNumber}.jpg`;
document.getElementById("image-box").style.backgroundImage = `url("../images/${randomNumber}.jpg")`;

