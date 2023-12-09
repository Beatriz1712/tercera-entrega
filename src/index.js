import 'dotenv/config'
import app from './app.js'

const PORT = 8080
app.listen(PORT, () => console.log('Listen on porto 8080'))