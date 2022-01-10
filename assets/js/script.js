function changeColor() {
    let hexColor = document.getElementById("colorPicker").value;
    if(hexColor.length != 6) {
        alert("Only six-digit hex colors are allowed.");
        throw "Only six-digit hex colors are allowed."
    }

    let matcher = hexColor.match(/.{1,2}/g);
    let rgbColor = [
        parseInt(matcher[0], 16),
        parseInt(matcher[1], 16),
        parseInt(matcher[2], 16)
    ]


    document.getElementById("territory").style.color = `rgb(${rgbColor[0]},${rgbColor[1]},${rgbColor[2]})`;
    document.getElementById("territory").style.borderColor = `rgb(${rgbColor[0]},${rgbColor[1]},${rgbColor[2]})`;
    document.getElementById("territory").style.background = `rgb(${rgbColor[0]},${rgbColor[1]},${rgbColor[2]}, 0.4)`;
}
