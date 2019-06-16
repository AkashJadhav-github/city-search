var http = require('http');
const helperService = require("../helpers/suggestionsHelper")

// function to search the given input parameter
const search = async (req, res) => {
    try {
        let search_param = req.query.q;
        let lat = req.query.latitude;
        let lng = req.query.longitude;
        let latlng = "" + lat + "," + lng + "";
        let isLatLng = false;
        let resp = {};
        let req_data = {
            "query": search_param,
            "type": "city",
            "language": "default",
            "hitsPerPage": 30,
            "getRankingInfo": true
        }

        if (lat != null && lng != null) {
            req_data["aroundLatLng"] = latlng;
            isLatLng = true;
        }

        // calling helper class method so to get the cities lists
        let result = await helperService.getResults(req_data, search_param, isLatLng);

        // send response as success(if we get array) or fail(if we get msg) depending on the result
        if (typeof(result) == "object") {
            resp = {
                code: 200,
                suggestions: result
            }
        } else {
            resp = {
                code: 400,
                msg: result
            }
        } console.log(resp)
        res.send(resp)

    } catch (error) {
        resp = {
            code: 400,
            msg: error
        }
        res.send(resp)
    }

}

module.exports.search = search;