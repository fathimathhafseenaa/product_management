    const mongoose = require("mongoose");

    // Category Schema
    const categorySchema = new mongoose.Schema(
    {
        categoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        },
    },
    {
        timestamps: true,
    }
    );

    // Export Model
    module.exports = mongoose.model("Category", categorySchema);