"use strict";

const checkLuma = ({r,g,b}) => (0.2126 * r + 0.7152 * g + 0.0722 * b) >= 30;

const setCopyrightYear = () => {
    let yearEl = document.getElementById("year");
    yearEl.innerHTML = new Date().getFullYear();
}

const isAllowedByWynntils = color => {
    let allowedByWynntils = document.getElementById("allowed")
    if(checkLuma(color.rgb)) {
        allowedByWynntils.innerHTML = "Allowed";
        allowedByWynntils.style.color = "#5f5";
    } else {
        allowedByWynntils.innerHTML = "Not allowed";
        allowedByWynntils.style.color = "#f55";
    }
}

const validateHex = hexValue => {
    let hex = document.getElementById("hex");
    if (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(hexValue)) {
        hex.style.color = '#5f5';
    } else {
        hex.style.color = '#f55';
    }
}