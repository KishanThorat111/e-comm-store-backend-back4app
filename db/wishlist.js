const mongoose = require("mongoose");
const { Schema } = mongoose;
const wishlistSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  productId: { type: Schema.Types.ObjectId, ref: "products" },
});
const Wishlist = mongoose.model("wishlists", wishlistSchema);

module.exports = Wishlist;
