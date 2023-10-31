const asyncHandler = require("express-async-handler");
const Wallets = require("../model/Wallet");
const { Op } = require("sequelize");

// @desc    Create New Wallet
// @route   POST /api/v1/wallet
// @access  Private
const createWallet = asyncHandler(async (req, res) => {
  const userId = req?.user?.userId;
  const { walletName, currencyCode } = req.body;
  if (!walletName || !currencyCode) {
    return res.status(400).json({ message: "Wallet Name/Currency Cannot be empty" });
  }
  const existingWallet = await Wallets.findOne({
    where: {
      [Op.and]: [
        {
          userId: userId,
        },
        {
          walletName: walletName,
        },
      ],
    },
  });
  if (existingWallet) {
    return res.status(400).json({ message: "Wallet already exists" });
  }
  const newWallet = await Wallets.create({
    userId: userId,
    walletName: walletName,
    balance: 0,
    currencyCode: currencyCode,
  });
  if (newWallet) {
    return res.status(201).json({
      success: true,
      message: "Success",
      data: newWallet,
    });
  }
  return res.status(500).json({
    success: false,
    message: "Failed",
  });
});

// @desc    Get List of Wallets
// @route   GET /api/v1/wallet
// @access  Private
const getWallets = asyncHandler(async (req, res) => {
  const userId = req?.user?.userId;
  const wallets = await Wallets.findAll({
    where: {
      userId: userId,
    },
  });
  return res.status(200).json({ data: wallets });
});

// @desc    Get Wallet By Id
// @route   GET /api/v1/wallet/:id
// @access  Private
const getWalletById = asyncHandler(async (req, res) => {
  const userId = req?.user?.userId;
  const wallet = await Wallets.findOne({
    where: {
      [Op.and]: [
        {
          userId: userId,
        },
        {
          walletId: req.params.id,
        },
      ],
    },
  });
  if (!wallet) {
    return res.status(404).json({ message: "Wallet Not Found" });
  }
  return res.status(200).json({ data: wallet });
});

// @desc    Edit Wallet
// @route   PUT /api/v1/wallet/:id
// @access  Private
const updateWallet = asyncHandler(async (req, res) => {
  const userId = req?.user?.userId;
  const existingWallet = await Wallets.findOne({
    where: {
      [Op.and]: [
        {
          userId: userId,
        },
        {
          walletId: req.params.id,
        },
      ],
    },
  });
  if (!existingWallet) {
    return res.status(404).json({ message: "Wallet Not Found" });
  }
  const { walletName, balance, currencyCode, currencyRate } = req.body;
  if (walletName) {
    existingWallet.walletName = walletName;
  }
  if (balance) {
    existingWallet.balance = balance;
  }
  if (currencyCode) {
    existingWallet.currencyCode = currencyCode;
  }
  if (currencyRate) {
    existingWallet.currencyRate = currencyRate;
  }
  const updatedWallet = await existingWallet.save();
  if (updatedWallet) {
    return res.status(200).json({
      success: true,
      message: "Wallet Update Success",
    });
  }
  return res.status(500).json({ message: "Failed to Update Wallet" });
});

// @desc    Delete Wallet
// @route   DELETE /api/v1/wallet/:id
// @access  Private
const deleteWallet = asyncHandler(async (req, res) => {
  const userId = req?.user?.userId;
  const existingWallet = await Wallets.findOne({
    where: {
      [Op.and]: [
        {
          userId: userId,
        },
        {
          walletId: req.params.id,
        },
      ],
    },
  });
  if (!existingWallet) {
    return res.status(404).json({ message: "Wallet Not Found" });
  }
  const deletedWallet = await existingWallet.destroy();
  if (deletedWallet) {
    return res.status(200).json({
      success: true,
      message: "Delete Wallet Success",
    });
  }
  return res.status(500).json({ message: "Failed to Delete Wallet" });
});

module.exports = {
  createWallet,
  getWallets,
  getWalletById,
  updateWallet,
  deleteWallet,
};
