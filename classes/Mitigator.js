// require Machine
var Machine = require("./Machine");

// Mitigator
module.exports = class Mitigator extends Machine {

    /** @var {number} precedence The order this mitigator should occur in (relative to other mitigators), as an integer. */
    precedence;

    // Do it
    constructor(
        parent,
        precedence,
        onReady,
    ) {

        // super
        super(parent);

        // precedence
        this.precedence = precedence;

        // Look up other mitigators

            // Initialize
            let lowest;

            // For each machine in the system
            this.parent.machines.forEach((
                machine,
            ) => {

                // If machine is a mitigator and is not this machine
                if (
                    machine !== this &&
                    machine instanceof Mitigator
                ) {

                    // If machine.precedence is lower than lowest.precedence
                    if (machine.precedence < lowest.precedence)

                        // Reset lowest
                        lowest = machine;

                }

            });

            // If lowest is this

    }

}
