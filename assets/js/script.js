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
    
    colorPicker.on("color:change", color => {
        document.getElementById("hex").innerHTML = color.hexString;
        changeTerritory(color);
        let allowedByWynntils = document.getElementById("allowed")
        isAllowedByWynntils(color.rgb) ?  allowedByWynntils.innerHTML = "Allowed" : allowedByWynntils.innerHTML = "Not allowed";
    });

}

const changeTerritory = (color) => {
    let territory = document.getElementById("territory");
    let textBorderColor;
    if(color.hsl.l <= 30) {
        textBorderColor = "white";
    } else if(color.hsl.l == 100) {
        textBorderColor = "black"
    } else {
        textBorderColor = color.hslString.replace(/[0-9]+(\.[0-9]+)?%\)/,'25%)');
    }

    // Tag
    territory.style.color = color.hexString;
    territory.style.textShadow = `2px 2px 0 ${textBorderColor}, 2px -2px 0 ${textBorderColor}, -2px 2px 0 ${textBorderColor}, -2px -2px 0 ${textBorderColor}, 2px 0px 0 ${textBorderColor}, 0px 2px 0 ${textBorderColor}, -2px 0px 0 ${textBorderColor}, 0px -2px 0 ${textBorderColor}, 0px 0px 3px rgba(255,0,0,0)`

    // Territory bg
    territory.style.borderColor = color.hexString;
    territory.style.backgroundColor = color.rgbaString.slice(0, -2) + ".40)";

}

const setCopyrightYear = () => {
    let yearEl = document.getElementById("year");
    yearEl.innerHTML = new Date().getFullYear();
}

window.addEventListener("load", init);