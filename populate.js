const Drugs = require("./models/DrugsModel");
const data = require("./data.json");
const connectDB = require("./db/connect");
require('dotenv').config()

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Drugs.deleteMany();
    await Drugs.create(data);
    process.exit(0);
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
};

populate()