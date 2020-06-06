const express = require("express")
const server = express()

// config base
const db = require("./database/db")

server.use(express.static("public"))

// enable use req body
server.use(express.urlencoded({ extended: true }))

// template engine
const nunjucks = require("nunjucks")

nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// routes
server.get("/", (req, res) => res.render("index.html"))

server.post("/savepoint", (req, res) => {
    const query = `
        INSERT INTO tb_places (name, image, address, address2, city, state, items)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
        req.body.name,
        req.body.image,
        req.body.address,
        req.body.address2,
        req.body.city,
        req.body.state,
        req.body.items,
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            
            return res.render("create-point.html", { error: true })
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    const search = req.query.search

    db.all(`SELECT * FROM tb_places WHERE city like '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        return res.render("search-results.html", {places: rows, total})
    })
    
})

server.listen(3000)