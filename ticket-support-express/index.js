const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config.json');
const {testConnection} = require('./src/models/database');

async function startApp() {
    const isConnected = await testConnection();
    if (isConnected) {
        
        const port = config.EXPRESS_PORT;
        const app = express();
        app.use(cors({
            origin: [
                'http://localhost:5173'
            ]
        }));
      
        app.use(express.json({limit: '500mb'}));
        app.use(express.urlencoded({limit: '500mb', extended: true}));
        app.use(bodyParser.json());
      
        app.get(`/`, (req, res)=>{
            res.send('secret backend very secured');
        });
      
        // ROUTES
        const userRoute = require('./src/routes/users');
        app.use(`/users`, userRoute);
      
        app.listen(port, ()=>{
            console.log(`Server is running at port ${port}`);
        });
    } else {
      console.log('Application cannot start. Check database connection. Run npm run seed to create the database');
      process.exit(1); // Exit with failure code
    }
}
  
// Start the application
startApp();
