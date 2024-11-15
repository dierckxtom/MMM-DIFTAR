const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	socketNotificationReceived (notification, payload) {

		if(notification === "GET_TRASH_DATA") {

const rovaApiUrl = 'https://api.fostplus.be/recyclecms/public/v1/collections?zipcodeId=' + payload.zipcodeId + '&streetId=' + payload.streetId + '&houseNumber=' + payload.houseNumber + '&untilDate= + payload.untildate';
			
			const rovaApiUrl = 'https://www.rova.nl/api/waste-calendar/upcoming?postalcode=' + payload.zipCode + '&houseNumber=' + payload.houseNr + '&addition=' + payload.houseNrAddition + '&take=3';
			const errorResponse = {error: true};

			fetch(rovaApiUrl)
				.then((response) => {
					if (! response.ok) {
						throw new Error('Kon geen gegevens ophalen, werkt het internet?');
					}

					return response.json();
				})
				.then((data) => {
					this.sendSocketNotification("TRASH_DATA", data);
				})
				.catch(error => {
					//console.error("Fout bij ophalen: ", error);
					this.sendSocketNotification("TRASH_DATA", errorResponse); // Send error response
				});
		}
	},
});
