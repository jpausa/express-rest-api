const express = require("express")

const app = express()
app.disable("x-powered-by")

const PORT = process.env.PORT || 1234

app.get("/", (req, res) => {
  res.send("Hello World!!")
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
