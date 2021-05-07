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
            // console.log("im here!");
                if (err) {
                console.log(err);
                res.sendStatus(500);                 
            }
            else 
            {
                let tempData = data?  JSON.parse(data) : null;
                let dataArr = [];
                for(let i in tempData)
                {
                    dataArr.push([i, tempData[i]]);
                }
                res.send(!dataArr? "{}" : dataArr.sort()) ;
            }
        });
    },

    // CREATE
   createTour: function (req, res) {

        readFile(data => {
            const tripId = req.params["id"];
            // console.log(data);
            if(!req.body) return res.status(400).send('Body is missing!');
            if (!tripId) return res.status(400).send('Id is missing!');
            if(data[tripId]) return res.status(400).send('tour already exists!');
            data[tripId] = req.body;
            if(checkReqBody(req) === 400) return res.status(400).send('Body is invalid!');

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new tour added');
            });
        },
            true);
    },

    // UPDATE
    updateTour: function (req, res) {

        readFile(data => {

            const tripId = req.params["id"];
            if(!req.body) return res.status(400).send('Body is missing!');
            if(tripId !== req.body.id) return res.status(400).send('Id is not matching');
            if (!tripId) return res.status(400).send('Id is missing!');
            if(checkReqBody(req) === 400) return res.status(400).send('Body isnt valid!');
            if (data[tripId])
                data[tripId] = req.body;
            else res.status(400).send('Tour doesnt exists!');
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`trips id:${tripId} updated`);
            });
        },
            true);
    },

    createSiteInPath: function (req, res) 
    {
        readFile(data => {

            const tripId = req.params["id"];
            console.log("im here!");
            if(!req.body) return res.status(400).send('Body is missing!');
            if (!tripId) return res.status(400).send('Id is missing!');
            if(!req.body.name || !req.body.country) return res.status(400).send('fields are missing!');
            let message = "sites id: " + tripId + " added";
            if (data[tripId])
            {
                let dataArr = [];
                for(let i in data)
                {
                    dataArr.push([i, data[i]]);
                }
                for(let i = 0 ; i < dataArr.length ; i++)
                {
                    if(dataArr[i][0] == tripId)
                    {
                        let flag = true;
                        for(let j = 0; j < dataArr[i][1].path.length ; j++)
                        {
                            if(dataArr[i][1].path[j].name === req.body.name)
                            {
                                message = "site already exists";
                                flag = false;
                            }
                        }
                        flag ? dataArr[i][1].path.push(req.body) : null;
                    }
                }
            }

            else res.sendStatus(400);
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(message);
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
                if (!tripId) return res.status(400).send('Id is missing!');
                let tempData = JSON.parse(data);
                res.send(!tempData[tripId]? "tour doesnt exists!" :tempData[tripId]);
            }
        });
    },

    deleteSite: function (req, res)
    {
        readFile(data => {

            const tripId = req.params["id"];
            if (!tripId) return res.status(400).send('Id is missing!');            
            const siteName = req.params["site_name"];
            let message = "";        
            let dataArr = [];
            if (data[tripId])
            {
                if(siteName == null) return res.status(400).send('site name missing!');
                else if(siteName == "")
                {
                    delete data[tripId].path;
                    message = 'tours id:' + tripId + 'removed';
                }
                else
                {
                    for(let i in data)
                    {
                        dataArr.push([i, data[i]]);
                    }
                    for(let i = 0 ; i < dataArr.length ; i++)
                    {
                        if(dataArr[i][0] == tripId)
                        {
                            // let flag = true;
                            for(let j = 0; j < dataArr[i][1].path.length ; j++)
                            {
                                if(dataArr[i][1].path[j].name === siteName)
                                {
                                    dataArr[i][1].path.splice(j,1);
                                }
                            }
                            message = 'site name: ' + siteName + ' removed';
                        }
                    }
                }
            }
            else return res.status(400).send('Tour doesnt exists!');
           
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(message);
            });
        },
        true);
    },
    
    // DELETE
    deleteTour: function (req, res) {

        readFile(data => {
            const tripId = req.params["id"];
            if (!tripId) return res.status(400).send('Id is missing!');
            if(!data[tripId]) return res.status(400).send('Tour doesnt exist!');
            delete data[tripId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tours id: ${tripId} removed`);
            });
        },
            true);
    }
};

function checkReqBody(req){
    if(!req.body.id || !req.body.start_date || !req.body.duration || !req.body.price || !req.body.guide.name || !req.body.guide.email || !req.body.guide.cellular)
        return 400;
    if(!Number.isInteger(Number(req.body.duration)) || !Number.isInteger(Number(req.body.price)) || !Number.isInteger(Number(req.body.guide.cellular))) 
        return 400;
    if(req.body.duration <= 0 || req.body.price <= 0 || req.body.guide.cellular.length < 10)
        return 400;
    if(!req.body.guide.email.includes("@"))
        return 400;
}