const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
     res.send("List of users");
})

router.get("/new", (req, res)=>{
    res.send("Create a new user");
})

router.post("/",(req, res)=>{
    res.send("User created");
})

router.route("/:id")
    .get((req, res) => {
        const userId = req.params.id;
        res.send(`User details for user with ID: ${userId}`);
    })
    .put((req, res) => {
        const userId = req.params.id;
        res.send(`User with ID: ${userId} updated`);
    })
    .delete((req, res) => {
        const userId = req.params.id;
        res.send(`User with ID: ${userId} deleted`);
    });


module.exports = router;