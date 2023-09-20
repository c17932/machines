// require Nestable
const Nestable = require("./Nestable");

// Machine
module.exports = class Machine extends Nestable {

    /**
     * @var {string} #hostname The host name of this machine.
     * @private
     */
    #hostname;

    /**
     * @var {boolean} isCurrentMachine Whether this Machine is the current running machine.
     * @private
     */
    #isCurrentMachine = false;
    
    /**
     * Saves ip and hostname
     * @param {Machines} parent The Machines object this Machine is a part of.
     * @param {string} ip IP address of the machine.
     * @param {string} hostname Hostname of the machine.
     */
    constructor(
        parent,
        hostname,
    ) {

        // super
        super(parent);

        // #hostname
        this.#hostname = hostname;

        // #isCurrentMachine

            // Express route
            this.parent.express.get(
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
            this.parent.https.request({
                hostname: this.#hostname,
                path: `/machines/${this.#hostname}`,
            });

    }

};
