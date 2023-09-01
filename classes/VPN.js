// VPN
module.exports = class VPN {

    /**
     * @var {function} getDataCallback Callback to call with this.getData.
     * {@see constructor}
     * @private
     */
    #getDataCallback;

    /**
     * Sets this.#getDataCallback
     * @param {function} getDataCallback The callback to call to get data from
     * the VPN.
     */
    constructor(
        getDataCallback,
    ) {

        // If getDataCallback is a function
        if (typeof getDataCallback === "function")

            // Save it
            this.#getDataCallback = getDataCallback;

    }

    // getData
    getData() {

        // Simply call this.#getDataCallback
        this.#getDataCallback();

    }

}