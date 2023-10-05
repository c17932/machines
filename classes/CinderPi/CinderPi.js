// require Machine
const Machine = require("./Machine");

/** CinderPi */
module.exports = class CinderPi extends Machine {

    /**
     * @var {ABMT1000} #ABMT1000 ABMT1000 (UPS).
     * @private
     */
    #ABMT1000;

    /**
     * Constructs Machine and calls ABMT1000 with callback
     * @param {Machines} parent Parent Machines instance {@see Machines}.
     * @param {string} ip IP address of this machine.
     * @param {string} hostname Host name (machine name) of this machine.
     * @param {function} callback Callback to call when ABMT1000 is done loading {@see ABMT1000}.
     */
    constructor(
        parent,
        hostnames,
        callback,
    ) {

        // super
        super(
            parent,
            ip,
            hostname,
        );

        // Express route
        this.parent.https.server.express.get(
            `/machines/${this.parent.machines.find(machine => machine instanceof CinderPi).hostnames[0]}/keep-alive`,
            (
                req,
                res,
            ) => {

                // Simply end
                res.end();

            },
        );

        // #ABMT1000

            // If callback isn't a function
            if (typeof callback !== "function")

                // Make it one
                callback = () => {};

            // this.#ABMT1000
            this.#ABMT1000 = new require("./ABMT1000")(callback);
        
    }

};
