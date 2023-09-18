// Machines
module.exports = class Machines {

    /**
     * @var {array} machines Machines in this instance.
     * @private
     */
    #machines;

    /**
     * Splices machines
     * @param {array|Machine|object} splices Splices to fulfill {@see spliceMachines}.
     */
    constructor(
        splices,
    ) {

        // Send off splices
        this.spliceMachines(
            splices,
        );

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

            // Wrap Machine in splice
            wrap(machine) {

                // Return wrapped object
                return {
                    replacements: [machine],
                };

            }

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
