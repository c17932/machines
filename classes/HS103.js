// HS103
module.exports = class HS103 {

    /**
     * @var Client #Client tplink-smarthome-api Client.
     * @private
     */
    #Client;

    /**
     * @var Plug #device tplink-smarthome-api device (the smart plug).
     * @private
     */
    #device;

    /**
     * @var boolean #status Whether the plug is on or off.
     * @private
     */
    #status = false;

    /**
     * @var boolean #ready Whether the plug is ready or not.
     * @private
     */
    #ready;

    /**
     * Gets the plug ready and fires onReady when the plug is ready
     * @param {function} onReady Callback to call when plug is ready.
     */
    constructor(
        onReady,
    ) {

        // Construct #Client

            // require tplink-smarthome-api
            let {
                    Client,
                } = require(
                    "tplink-smarthome-api",
                );

        // Discover the smart-plug
        new Client().startDiscovery().on(
            "device-new",
            (
                device,
            ) => {

                // getSysInfo
                device.getSysInfo().then(
                    (
                        sysInfo,
                    ) => {
                        
                        // If mac address matches (should be: 14:EB:B6:21:C2:BF)
                        if (sysInfo.mac === "14:EB:B6:21:C2:BF") {

                            // Set up the plug

                                // Save a reference
                                this.#device = device;

                                // Update #status
                                this.#status = sysInfo.relay_state;

                                // Make the plug active
                                this.#ready = true;

                            // If onReady is a function
                            if (typeof onReady === "function")

                                // onReady()
                                onReady();

                        }
                        
                    },
                );
            
            }
        );

    }

    // Toggle the plug status
    toggle() {

        // If the device is ready
        if (this.#ready) {

            // setPowerState
            this.#device.setPowerState(!this.#status).then(() => {

                // Update status
                this.#status = !this.#status;

            });

        }

    }

}