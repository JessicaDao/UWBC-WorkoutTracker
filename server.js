const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models");

app.use(logger("dev"));
app.use(compression());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/werkout", 
{    
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false
 });


app.get("/", (req, res) => {
    res.sendFile('./index.html');
})



app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})
app.post("/api/exercises", (req, res) => {
    console.log(req.body)

    db.Exercise.create(req.body)
        .then(dbExercise => {
            db.Workout.findOneAndUpdate({ _id: req.body.id }, { $push: { exercises: dbExercise._id } })
                .then(dbWorkout => res.send(dbWorkout))
        })
        .catch(err => res.json(err))

})
app.get('/populatedexercises', (req, res) => {
    db.Workout.find({})
        .populate('exercises')
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})

app.get('/api/workouts', (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})
app.get('/api/exercises', (req, res) => {
    db.Exercise.find({})
        .then(dbExercises => {
            res.json(dbExercises)
        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
})


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
