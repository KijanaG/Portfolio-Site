var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nba', {useNewUrlParser: true});
var NBASchema = new mongoose.Schema({
    week: {type: Number, required: true},
    games: {type: Array, required: true}
})
mongoose.model('NBA', NBASchema);