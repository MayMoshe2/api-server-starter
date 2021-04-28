const fs = require('fs');
// variables
const dataPath = './data/option1.json';

// helper methods
const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                console.log(err);
            }
            if (!data) data="{}";
            callback(returnJson ? JSON.parse(data) : data);
       });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                console.log(err);
            }

            callback();
        });
    };


module.exports = {
    //READ
    getTours: function (req, res) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else
                res.send(!data? JSON.parse("{}") : JSON.parse(data));//?????????? need to do sort!
        });
    },
  
    // CREATE
   createTour: function (req, res) {

        readFile(data => {

            // add the new tour
            if (!req.body.id) return res.sendStatus(500);   
            data[req.body.id] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new tour added');
            });
        },
            true);
    },

    // UPDATE
    updateTour: function (req, res) {

        readFile(data => {

            // add the new user
            const tripId = req.params["id"];
            if (data[tripId])
                data[tripId] = req.body;
            else res.sendStatus(400);

            console.log("after if")

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`trips id:${tripId} updated`);
            });
        },
            true);
    },

    createSiteInPath: function (req, res) 
    {
        readFile(data => {

            // add the new user
            const tripId = req.params["id"];
            if (data[tripId])
                // data[tripId] = req.body;
                data[tripId].path.append(req.params["path"]); //??????????????????

                else res.sendStatus(400);

            console.log("after if")

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`sites id:${tripId} added`);
            });
        },
            true);
    },

    getTour: function (req, res)
    {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) 
            {
                console.log(err);
                res.sendStatus(500);                 
            }
            else
            {
                const tripId = req.params["id"];
                res.send(!data[tripId]? JSON.parse("{}") : JSON.parse(data[tripId]));
            }
        });
    },

    deleteSite: function (req, res)
    {
        readFile(data => {

            const tripId = req.params["id"];
            const siteName = req.params["site_name"];        
            if (data[tripId])
            {
                // data[tripId] = req.body;
                data[tripId].path.append(req.params["path"]); //??????????????????
            }
            else res.sendStatus(400);




            const tripId = req.params["id"];
            delete data[tripId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tours id:${tripId} removed`);
            });
        },
            true);
    },

    // DELETE
    deleteTour: function (req, res) {

        readFile(data => {

            // add the new user
            const tripId = req.params["id"];
            delete data[tripId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tours id:${tripId} removed`);
            });
        },
            true);
    }
};