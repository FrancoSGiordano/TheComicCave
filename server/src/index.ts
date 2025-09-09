import app from './server.js'

const port = process.env.PORT || 4001

app.listen(port, () => {
    console.log(`Escuhando en el puerto ${port}`)
})