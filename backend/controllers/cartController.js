import Users from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });

    if (userData) {
      userData.cartData[req.body.itemId] =
        (userData.cartData[req.body.itemId] || 0) + 1;

      await Users.updateOne(
        { _id: req.user.id },
        { cartData: userData.cartData }
      );

      res.json({ message: "Added to cart" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });

    if (userData) {
      if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;

        await Users.updateOne(
          { _id: req.user.id },
          { cartData: userData.cartData }
        );

        res.json({ message: "Removed from cart" });
      } else {
        res.json({ message: "Item not in cart" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });

    if (userData) {
      res.json(userData.cartData);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
