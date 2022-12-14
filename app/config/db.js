require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL);

        console.log('Connected');

    } catch (err) {
        console.log(err);
        console.log('Connecting error');
    }
}

module.exports = { connect, mongoose };
