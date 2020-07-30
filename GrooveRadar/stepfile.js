const ARROW = 0;
const FREEZE = 1;
const MINE = 2;
const LIFT = 3;

const LEFT = 0x1000;
const DOWN = 0x0100;
const UP = 0x0010;
const RIGHT = 0x0001;
const L_LEFT = 0x10000000;
const L_DOWN = 0x01000000;
const L_UP = 0x00100000;
const L_RIGHT = 0x00010000;
const R_LEFT = 0x00001000;
const R_DOWN = 0x00001000;
const R_UP = 0x00000010;
const R_RIGHT = 0x00000001;

class Note {
    constructor(type, measure, direction, duration) {
        this.measure = measure;
        this.direction = direction;
    }
}

class NoteInfo {
    constructor() {
        this.type;
        this.measure;
        this.direction;
        this.duration;
    }
}

class Stepchart {
    constructor() {
        this.chart = {};

        this.obtainNotes(sequence);
        this.obtainFreeze(sequence);
        this.obtainPrevious(sequence);
    }
}