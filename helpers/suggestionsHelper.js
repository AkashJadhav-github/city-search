var request = require('request');
var config = require('../config/configuration');

// calling third party API to get the list of cities which are similar to the input parametes
const getResults = async (req_data, search_param, isLatLang) => {
    return new Promise(async (resolve, reject) => {
        try {
            request({
                url: config.url,
                method: "POST",
                json: true,
                headers: {
                    "X-Algolia-Application-Id": config.appid,
                    "X-Algolia-API-Key": config.apikey,
                    "Content-Type": "application/json"
                },
                body: req_data
            }, async (error, response, body) => {
                if (error) resolve("Error - " + error)
                let suggestions_array = []
                data_array = response.body.hits;

                // looping through each city data in response to get its individual parameters
                data_array.forEach(element => {
                    let temp_obj = {};
                    let name_match = false;
                    let locale_name = element.locale_names;

                    locale_name.forEach(item => {
                        if (item.indexOf(search_param) > -1) {
                            name_match = true
                        }
                    })

                    if (name_match) {
                        if (element.administrative == undefined) {
                            temp_obj["name"] = element.locale_names + ", " + element.country_code.toUpperCase();
                        } else {
                            temp_obj["name"] = element.locale_names + ", " + element.administrative[0] + ", " + element.country_code.toUpperCase();
                        }
                        temp_obj["latitude"] = element._geoloc.lat;
                        temp_obj["longitude"] = element._geoloc.lng;
                        temp_obj["userscore"] = element._rankingInfo.userScore;
                        suggestions_array.push(temp_obj);
                    }
                });

                // sort the final array of suggestions of cities if the latitude and longitude are not given.
                if (!isLatLang) {
                    suggestions_array = await sort_suggestions(suggestions_array);
                }

                resolve(suggestions_array)
            });
        } catch (error) {
            // so the code doesn't crash and give proper response
            resolve("Error - " + error)
        }
    })

}

module.exports.getResults = getResults;


// sorting the suggestions array on basis of top score i.e. userscore
const sort_suggestions = async (suggestions_array) => {
    return new Promise(async (resolve, reject) => {
        try {
            suggestions_array
            suggestions_array.sort(function (a, b) {
                return b.userscore - a.userscore
            })
            resolve(suggestions_array)
        } catch (error) {
            reject(error)
        }
    })
}
