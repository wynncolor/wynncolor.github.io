let hexInput = document.getElementById("hex");
let existingColors;

const init = () => {
    setCopyrightYear();
    getExistingColors();

    let colorPicker = new iro.ColorPicker("#picker", {
        width: 200,
        display: "flex",
        layoutDirection: "horizontal",
        layout: [
            {
                component: iro.ui.Box
            },
            {
                component: iro.ui.Slider,
                options: {
                    sliderType: "hue",
                }
            }
        ]
    });
    colorPicker.on("color:change", onColorChange);
    hexInput.addEventListener('keyup', changeColorByInput);
}

const onColorChange = color => {
    hexInput.value = color.hexString;
    if (validateHex(color.hexString)) {
        changeColor(color.hexString);
    }
}

const changeColorByInput = (event) => {
    let inputVal = event.target.value;
    if (validateHex(inputVal)) {
        changeColor(inputVal);
    }
}

function changeColor(color) {
    color = tinycolor(color);
    let closestColor = changeTerritory(color);
    isAllowedByWynntils(color, closestColor);
}

/**
 * @param color {tinycolor} - new color to change to
 * @returns {tinycolor} - closest existing guild color
 */
function changeTerritory(color) {
    let territory = document.getElementById("territory");
    let closestExistingTerritory = document.getElementById("closestExistingTerritory");

    // Tag
    territory.style.color = color.toHexString();

    // Territory bg
    territory.style.borderColor = color.toHexString();
    territory.style.backgroundColor = `rgba(${color.toRgb().r},${color.toRgb().g},${color.toRgb().b},0.4)`;

    // Get closest existing territory info
    const closestExistingGuild = getClosestExistingGuild(color);
    const rawExistingGuildTag = closestExistingGuild.prefix;
    const rawExistingGuildName = closestExistingGuild._id;
    const existingColor = tinycolor(closestExistingGuild.color);

    // Closest existing territory tag
    closestExistingTerritory.innerText = rawExistingGuildTag;
    closestExistingTerritory.style.color = existingColor.toHexString();

    // Closest existing territory bg
    closestExistingTerritory.style.borderColor = existingColor.toHexString();
    closestExistingTerritory.style.backgroundColor = `rgba(${existingColor.toRgb().r},${existingColor.toRgb().g},${existingColor.toRgb().b},0.4)`;

    // Closest existing territory guild name and hex
    document.getElementById("closestGuild").innerText = rawExistingGuildName + " (" + existingColor.toHexString() + ")";

    return existingColor;
}

function getExistingColors() {
    fetch("https://athena.wynntils.com/cache/get/guildListWithColors")
        .then(r => r.json())
        .then(data => {
            // data is in the form of {"0": {"_id": "Kingdom Foxes", "prefix": "Fox", "color": "#ff8200"}} and so on...
            // numbers may not be consistent
            existingColors = data;
        });
}

/**
 * @param color {tinycolor} - color to check
 * @returns object in the form of {"_id": "Kingdom Foxes", "prefix": "Fox", "color": "#ff8200"}
 */
function getClosestExistingGuild(color) {
    let closestColor = null;
    let closestDis = null;

    for (let existing in existingColors) {
        const distance = getDistanceBetweenColors(color, tinycolor(existingColors[existing].color))
        if (closestDis == null || distance < closestDis) {
            closestDis = distance;
            closestColor = existingColors[existing];
        }
    }

    return closestColor;
}

window.addEventListener("load", init);
