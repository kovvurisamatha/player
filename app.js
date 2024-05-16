const express = require('express')
const app = express()
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
let db = null
const dbPath = path.join(__dirname, 'cricketTeam.db')
const initilizeAndStartServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`db error:${e.message}`)
    process.exit(1)
  }
}
initilizeAndStartServer()

//api1
app.get('/players/', async (request, response) => {
  let playersquery = `select * from cricket_team`
  let players = await db.all(playersquery)
  response.send(players)
})
