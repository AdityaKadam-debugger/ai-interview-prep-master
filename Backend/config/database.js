const mongoose = require("mongoose");

const ConnectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected To Database");
    } catch (err) {
        console.log("Error Connecting To DB");
        console.error(err);
    }
};

module.exports = ConnectToDB;