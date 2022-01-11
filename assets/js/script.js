
let parent = document.getElementById("rgbPicker");
let picker = new Picker(parent);

let hexInput = document.getElementById("hexInput")
let territory = document.getElementById("territory");

picker.setOptions({
    editorFormat: "hex",
    alpha: false,
    color: "white",
    popup: "right",
})
picker.onChange = function (color) {
    let hslStringArr = [...color.hslString.matchAll('hsl\\(([0-9]+(?:\\.[0-9]+)?), ?([0-9]+(?:\\.[0-9]+)?)%, ?([0-9]+(?:\\.[0-9]+)?)%\\)')]
    let textBorderColor;
    if(parseFloat(hslStringArr[0][3]) == 0) {
        textBorderColor = "white";
    } else if(parseFloat(hslStringArr[0][3]) == 100) {
        textBorderColor == "black"
    } else {
        textBorderColor = color.hslString.replace(/[0-9]+(\.[0-9]+)?%\)/,'25%)');
    }
    territory.style.color = color.hex;
    territory.style.borderColor = color.hex;
    territory.style.backgroundColor = color.hex.slice(0, -2) + "66";
    territory.style.textShadow = `2px 2px 0 ${textBorderColor}, 2px -2px 0 ${textBorderColor}, -2px 2px 0 ${textBorderColor}, -2px -2px 0 ${textBorderColor}, 2px 0px 0 ${textBorderColor}, 0px 2px 0 ${textBorderColor}, -2px 0px 0 ${textBorderColor}, 0px -2px 0 ${textBorderColor}, 0px 0px 3px rgba(255,0,0,0)`
    hexInput.value = color.hex.slice(0, -2)

}
