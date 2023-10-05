// require Nestable
const Nestable = require("./Nestable");

// Machine
module.exports = class Machine extends Nestable {

    /**
     * @var {array} hostnames Hostnames of this machine (tried in the order given).
     * @private
     */
    #hostnames = [];

    /**
     * @var {boolean} isCurrentMachine Whether this Machine is the current running machine.
     * @private
     */
    #isCurrentMachine = false;
    
    /**
     * @todo Write the documentation for this AFTER you're done coding it!!
     * @param {Machines} parent The Machines object this Machine is a part of.
     * @param {array|object} addresses Either a single address or an array of addresses, where
     * an address is an object consisting of the following properties:
     * - hostnames: hostnames of the address (either a single hostname or an array of
     * hostnames. Note that the order that hostnames are given in is reflected in the
     * inner-processes of Machines: the order you give them in is the order they are
     * attempted in - if you wanted to, for instance, use your VPN as a fallback to a
     * public address, you would just make sure the public hostname is given before
     * something like the VPN IP address of the same machine. Voila!). At least one hostname is required.
     */
    constructor(
        parent,
        hostnames = [],
    ) {

        // parent
        super(parent);

        // hostnames
        this.spliceHostnames(
            hostnames,
        );

    }

    // spliceMachines
    spliceMachines(
        splices,
    ) {

        // Initialize
        function validateHostname(
            hostname,
        ) {

            // If hostname is legit
            if (
                typeof hostname === "string" &&
                !this.#hostnames.indexOf(hostname)
            )

                // Return true
                return true;

            // Otherwise
            else

                // Return false
                return false;

        }

        // If hostnames is a single hostname
        if (validateHostname(hostnames))

            // Wrap it
            hostnames = [{
                replacements: [hostnames],
            },];

        // If hostnames is an array
        if (Array.isArray(
            hostnames,
        )) {

            // For each hostname of hostnames
            hostnames.forEach(
                hostname,
            ) => {

                // If hostname is a hostname
                if (validateHostname(hostname))

                    // Push hostname onto #hostnames
                    this.#hostnames.push(
                        hostname,
                    );

                // If hostname is an object
                if (typeof hostname === "object")

                    // Make the splice
                    this.#hostnames.splice(
                        typeof hostname.start === "number" ?
                            hostname.start :
                            this.#hostnames.length,
                        typeof hostname.deleteCount === "number" ?
                            hostname.deleteCount :
                            0,
                        hostname.replacements ?? [],
                    );
      
            }

        }

    }

    // Establish whether this machine is this Machine
    isCurrentMachine() {

        // For each address of #addresses
        this.#addresses.forEach(
            address => {

                // Set up an express route
                this.parent.https.server.express.get(
                    `/machines/${address.hostname}:${address.port}`,
                    (
                        req,
                        res,
                    ) => {

                        // For each address of #addresses
                        this.#addresses.forEach(
                            address => {

                                // If hostnames match
                                if (req.headers.hostname === address.hostname)

                                    // Set #isCurrentMachine to true
                                    this.#isCurrentMachine = true;

                            },
                        );

                    },
                );

                // Make the https request
                this.parent.https.request(
                    {
                        hostname: address.hostname,
                        port: address.port,
                        path: `/machines/${address.hostname}:${address.port}`,
                    }
                );

            },
        );

    }

};
