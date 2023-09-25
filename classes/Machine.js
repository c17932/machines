// require Nestable
const Nestable = require("./Nestable");

// Machine
module.exports = class Machine extends Nestable {

    /**
     * @var {string} #hostnames Host names of this Machine.
     * @private
     */
    #hostnames;

    /**
     * @var {boolean} isCurrentMachine Whether this Machine is the current running machine.
     * @private
     */
    #isCurrentMachine = false;
    
    /**
     * Saves parent and hostnames
     * @param {Machines} parent The Machines object this Machine is a part of.
     * @param {string} hostnames Either a single hostname or an array of hostnames.
     */
    constructor(
        parent,
        hostnames,
    ) {

        // parent
        super(parent);

        // hostnames

            // If hostnames is a single hostname
            if (!Array.isArray(hostnames))

                // Wrap it in an array
                hostnames = [hostnames];

            // Save hostnames
            this.#hostnames = hostnames;

    }

    // Establish whether this machine is this Machine
    isCurrentMachine() {

        // Express route
        this.parent.https.express.get(
            `/machines/${this.#hostname}`,
            (
                req,
                res,
            ) => {

                // If req.headers.hostname === this.#hostname
                if (req.headers.hostname === this.#hostname)

                    // Set this machine as the current, running machine
                    this.#isCurrentMachine = true;

            },
        );

        // API call

            // For each hostname of #hostnames
            this.#hostnames.forEach(
                hostname => {

                    // Make the https request
                    this.parent.https.request({
                        hostname: hostname,
                        port: this.parent.https.server.port,
                        path: `/machines/${hostname}`,
                    });

                },
            );

    }

};
