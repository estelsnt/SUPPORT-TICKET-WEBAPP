const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const config = require('../config.json');
const { testConnection } = require('./src/models/database');

async function startApp() {
    const isConnected = await testConnection();
    if (isConnected) {
        const port = config.EXPRESS_PORT;
        const app = express();

        // Set up CORS
        app.use(cors({
            origin: ['http://localhost:5173']
        }));

        // Parse incoming requests
        app.use(express.json({ limit: '500mb' }));
        app.use(express.urlencoded({ limit: '500mb', extended: true }));
        app.use(bodyParser.json());

        // Serve static files from the React app (IF YOU ARE HOSTING THE FRONT END ELSEWHERE COMMENT THIS PART)
        app.use(config.FRONTEND_BASE_URL, express.static(path.join(__dirname, 'public')));

        // API routes
        const userRoute = require('./src/routes/users');
        app.use('/api/users', userRoute);

        // Catch-all handler to return the React app for any request that doesn't match an API route
        app.get('*', (req, res) => {
            // Serve index.html from the public directory
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        });
    } else {
        console.log('Application cannot start. Check database connection. Run npm run seed to create the database');
        process.exit(1); // Exit with failure code
    }
}

// Start the application
startApp();
