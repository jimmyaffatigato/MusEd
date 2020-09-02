/// <reference lib="dom" />

import Vex from "vexflow";

const pitchOf = (note: number): number => {
    return note % 12;
};

const pitchToLetter = (pitch: number, key: number): string => {
    let letter = "";
    switch (pitch) {
        case 0:
            letter = "c";
        case 1:
            key >= 0 ? (letter = "c#") : {};
            key < 0 ? (letter = "db") : {};
        case 2:
        case 3:
            return "d";
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
    }
};

const octaveOf = (note: number): number => {
    return Math.floor(note / 12);
};

const abc = document.createElement("div");
abc.id = "abc";
document.body.appendChild(abc);

const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "vf".
const div = document.getElementById("abc");
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(500, 500);
const context = renderer.getContext();
context.setFont("Arial", 10).setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
const stave = new VF.Stave(10, 40, 400);

// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

const noteNums = [60, 62, 64, 65];

const notes = noteNums.map((num) => {
    const pitch = pitchOf(num);
    const octave = octaveOf(num);
    return new VF.StaveNote({ clef: "treble", keys: [`${pitch}/${octave}`], duration: "q" });
});

// Create a voice in 4/4 and add the notes from above
const voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
voice.addTickables(notes);

// Format and justify the notes to 400 pixels.
const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

// Render voice
voice.draw(context, stave);
