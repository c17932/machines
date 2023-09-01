// Nestable implementation
let Nestable = require("./classes/Nestable"),
    parent = {};

// nestable
parent.nestable = new Nestable(
    parent,
);

// parent.nestable.bind
parent.nestable.bind(parent);

// DEBUG
console.log(parent);