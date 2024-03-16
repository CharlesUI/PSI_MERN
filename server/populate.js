const DrugModel = require("./model/Drug");
const data = require("./data.json");
const connectDB = require("./db/connect");
require('dotenv').config()

const replaceCommas = () => {
  return data.data.map(num => {
    return {
      ...num,
      RETAIL_PRICE: num.RETAIL_PRICE.replace(/,/g, '')
    }
  })
}

const dataConverted = replaceCommas()

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_LOCAL);
    await DrugModel.deleteMany();
    await DrugModel.create(dataConverted);
    process.exit(0);
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
};

populate()