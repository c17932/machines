// require Nestable
let Nestable = require("./Nestable");

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
     * @param {string} ip IP address of the machine.
     * @param {string} hostname Hostname of the machine.
     */
    constructor(
        ip,
        hostname,
    ) {

        // super
        super();
        
        // Save

            // ip
            this.#ip = ip;

            // name
            this.#hostname = hostname;

        // Find out whether we are on this machine or not
        var passwords = require("./passwords.js"),
            jwt = require("jsonwebtoken"),
            user = {
                id: "cinder",
                role: "super",
            },
            token = jwt.sign(
                user,
                passwords.sudo,
                {
                    expiresIn: '1h',
                }
            ),
            https = require("https"),
            data = "",
            req = https.request(
                {
                    hostname: this.#ip,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
                () => {},
            ).on(
                "error",
                (
                    error,
                ) => {

                    // console.error
                    console.error(error);

                },
            ).end();
        
    }

};