# MMM-ROVA-trashcalendar
A simple module for MagicMirror² designed to show when your trash will be collected
by the ROVA trash service in the Netherlands. ROVA is a trash management company, 
they do not operate the whole of the Netherlands, so this module will only be
of use if you live in these areas: https://www.rova.nl/over-ons#gemeenten

This module uses the same layout as hdurdle/MMM-WestBerksBinDay

## Dependencies
  * A [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) installation

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository and install the dependencies:
````
git clone https://github.com/jeroenpeters1986/MMM-ROVA-trashcalendar.git
````

Add the module to the modules array in the `config/config.js` file
and insert your own postal code, housenumber and, if applicable, your 
house number addition:

```
 {
    module: 'MMM-ROVA-trashcalendar',
	position: 'middle_center',
	config: {
		zipCode: "8012AR",
		houseNr: "90",
		houseNrAddition: ""
	}
 },
```
**Note:** If you do not have an addition on your housenumber, you can omit the last line

## Sample screenshot
![MMM-ROVA-trashcalendar module for MagicMirror](https://raw.githubusercontent.com/jeroenpeters1986/MMM-ROVA-trashcalendar/master/MMM-ROVA-trashcalendar.png "MMM-ROVA-trashcalendar module for MagicMirror")


## Optional Config
| **Option** | **Description** |
| --- | --- |
| `dateFormat` | dddd D MMMM |
| `updateInterval` | Time to update the next pickup dates, in milliseconds |


## Support
If you like this module and want to thank, please buy me a coffee.

<a href="https://ko-fi.com/jeroenpeters" target="_blank"><img src="https://cdn.prod.website-files.com/5c14e387dab576fe667689cf/64f1a9ddd0246590df69ea01_kofi_long_button_blue%25402x-p-500.png" alt="Buy Me A Coffee" ></a>

### Why doesn't this module display anything?
Please ensure:
 * You are living in the ROVA service area:  https://www.rova.nl/over-ons#gemeenten
 * Check if your zipcode + housenr are accepted on https://www.rova.nl (we rely on that)

### The module return errors in the console
Are you using a MagicMirror prio to v2.16.0?
Then please use the older version from git  branch `requests-module`,
`git checkout -b henk origin/henk`


## Changelog
### Oct 21, 2024
Revamped the Module to work with MM 2.16.0+

Are you using an older version? Then please checkout the branch `requests-module`,
`git checkout -b henk origin/henk`


### Oct 13, 2024
Replaced requests module with native fetch