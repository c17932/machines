// require VPN
const VPN = require("./VPN");

// Machines
module.exports = class Machines {

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

                                // Save the machine
                                machines.push({
                                    hostname: vpnMachine.hostname,
                                    ip: vpnMachine.ip,
                                    class: splice.hostname,
                                });

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
