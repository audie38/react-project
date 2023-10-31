const Currencies = require("../model/Currency");
const asyncHandler = require("express-async-handler");

// @desc    Add New Currency
// @route   POST /api/v1/currency
// @access  Public
const addCurrency = asyncHandler(async (req, res) => {
  const { currencyCode, currencyRate } = req.body;
  if (!currencyCode) {
    return res.status(400).json({ message: "Currency Code Cannot be Empty" });
  }
  const existingCurrency = await Currencies.findOne({
    where: {
      currencyCode: currencyCode,
    },
  });
  if (existingCurrency) {
    return res.status(400).json({ message: "Currency already exists" });
  }
  const newCurrency = await Currencies.create({
    currencyCode: currencyCode,
    currencyRate: currencyRate,
  });
  if (newCurrency) {
    return res.status(201).json({
      success: true,
      message: "Add Currency Success",
    });
  }
  return res.status(500).json({
    success: false,
    message: "Failed to Add Currency",
  });
});

// @desc    Get Currency List
// @route   GET /api/v1/currency
// @access  Public
const getCurrencies = asyncHandler(async (req, res) => {
  const currencies = await Currencies.findAll();
  return res.status(200).json({ data: currencies });
});

// @desc    Edit Currency
// @route   PUT /api/v1/currency/:id
// @access  Public
const updateCurrency = asyncHandler(async (req, res) => {
  const currencyId = req.params.id;
  if (!currencyId) {
    return res.status(204);
  }
  const existingCurrency = await Currencies.findByPk(currencyId);
  if (!existingCurrency) {
    return res.status(404).json({ message: "Currency Not Found" });
  }

  const { currencyRate } = req.body;
  if (currencyRate && parseFloat(currencyRate) > 0) {
    existingCurrency.currencyRate = currencyRate;
  }
  const updatedCurrency = await existingCurrency.save();
  if (updatedCurrency) {
    return res.status(200).json({
      success: true,
      message: "Currency Update Success",
    });
  }
  return res.status(500).json({ mesage: "Failed to Update Currency" });
});

// @desc    Delete Currency
// @route   DELETE /api/v1/currency/:id
// @access  Public
const deleteCurrency = asyncHandler(async (req, res) => {
  const currencyId = req.params.id;
  if (!currencyId) {
    return res.status(204);
  }
  const existingCurrency = await Currencies.findByPk(currencyId);
  if (!existingCurrency) {
    return res.status(404).json({ message: "Currency Not Found" });
  }
  if (!existingCurrency) {
    return res.status(404).json({ message: "Currency Not Found" });
  }
  const deletedCurrency = await existingCurrency.destroy();
  if (deletedCurrency) {
    return res.status(200).json({
      success: true,
      message: "Delete Currency Success",
    });
  }
  return res.status(500).json({
    success: false,
    message: "Delete Currency Failed",
  });
});

module.exports = {
  addCurrency,
  getCurrencies,
  updateCurrency,
  deleteCurrency,
};
