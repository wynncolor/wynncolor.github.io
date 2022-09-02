let hexInput = document.getElementById("hex");

const init = () => {
    setCopyrightYear();

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
    validateHex(color.hexString);
    changeTerritory(color);
    isAllowedByWynntils(color);
}

const changeColorByInput = (event) => {
    let inputVal = event.target.value;
    validateHex(inputVal);

    let color = {
        rgb: tinycolor(inputVal).toRgb(),
        hsl: tinycolor(inputVal).toHsl(),
        hslString: tinycolor(inputVal).toHslString(),
        hexString: tinycolor(inputVal).toHexString(),
    }

    changeTerritory(color);
    isAllowedByWynntils(color);

}

const changeTerritory = color => {
    let territory = document.getElementById("territory");
    let textBorderColor;
    if (color.hsl.l <= 30) {
        textBorderColor = "white";
    } else if (color.hsl.l == 100) {
        textBorderColor = "black"
    } else {
        textBorderColor = color.hslString.replace(/[0-9]+(\.[0-9]+)?%\)/, '25%)');
    }

    // Tag
    territory.style.color = color.hexString;
    territory.style.textShadow = `2px 2px 0 ${textBorderColor}, 2px -2px 0 ${textBorderColor}, -2px 2px 0 ${textBorderColor}, -2px -2px 0 ${textBorderColor}, 2px 0px 0 ${textBorderColor}, 0px 2px 0 ${textBorderColor}, -2px 0px 0 ${textBorderColor}, 0px -2px 0 ${textBorderColor}, 0px 0px 3px rgba(255,0,0,0)`

    // Territory bg
    territory.style.borderColor = color.hexString;
    territory.style.backgroundColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},0.4)`;
    console.log(color.rgbaString)

}

window.addEventListener("load", init);