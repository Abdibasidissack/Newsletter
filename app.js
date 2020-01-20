const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")
});


app.post("/", (req, res) => {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    // request parameters 
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };

    var JSONdata = JSON.stringify(data)


    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/75cada07c1",
        method: "POST",
        // basic authentication method
        headers: {
            "Authorization": "auth aa81c661c48ed99b1be7439087332483-us4"
        },
         body: JSONdata,
    };

    request(options, (error, response, body) => {
        if (error) {
            console.log(error);
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }

            else {
                res.sendFile(__dirname + "/failure.html");
                console.log(response.statusCode);
            }
        }
    });

    console.log(firstName, lastName, email);


});

app.post("/failure", (req,res)=>
{
    res.redirect("/");
});

app.listen(3000, () => console.log("We are good to start the signup form"));



// unique api key: afcda8e9086f0a706d96e3d9a233788d-us4
//  unique list ID:  7bc04a39d8