const mongoose = require("mongoose");

const db_url = "mongodb://127.0.0.1:27017/xa1901";

mongoose.connect(db_url);

module.exports = {
    mongoose
}