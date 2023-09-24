// require Machine
const Machine = require("./Machine");

// CinderBox
module.exports = class CinderBox extends Machine {

    /**
     * @var {string} ip The ngrok ip assigned to this Machine.
     * @private
     */
    #ip;

    // @todo
    constructor(
        parent,
        hostname,
    ) {

        // super
        super(
            parent,
            hostname,
        );

        // ngrok
        require("ngrok").connect({
            addr: this.https,
            proto: "https",
        });

            // Make the https request
            
            
        // Correlate that ip to dynu

    }

};
