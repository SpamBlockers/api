const mongoose = require(`mongoose`);

const banSchema = new mongoose.Schema(
    {
        userID: {
            type: Number,
            required: true,
            unique: true,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: `User`,
            required: true,
        },
        reason: {
            type: String,
        },
    },
    { timestamps: true },
);

const Ban = mongoose.model(`Ban`, banSchema);

module.exports = Ban;
