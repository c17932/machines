// Machine
module.exports = class Machine {

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
     * @param {string} ip IP address of the machine.
     * @param {string} hostname Hostname of the machine.
     */
    constructor(
        ip,
        hostname,
    ) {

        // Save

            // ip
            this.#ip = ip;

            // name
            this.#hostname = hostname;

    }

};
