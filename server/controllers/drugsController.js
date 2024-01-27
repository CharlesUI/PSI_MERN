const { StatusCodes } = require("http-status-codes");
const Drugs = require("../models/DrugsModel");
const NotFoundError = require("../errors/ErrorClassObj");

const getDrugsList = async (req, res) => {
  console.log(req.user)
  const drugs = await Drugs.find({}).sort('NAME');
  res.status(StatusCodes.OK).json(drugs);
};
const addDrugItem = async (req, res) => {
  let updatedBody = [];
  //check if the pushed items is a bulk, if it is an array, then map through it
  console.log(Array.isArray(req.body));
  if (Array.isArray(req.body)) { 
    req.body.map((item) => {
      return typeof item.RETAIL_PRICE === "string" &&
        item.RETAIL_PRICE.includes(",")
        ? updatedBody.push({
            ...item,
            RETAIL_PRICE: item.RETAIL_PRICE.replace(/,/g, ""),
            UPDATED_BY: req.user.userId,
          })
        : updatedBody.push({ ...item, UPDATED_BY: req.user.userId });
    });
  } else {
    req.body.UPDATED_BY = req.user.userId;
  }

  //create an item in a bulk and check each retail price || if it is a single obj then pass it in one go
  const item = await Drugs.create(
    updatedBody.length !== 0 ? updatedBody : req.body
  );
  res.status(StatusCodes.OK).json(item);
};
const getSingleDrug = async (req, res) => {
  const { id: drugId } = req.params;
  const drug = await Drugs.findOne({ _id: drugId });
  if (!drug) {
    throw new NotFoundError("Drug does not exist...");
  }

  res.status(StatusCodes.OK).json({ drug });
};
const updateSingleDrug = async (req, res) => {
  const { id: drugId } = req.params;
  const { body } = req;

  const updatedDrug = await Drugs.findOneAndUpdate({ _id: drugId }, body, {
    new: true,
    runValidators: true,
  });

  if(!updatedDrug) {
    throw new NotFoundError('Drug does not exist...')
  }

  res.status(StatusCodes.OK).json({ updatedDrug })
};

const deleteSingleDrug = async (req, res) => {
    const { id: drugId } = req.params;
  
    const deletedDrug = await Drugs.findOneAndDelete({ _id: drugId });
  
    if(!deletedDrug) {
      throw new NotFoundError('Drug does not exist...')
    }
  
    res.status(StatusCodes.OK).send()
};

module.exports = {
  getDrugsList,
  addDrugItem,
  getSingleDrug,
  updateSingleDrug,
  deleteSingleDrug,
};
