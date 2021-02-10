const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
        name: {
            type: String,
            trim: true
        },

        type: {
            type: String
        },

        weight: {
            type: Number
        },

        sets: {
            type: Number
        },

        reps: {
            type: Number
        },

        duration: {
            type: Number
        }
    });

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;