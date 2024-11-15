
/*
 * MagicMirror² module for displaying the dates the (and which type of) trashbin is emptied by ROVA
 * By Jeroen Peters (jeroenpeters1986) https://github.com/jeroenpeters1986/MMM-ROVA-trashcalendar
 * MIT Licensed
 */

Module.register("MMM-DIFTAR", {
    defaults: {
        zipcodeId: "2323-13014",
        streetId: "https://data.vlaanderen.be/id/straatnaam-14879",
        houseNumber: "18" ,
        fromDate: "2024-11-15",
        untilDate: "2024-11-29",
        size: "100"
    },

    requiresVersion: "2.16.0",

    // Start the module
    start() {
        this.trashDays = [];
        this.loaded = false;
        this.getTrashCollectionDays();
        this.scheduleUpdate();
    },

    // Import additional CSS Styles
    getStyles() {
        return ['MMM-ROVA-trashcalendar.css']
    },

    // Define required scripts.
    getScripts() {
        return ["moment.js"];
    },

    // Contact node_helper for the trash collection days
    getTrashCollectionDays() {
        let config = Object.assign({}, this.config);
        this.sendSocketNotification("GET_TRASH_DATA", config);
    },

    // Schedule the update interval and update
    scheduleUpdate(delay) {
        let nextLoad = this.config.updateInterval;
        if (typeof delay !== "undefined" && delay >= 0) {
            nextLoad = delay;
        }

        setInterval(function() {
            this.getTrashCollectionDays();
        }, nextLoad);
    },

    // Handle node_helper response
    socketNotificationReceived(notification, payload) {
        if (notification === "TRASH_DATA") {
            this.trashDays = payload;
            this.loaded = true;
            this.updateDom(1000);
        }
    },

    // Create icons
    getIconByTrashtype(trash_type) {

        let color = "#64656a";

        switch (trash_type) {
            case 'REST':
            case 'RESTAFVAL':
                color = "#64656a";
                break;
            case 'GFT':
            case 'GFT-EM':
                color = "#418740";
                break;
            case 'PLASTIC':
            case 'PMD':
            case 'PMDZAK':
            case 'PLASTICPLUS':
                color = "#e96c29";
                break;
            case 'PAPIER':
            case 'PAP':
                color = "#2a70b8";
                break;
            case 'DHM':
                color = "#7c6a61";
                break;
            case 'BTG':
                color = "#9a51bb";
                break;
            case 'PPBTG':
                color = "#346dc3";
                break;
            case 'GROF':
                color = "#e84c5e";
                break;
            case 'PTG':
                color = "#4f936f";
                break;
            case 'KRINGLOOP':
                color = "#7cbf6e";
                break;
            case 'KCA':
                color = "#e64e61";
                break;
            case 'GLAS':
                color = "#ffc729";
                break;
            default:
                color = "#64656a";
                break;
        }

        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttributeNS(null, "class", "binday-icon");
        svg.setAttributeNS(null, "style", "fill: " + color);

        let use = document.createElementNS('http://www.w3.org/2000/svg', "use");
        use.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.file("bin_icon.svg#bin"));
        svg.appendChild(use);

        return (svg);
    },

    capitalize (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    // Construct the DOM objects for this module
    getDom () {
        let wrapper = document.createElement("div");

        if (this.loaded === false) {
            wrapper.innerHTML = this.translate("Bezig met laden...");
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        for (let i = 0; i < this.trashDays.length; i++) {

            let trashDay = this.trashDays[i];

            let pickupContainer = document.createElement("div");
            pickupContainer.classList.add("binday-container");

            let dateContainer = document.createElement("span");
            dateContainer.classList.add("binday-date");

            moment.locale();
            let today = moment().startOf("day");
            let pickUpDate = moment(trashDay.date);
            if (today.isSame(pickUpDate)) {
                dateContainer.innerHTML = "Vandaag";
            } else if (moment(today).add(1, "days").isSame(pickUpDate)) {
                dateContainer.innerHTML = "Morgen";
            } else if (moment(today).add(7, "days").isAfter(pickUpDate)) {
                dateContainer.innerHTML = this.capitalize(pickUpDate.format("dddd"));
            } else {
                dateContainer.innerHTML = this.capitalize(pickUpDate.format(this.config.dateFormat));
            }
            dateContainer.innerHTML += ": " + trashDay.wasteType.title;

            pickupContainer.appendChild(dateContainer);

            let iconContainer = document.createElement("span");
            iconContainer.classList.add("binday-icon-container");
            iconContainer.appendChild(this.getIconByTrashtype(trashDay.wasteType.code));

            pickupContainer.appendChild(iconContainer);
            wrapper.appendChild(pickupContainer);
        }

        return wrapper;
    }
});
