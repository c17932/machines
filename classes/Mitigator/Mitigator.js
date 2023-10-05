// require Machine
var Machine = require("./Machine");

// Mitigator
module.exports = class Mitigator extends Machine {

    // Do it
    constructor(
        parent,
        hostnames,
    ) {

        // super
        super(
            parent,
            hostnames,
        );

        // mitigate
        this.mitigate();

    }

    // mitigate
    mitigate() {

        // Initialize
        let mitigating = false;

        // Find other mitigators
        this.parent.machines.forEach(
            machine => {

                // If Mitigator is mitigating
                if (
                    machine instanceof Mitigator &&
                    machine.isMitigating()
                )

                    // We're already mitigating
                    return true;

            },
        );

        // request
        this.#addresses.forEach(
            address => {

                // Make the https request
                this.parent.https.request(
                    {
                        hostname: address.hostname,
                        port: address.port,

            },
        );

        // Make the https request
        this.parent.https.request(
            {
                path: "/machines/CinderPi/keep-alive",

    }

};
