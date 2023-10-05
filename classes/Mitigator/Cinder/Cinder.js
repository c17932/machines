// require Machine
let Machine = require("./Machine");

// Cinder
module.exports = class Cinder extends Machine {

    // constructor
    constructor(
        ip,
        hostname,
        parent,
    ) {

        // super
        super(
            ip,
            hostname,
        );

            // Bind parent
            this.bind(parent);

        // DEBUG
        console.log("Cinder :: loaded...");

    }

}