const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
const router = express.Router();

app.use(cors({origin: "*"}));
app.use(bodyParser.json());
app.use('/api', router);

// require('./server/config/mongoose');
require('./server/config/routes')(app);

/** start server */
app.listen(3001, () => {
    console.log("Server started at port: 3001");
});

