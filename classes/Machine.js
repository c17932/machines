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

    }

};
