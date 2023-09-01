// require VPN
var VPN = require("./VPN");

// Cinder_Tailscale
module.exports = class Cinder_Tailscale extends VPN {

    /**
     * updates with given callback.
     * @param {function} callback The callback to use {@see update}.
     */
    constructor(
        callback,
    ) {

        // super
        super();

        // Update
        this.update(callback);

    }

    /**
     * Updates the pool of machine ip addresses.
     * @param {function} callback Called with machines when complete.
     */
    update(callback) {

        // If callback isn't a function
        if (typeof callback !== "function")

            // Make it one
            callback = () => {};

        /**
         * tailscale api key:
         * tskey-api-kZn6Wq2CNTRL-kBGAxZWXR96CTssAkCW6A6JQbv9CY5Xh
         */

        // Initialize
        const https = require("https"),
            req = https.request(
                {
                    hostname: "api.tailscale.com",
                    path: "/api/v2/tailnet/cinder.brent@gmail.com/devices?" +
                        "fields[]=hostname",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer tskey-api-kZn6Wq2CNTRL-kBGAx" +
                            "ZWXR96CTssAkCW6A6JQbv9CY5Xh"
                    }
                },
                (res) => {

                    // Initialize
                    let data = "";

                    // res.on
                    res.on(
                        "data",
                        (chunk) => {

                            // Append to data
                            data += chunk;

                        }
                    ).on(
                        "end",
                        () => {

                            // Initialize
                            var machines = [];

                            // Save machines
                            JSON.parse(data).devices.forEach((
                                machine,
                            ) => {

                                // Save machine
                                machines.push({
                                    hostname: machine.hostname,
                                    ip: machine.addresses[0],
                                });

                            });

                            // Call callback
                            callback(machines);

                        }
                    );

                }
            ).on(
                "error",
                (err) => {

                    // Log the error
                    console.log("Cinder_Tailscale :: " + err);

                }
            ).end();

    }

}