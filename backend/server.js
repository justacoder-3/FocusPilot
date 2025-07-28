const app = require('./app.js');
const { isAuthenticated } = require('./middlewares/authMiddleware');
const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 3000;

app.get('/protected', isAuthenticated, (req, res) => {
    res.json({ message: "You are logged in !", user: req.user });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);        
    });
});