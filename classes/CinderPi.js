/** CinderPi */
module.exports = class CinderPi {

    /**
     * @var {ABMT1000} #ABMT1000 ABMT1000 (UPS).
     * @private
     */
    #ABMT1000;

    /** constructor */
    constructor(
        callback,
    ) {

        // If callback isn't a function
        if (typeof callback !== "function")

            // Make it one
            callback = () => {};

        // Initialize
        let ABMT1000 = require("./ABMT1000");

        // Feed ABMT1000 a callback
        this.#ABMT1000 = new ABMT1000(callback);
        
    }

}