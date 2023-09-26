// ABMT1000
module.exports = class ABMT1000 {

    /**
     * @var {string} #consoleMessagePrefix Prefix to use with console messages.
     * @private
     */
    #consoleMessagePrefix = "ABMT1000 :: ";

    // Starts UPS monitoring (5 minute intervals)
    constructor() {

        // setInterval
        setInterval(
            () => {

                // Initialize
                let self = this,
                    Nut = require("node-nut"),
                    nutInstance = new Nut(
                        3493,
                        "localhost",
                    ).on(
                        "error",
                        (err) => {

                            // Display the error message
                            self.msg(err);

                        }
                    ).on(
                        "close",
                        () => {

                            // Reconnect
                            nutInstance.start();

                        }
                    ).on(
                        "ready",
                        function() {

                            // Read power level
                            this.GetUPSVars(
                                "cinder-pi-ups",
                                (
                                    vars,
                                ) => {

                                    // If we're running off battery, below 20%
                                    if (
                                        vars["ups.status"] === "OB DISCHRG" &&
                                        vars["battery.charge"] < 20
                                    ) {

                                        // Initialize
                                        let {exec} = require("child_process"),
                                            passwords = require("../../passwords");

                                        // exec
                                        exec(
                                            "echo " + passwords.sudo + " |" +
                                                " sudo -S shutdown now",
                                            (
                                                err,
                                            ) => {

                                                // If there was an error
                                                if (err)

                                                    // Log it
                                                    console.log(err);

                                            }
                                        );

                                    }

                                }
                            );

                        }
                    ).start();

            },
            5 * 60 * 1000, // 5 minutes
        );

    }

    /**
     * Passes msg to console.log (with prefix formatting)
     * @param {string} msg The message to display on console.
     */
    msg(
        msg,
    ) {

        // Simply log the error to console
        console.log(this.#consoleMessagePrefix + msg);

    }

}
