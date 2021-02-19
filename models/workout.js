const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String
  },
    exercise: [{
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ],
  date: {
    type: Date,
    default: Date.now,
    required: true
}
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
