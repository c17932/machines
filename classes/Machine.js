// require Nestable
const Nestable = require("./Nestable");

// Machine
module.exports = class Machine extends Nestable {

    /**
     * @var {string} #ip The IP address of this machine.
     * @private
     */
    #ip;

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
        ip,
        hostname,
    ) {

        // super
        super(parent);

        // Save

            // ip
            this.#ip = ip;

            // name
            this.#hostname = hostname;

        // this.#isCurrentMachine

            // Express route
            this.parent.express.get(
                `/machines/${this.#hostname}`,
                (
                    req,
                    res,
                ) => {

                    // If req.headers.hostname === this.#ip
                    if (req.headers.hostname === this.#ip)

                        // Set this machine as the current, running machine
                        this.#isCurrentMachine = true;

                },
            );

            // API call
            this.parent.https.request({
                hostname: this.#ip,
                path: `/machines/${this.#hostname}`,
            });

    }

};
