// require VPN
const VPN = require("./VPN");

// Machines
module.exports = class Machines {

    /** @var {number} port The port to listen to. */
    port;

    /** @var {https} https */
    https;

    /** @var {express} express Express.js */
    express;

    /**
     * @var {array} machines Machines in the system {@see spliceMachines}.
     * @private
     */
    #machines = [];

    /**
     * @var {VPN} VPN The VPN to use.
     * @private
     */
    #VPN;

    // constructor
    constructor(
        vpnInstance,
        splices = [],
        port = 3000,
    ) {

        // Initialize
        const fs = require("fs");

            // Express
            this.express = require("express")();

            // https
            this.https = require("https");

                // this.port
                this.port = port;

                // server
                this.https.server = this.https.createServer(
                    {
                        key: fs.readFileSync("server.key"),
                        cert: fs.readFileSync("server.crt"),
                    },
                    this.express,
                ).listen(this.port);

        // If vpnInstance is a VPN
        if (vpnInstance instanceof VPN)

            // Save it
            this.#VPN = vpnInstance;

        // spliceMachines
        this.spliceMachines(splices);

    }

    // this.#machines

        // getMachines
        getMachines() {

            // Simply return this.#machines
            return this.#machines;

        }

        // spliceMachines
        spliceMachines(
            splices,
        ) {

            // If splices is a single machine definition
            if (
                splices.hostname &&
                splices.class
            )

                // Wrap it in an array
                splices = [splices];

            // Otherwise, if splices is an array
            if (Array.isArray(splices)) {

                // Initialize
                let machines = [],
                    vpnMachines = this.#VPN.getMachines();

                // For each splice of splices
                splices.forEach((
                    splice,
                ) => {

                    // If splice is a machine definition
                    if (
                        splice.hostname &&
                        splice.class
                    ) {

                        // For each machine in vpnMachines
                        vpnMachines.forEach((
                            vpnMachine,
                        ) => {

                            // If splice is vpnMachine
                            if (splice.hostname === vpnMachine.hostname)

                                // machines
                                machines.push(new require(splice.class)(
                                    this,
                                    vpnMachine.ip,
                                    vpnMachine.hostname,
                                ));

                        });

                    }

                });

                // Save machines
                splices = [{
                    replacements: machines,
                }];

            }

            // For each splice of splices
            splices.forEach((
                splice,
            ) => {

                // Initialize
                let returnedMachines = [];

                // Defaults

                    // offset
                    splice.offset = splice.offset ?? 0;

                    // length
                    splice.length = splice.length ?? 0;

                    // replacements
                    splice.replacements = splice.replacements ?? [];

                // Splice
                returnedMachines.push(
                    this.#machines.splice(
                        splice.offset,
                        splice.length,
                        splice.replacements,
                    ),
                );

                // Return returnedMachines
                return returnedMachines;

            });

        }

};
