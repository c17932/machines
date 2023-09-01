// require Machine
let Machine = require("./Machine");

// CinderPhone
module.exports = class CinderPhone extends Machine {

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
        console.log("CinderPhone :: loaded...");

    }

}