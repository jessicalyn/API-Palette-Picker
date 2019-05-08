const app = require('./app')

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => console.log(`Palette Picker listening on port ${app.get('port')}!`))