// require VPN
const VPN = require("./VPN");

// Machines
module.exports = class Machines {

    /** @var {number} port The port to host the https server at. */
    port;

    /** @var {express} express Express.js */
    express;

    /** @var {https} https */
    https;

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

    /**
     * Assigns sets up https and splices machines.
     * @param {VPN} vpnInstance The VPN to use {@see VPN}.
     * @param {array} splices {@see spliceMachines}
     * @param {number} port The port to use when creating the https server.
     */
    constructor(
        vpnInstance,
        splices = [],
        port = 3000,
    ) {

        // Initialize
        const fs = require("fs");

            // port
            this.port = port;

            // express
            this.express = require("express")();

            // https
            this.https = require("https");

                // server
                this.https.server = this.https.createServer(
                    {
                        key: fs.readFileSync("server.key"),
                        cert: fs.readFileSync("server.crt"),
                    },
                    this.express,
                ).listen(this.port);

            // #VPN
            if (vpnInstance instanceof VPN)

                // Save it
                this.#VPN = vpnInstance;

        // spliceMachines
        this.spliceMachines(splices);

    }

    // #machines

        // Simply returns #machines
        get machines() {

            // Simply return #machines
            return this.#machines;

        }

        /**
         * Splices machines into #machines
         * @param {array} splices Splices to splice, either an array of splices or a single splice,
         * where a splice is an object consisting of the following properties:
         * offset: how many machines to pass before splicing,
         * length: how many machines to remove before splicing, starting at offset,
         * replacements: machines to splice into #machines.
         * @return {array} The replaced machines.
         */
        set machines(
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

                // Splice machines
                this.#machines.splice(
                    splice.offset ?? this.#machines.length,
                    splice.length ?? 0,
                    splice.replacements ?? [],
                );

            });

        }

};
