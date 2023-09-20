// Machines
module.exports = class Machines {

    /**
     * @var {string} configPath Path to the configuration file.
     * @private
     */
    #configPath;

        /**
         * @var {object} config Configuration.
         * @private
         */
        #config;

    /**
     * @var {https} https
     * @private
     */
    #https;

    /**
     * @var {array} machines Machines in this instance.
     * @private
     */
    #machines;

    /**
     * Requires https and splices machines
     * @param {string} configPath Path to the config file. The config file should be a
     * .json file with the following structure:
     * @todo finish
     */
    constructor(
        configPath,
    ) {

        // Initialize
        let fs = require("fs"),
            express = require("express");

        // #configPath
        this.#configPath = configPath;

            // #config
            this.#config = JSON.parse(fs.readFileSync(
                this.#configPath,
            ));

        // #https
        this.#https = require("https");

            // server
            this.#https.server = this.#https.createServer(
                {
                    key: this.#config.key,
                    cert: this.#config.cert,
                },
                express,
            ).listen(this.#config.port);

                // port
                this.#https.server.port = port;

                // express
                this.#https.server.express = express;

        // Send off splices
        this.spliceMachines(
            splices,
        );

    }

    // #https

        // get
        get https() {

            // Simply return #https
            return this.#https;

        }

    // #machines

        // get
        get machines() {

            // Simply return #machines
            return this.#machines;

        }

        /**
         * Splices machines into #machines
         * @param {array|Machine|object} splices Either a single Machine, a single splice
         * or an array of Machines and splices, where a splice is an object consisting of
         * the following properties:
         * start - Integer specifying where in the array to start splicing. If value is
         * undefined, the end of the array is used. Value is otherwise converted to
         * integer and applied.
         * deleteCount - Integer specifying how many elements to remove from #machines
         * before splicing, starting at start. Value is converted to integer and applied.
         * replacements - Array of Machines to splice in to #machines at start. Elements
         * are filtered unless they are instances of Machine.
         * @return {array|null} The machines removed when splicing, or null if no splices
         * occurred.
         */
        spliceMachines(
            splices,
        ) {

            // Initialize
            let Machine = require("./Machine"),
                wrap = (
                    machine,
                ) => {

                    // Return wrapped object
                    return {
                        replacements: [machine],
                    };

                };

            // If splices is a single machine
            if (splices instanceof Machine)

                // Wrap it
                splices = wrap(splices);

            // If splices is an array
            if (Array.isArray(splices)) {

                // Initialize
                let removedMachines = [];

                // For each splice of splices
                splices.forEach((
                    splice,
                ) => {

                    // If splice is a single Machine
                    if (splice instanceof Machine)

                        // Wrap it
                        splice = wrap(splice);

                    // Filter
                    splice.replacements = splice.replacements.filter((
                        replacement,
                    ) => {

                        // If replacement is a Machine
                        if (replacement instanceof Machine)

                            // Return true
                            return true;

                    });

                    // Make the splice
                    removedMachines.push(...this.#machines.splice(
                        typeof splice.start === "undefined" ? this.#machines.length : splice.start,
                        splice.deleteCount ?? 0,
                        ...splice.replacements ?? [],
                    ));

                });

                // Return removedMachines
                return removedMachines;

            }

        }

};
