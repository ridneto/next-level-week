const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS tb_places`)

    db.run(`
        CREATE TABLE IF NOT EXISTS tb_places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)  

    const query = `
        INSERT INTO tb_places (name, image, address, address2, city, state, items)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    const values = [
        "Colectoria ",
        "https://images.unsplash.com/photo-1523461811963-7f1023caeddd?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
        "Rua Julio Cassola Filho",
        "37",
        "Sorocaba",
        "São Paulo",
        "Papeis e papelão"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        // console.log(this)
    }

    // db.run(query, values, afterInsertData)

    function getAllPlaces() {
        db.all(`SELECT * FROM tb_places`, function(err, rows){
            if(err){
                return console.log(err)
            }

            console.log("Result select")
            console.log(rows)
        })
    }

    getAllPlaces()

    function deletePlaces(id){
        db.run(`delete from tb_places where id = ?`, id, function(err){
            if(err){
                return console.log(err)
            }

            console.log("Registro deletado com sucesso")
        })
    }
})