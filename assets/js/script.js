
let parent = document.getElementById("rgbPicker");
let picker = new Picker(parent);

let hexInput = document.getElementById("hexInput")
let territory = document.getElementById("territory");

picker.setOptions({
    editorFormat: "hex",
    alpha: false,
    color: "white",
    popup: "bottom",
})
picker.onChange = function (color) {
    let editedHslString = color.hslString.slice(0, -6) + "25%)";
    territory.style.color = color.hex;
    territory.style.borderColor = color.hex;
    territory.style.backgroundColor = color.hex.slice(0, -2) + "66";
    console.info(editedHslString);
    territory.style.textShadow = `2px 2px 0 ${editedHslString}, 2px -2px 0 ${editedHslString}, -2px 2px 0 ${editedHslString}, -2px -2px 0 ${editedHslString}, 2px 0px 0 ${editedHslString}, 0px 2px 0 ${editedHslString}, -2px 0px 0 ${editedHslString}, 0px -2px 0 ${editedHslString}, 0px 0px 3px rgba(255,0,0,0)`
    hexInput.value = color.hex.slice(0, -2)

}
