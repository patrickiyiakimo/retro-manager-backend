const express = require("express")

app.get('/authenticate',(req, res) => {
    res.send("<a href='/auth/google'>Authenticate with Google</a>")
});

app.get('/protected', (req, res) => {
    res.send("Hello")
})
