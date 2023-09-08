// Nestable
module.exports = class Nestable {

    /**
     * @var {object} parent The parent of this Nestable.
     * @private
     */
    #parent;

        // get method for #parent
        get parent() {

            // Simply return this.#parent
            return this.#parent;

        }

        /**
         * set method for #parent
         * @param {object} parent The parent object of this object.
         */
        set parent(
            parent,
        ) {

            // If parent is an object containing this
            if (typeof parent === "object") {

                // For property in parent
                for (var property in parent) {

                    // If we find this
                    if (parent[property] === this)

                        // Save parent
                        this.#parent = parent;

                }

            }

        }

}
