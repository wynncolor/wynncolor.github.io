let hexInput = document.getElementById("hex");
let existingColors;
let colorPicker;

const init = () => {
    setCopyrightYear();
    getExistingColors();

    colorPicker = new iro.ColorPicker("#picker", {
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

    applyInitialColorFromUrlOrDefault();
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

function applyInitialColorFromUrlOrDefault() {
    const initialHexFromUrl = getHexFromUrl();

    if (initialHexFromUrl) {
        colorPicker.color.set(initialHexFromUrl);
        return;
    }

    hexInput.value = colorPicker.color.hexString;
    changeColor(colorPicker.color.hexString);
}

function getHexFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const candidates = [
        params.get('hex'),
        params.get('color'),
    ];

    if (window.location.hash && window.location.hash.length > 1)
        candidates.push(window.location.hash.substring(1));

    for (const candidate of candidates) {
        const normalizedHex = normalizeHex(candidate);
        if (normalizedHex) return normalizedHex;
    }

    return null;
}

function normalizeHex(rawHex) {
    if (typeof rawHex !== 'string') return null;

    let decodedHex;
    try {
        decodedHex = decodeURIComponent(rawHex);
    } catch {
        return null;
    }

    const trimmed = decodedHex.trim();
    if (trimmed.length === 0) return null;

    const prefixed = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
    if (!/^#?[0-9a-f]{3}([0-9a-f]{3})?$/i.test(prefixed)) return null;

    return tinycolor(prefixed).toHexString();
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
    territory.style.backgroundColor = `rgba(${color.toRgb().r},${color.toRgb().g},${color.toRgb().b},0.35)`;

    // Get closest existing territory info
    const closestExistingGuild = getClosestExistingGuild(color);
    if (!closestExistingGuild) {
        document.getElementById("closestGuild").innerText = "Undetermined";
        return null;
    }

    const rawExistingGuildTag = closestExistingGuild.prefix ?? "TAG";
    const rawExistingGuildName = closestExistingGuild.id ?? closestExistingGuild._id ?? closestExistingGuild.name ?? "Unknown Guild";
    const existingColor = tinycolor(closestExistingGuild.color);

    if (!existingColor.isValid()) {
        document.getElementById("closestGuild").innerText = "Undetermined";
        return null;
    }

    const existingHex = existingColor.toHexString();
    const existingRgb = existingColor.toRgb();

    // Closest existing territory tag
    closestExistingTerritory.innerText = rawExistingGuildTag;
    closestExistingTerritory.style.color = existingHex;

    // Closest existing territory bg
    closestExistingTerritory.style.borderColor = existingHex;
    closestExistingTerritory.style.backgroundColor = `rgba(${existingRgb.r},${existingRgb.g},${existingRgb.b},0.35)`;

    // Closest existing territory guild name and hex
    document.getElementById("closestGuild").innerText = rawExistingGuildName + " (" + existingHex + ")";

    return existingColor;
}

function getExistingColors() {
    fetch("https://athena.wynntils.com/cache/get/guildListWithColors")
        .then(r => r.json())
        .then(data => {
            // data is in the form of {"0": {"id": "Kingdom Foxes", "prefix": "Fox", "color": "#ff8200"}} and so on...
            // numbers may not be consistent
            existingColors = data;

            // URL-preloaded colors can be applied before this fetch resolves.
            // Re-run the current picker color once guild data is available.
            if (colorPicker?.color?.hexString) {
                changeColor(colorPicker.color.hexString);
            }
        });
}

/**
 * @param color {tinycolor} - color to check
 * @returns object in the form of {"id": "Kingdom Foxes", "prefix": "Fox", "color": "#ff8200"}
 */
function getClosestExistingGuild(color) {
    if (!existingColors) return null;

    let closestColor = null;
    let closestDis = null;

    for (let existing in existingColors) {
        const guild = existingColors[existing];
        if (!guild || typeof guild.color !== "string") continue;

        const guildColor = tinycolor(guild.color);
        if (!guildColor.isValid()) continue;

        const distance = getDistanceBetweenColors(color, guildColor)
        if (closestDis == null || distance < closestDis) {
            closestDis = distance;
            closestColor = guild;
        }
    }

    return closestColor;
}

window.addEventListener("load", init);
