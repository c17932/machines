// Machines implementation
let Machines = require("./classes/Machines"),
    machines = new Machines(
        "./Cinder_Tailscale",
        [
            {
                hostname: "Brents-iPhone",
                class: "./CinderPhone",
            },
            {
                hostname: "cinder-pi",
                class: "./CinderPi",
            },
            {
                hostname: "cinder",
                class: "./Cinder",
            },
        ]
    );