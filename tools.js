// tools.js
// ========
module.exports = {
    postSplunkMSG: function () {
        var splunkjs = require('splunk-sdk');

        // Create a Service instance and log in
        var service = new splunkjs.Service({
            username:"admin",password:"@$$pl0sionX",scheme:"https",host:"localhost",port:"8089",version:"5.0"
        });
        service.apps().fetch(function(err, apps) {
            if (err) {
                return;
            }

            var appsList = apps.list();
            for(var i = 0; i < appsList.length; i++) {
                var app = appsList[i];
              }

        });

        // Search everything and return the first 3 results (this is just a DEMO app)
        var searchQuery = "search source=\"WinEventLog:Application\" | head 3";

        // Set the search parameters
        var searchParams = {exec_mode: "blocking", earliest_time: "2012-06-20T16:27:43.000-07:00", output_mode: "JSON"};

        console.log("Wait for the search to finish...");

        // Search the info SPLUNK gathered and put the interesting info into a file.
        // TODO: Send this info to Grafana / ngx-graph to make pretty graphs for non-IT people.
        service.oneshotSearch(
            searchQuery,
            searchParams,
            function(err, response) {
                // Display the result
                if (err) throw new Error ( err ); console.log( response.results );

                var fs = require('fs');
                fs.writeFile("C:\\NODEJS_Output\\SPLUNK_Output_" + Date.now() + ".txt",
                             JSON.stringify(response.results), 'utf8', function(err) {
                    if(err) {return console.log(err);}
                    console.log("The file was saved!");
                });
            }

        );
    }
};

var zemba = function () {
};