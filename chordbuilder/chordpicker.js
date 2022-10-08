const alphabet = ["A", "B", "C", "D", "E", "F", "G"];
const enharmonics = {"A#":"Bb", "Cb":"B", "C#":"Db", "D#":"Eb", "E#":"F", "F#":"Gb", "G#":"A"}
const keys = { "C":0, "F":1, "Bb":2, "Eb":3, "Ab":4, "Db":5, "Gb":6, "B":-5, "E":-4, "A":-3, "D":-2, "G":-1};
const chordIndices = [0, 2, 4];
const chordIndexText = ["Root (scale)", "3rd", "5th"];
var orderOfFlats = ["B", "E", "A", "D", "G", "C", "F"];

function onType(){
    var input = document.getElementById(id="keyInput").value;

    if(input in enharmonics){
        input = enharmonics[input];
    }
    if(input in keys){
        var signature = getSignature(input);
        var scale = getScale(input, signature);
        var degreeChords = getChords(scale, signature);
    }
    updateTable(degreeChords);
}

function getScale(key, signature) {
    var scale = [];
    var alphaPos = alphabet.indexOf(key[0]);
    // Gets the 7 notes of the scale in order ignoring key signature
    for (let i = 0; i < alphabet.length; i++) {
        scale.push(alphabet[alphaPos]);
        if (alphaPos == alphabet.length - 1) {
            alphaPos = 0;
        } else {
            alphaPos++;
        }
    }

    var signature = getSignature(key);

    for(let i = 0; i < scale.length; i++){
        scale[i] = getNoteInSignature(scale[i], signature);
    }
    return scale;
}
function getSignature(key) {
    var signatureNum = keys[key];
    var signature;
    if (signatureNum >= 0) {
        signature = orderOfFlats.slice(0, signatureNum);
    } else {
        signature = Array.from(orderOfFlats).reverse().slice(0, -signatureNum);
    }
    return [signatureNum < 0, signature];
}
function getChords(scale, signature){
    var chords = [];
    // Iterate through each degree of scale
    for(let degree = 0; degree < scale.length; degree++){
        degreeChord = [];
        alphaPos = alphabet.indexOf(scale[degree][0]);
        // Build a chord off that scale degree in the same key
        for (let j = 0; j < alphabet.length; j++){
            if(chordIndices.indexOf(j) != -1){
                var note = getNoteInSignature(alphabet[alphaPos], signature);
                degreeChord.push(note);
            }
            if(alphaPos == alphabet.length - 1){
                alphaPos = 0;
            } else {
                alphaPos++
            }
        }
        chords.push(degreeChord); 
    }
    return chords;
}
function getNoteInSignature(note, signature){
    if(signature[1].indexOf(note) != -1){
        if(signature[0]){
            note += "#";
        }
        else {
            note += "b";
        }
    }
    return note;
}
function updateTable(chords){
    var oldOutput = document.getElementById("output");
    var output = document.createElement('tbody');
    output.id = "output";
    for(let i = 0; i < chordIndices.length; i++){
        var row = output.insertRow();
        var rowStart = row.insertCell();
        rowStart.textContent = chordIndexText[i];
        rowStart.id = "rowStart";
        for(let j = 0; j < chords.length; j++){
            var cell = row.insertCell();
            cell.textContent = chords[j][i];
        }
    }
    console.log("done");
    oldOutput.parentNode.replaceChild(output, oldOutput);
}
