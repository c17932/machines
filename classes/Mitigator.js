// require Machine
var Machine = require("./Machine");

// Mitigator
module.exports = class Mitigator extends Machine {

    // Do it
    constructor(
        parent,
        onReady,
    ) {

        // super
        super(parent);

        // Look up other mitigators

            // this.parent.getMachines
            let machines = this.parent.getMachines();

    }

}
