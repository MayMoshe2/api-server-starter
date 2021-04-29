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
            if (!tripId) return res.sendStatus(500);   
            data[tripId] = req.body;
            // console.log(data);

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
            {
                // let dataArr = [];
                // for(let i in data)
                // {
                //     dataArr.push([i, data[i]]);
                // }
                // console.log(dataArr[0][1].path[0]);
                for(let i = 0 ; i < dataArr.length ; i++)
                {
                    if(dataArr[i][0] == tripId)
                    {
                        dataArr[i][1].path.append(req.body);
                    }
                }
                // dataArr[tripId][1].path.append(req.body); //??????????????????
            }
                // data[tripId] = req.body;

                
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
                let tempData = JSON.parse(data);
                res.send(!tempData[tripId]? "{}" :tempData[tripId]);
            }
        });
    },

    deleteSite: function (req, res)
    {
        readFile(data => {

            const tripId = req.params["id"];
            const siteName = req.params["site_name"];
            let message = "";        
            if (data[tripId])
            {
                if(siteName == null)
                {
                    res.sendStatus(400);
                    return;
                }
                else if(siteName == "")
                {
                    delete data[tripId].path;
                    message = 'tours id:' + tripId + 'removed';
                }
                else
                {
                    let index = -1;
                    for(let i = 0 ; i < data[tripId].path.length ; i++)
                    {
                        if(data[tripId].path[i].name === siteName)
                        {
                            index = i;                            
                        }
                    }
                    index != -1 ? delete data[tripId].path[index] : res.status(400).send('site name doesnt exist');
                    return;
                }
            }
            else res.sendStatus(400);

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
            console.log(data);
            delete data[tripId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`tours id:${tripId} removed`);
            });
        },
            true);
    }
};