"use strict";

const checkLuma = ({ r, g, b }) => (0.2126 * r + 0.7152 * g + 0.0722 * b) >= 30;
const checkClosestColor = (color, closestColor) => getDistanceBetweenColors(color, closestColor) >= 15;

const setCopyrightYear = () => {
    let yearEl = document.getElementById("year");
    yearEl.innerHTML = new Date().getFullYear();
}

/**
 * @param color {tinycolor} - color to check
 * @param closestColor {tinycolor} - closest existing guild color
 */
function isAllowedByWynntils(color, closestColor) {
    let allowedByWynntils = document.getElementById("allowed")
    if (checkLuma(color.toRgb())) {
        if (checkClosestColor(color, closestColor)) {
            allowedByWynntils.innerHTML = "Allowed";
            allowedByWynntils.style.color = "#5f5";
        } else {
            allowedByWynntils.innerHTML = "Not allowed (too similar)";
            allowedByWynntils.style.color = "#f55";
        }
    } else {
        allowedByWynntils.innerHTML = "Not allowed (too dark)";
        allowedByWynntils.style.color = "#f55";
    }
}

/**
 * @param hexValue {string} - hex value to validate
 * @returns {boolean} - whether or not the hex value is valid
 */
const validateHex = hexValue => {
    let hex = document.getElementById("hex");
    if (/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(hexValue)) {
        hex.style.color = '#5f5';
        return true;
    } else {
        hex.style.color = '#f55';
        return false;
    }
}

/**
 * @param color1 {tinycolor}
 * @param color2 {tinycolor}
 * @returns {number} - distance between two colors (0-442)
 */
const getDistanceBetweenColors = (color1, color2) => {
    // this is probably good enough to determine if a color is close enough to another color
    // https://en.wikipedia.org/wiki/Color_difference#sRGB
    // it gets rather complicated to get a more accurate result

    if (color1 == null || color2 == null) {
        // max of sqrt(255^2 * 3) = 441.7 (which is max distance between two colors)
        return 442;
    }

    const rDiffSquared = Math.pow(color1.toRgb().r - color2.toRgb().r, 2);
    const gDiffSquared = Math.pow(color1.toRgb().g - color2.toRgb().g, 2);
    const bDiffSquared = Math.pow(color1.toRgb().b - color2.toRgb().b, 2);
    const result = Math.sqrt(rDiffSquared + gDiffSquared + bDiffSquared);
    return result
}
