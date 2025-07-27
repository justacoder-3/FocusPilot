const app = require('./app.js');
const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);        
    });
});