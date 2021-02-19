function renderPlans() {
    $("#workouts").empty();
    $.ajax({
        url: "/populatedexercises",
        method: "GET",
    })
        .then(dbData => {
            dbData.forEach(plan => {
                const newDiv = $("<div>", {
                    style: "width 25%; border: 2px solid black",
                })
                const title = $("<h3>", {
                    text: plan.name
                })
                const newUl = $("<ul>", { text: "Exercises:" })
                newDiv.append(title)


                plan.exercises.forEach(exercise => {
                    console.log(exercise)
                    const newLi = $("<li>", {
                        text: `Name ${exercise.name}\nType: ${exercise.type}\nWeight: ${exercise.weight}\nSets: ${exercise.sets}\nReps: ${exercise.reps}\nDuration: ${exercise.duration}`
                    })
                    newUl.append(newLi);
                })


                const newForm = $("<form>", {
                    id: plan._id
                })
                const newBtn = $("<button>", {
                    text: "Add workout:",
                    class: "update-btn",
                    "data-id": plan._id
                })
                const nameInput = $("<input>", {
                    type: "text",
                    id: `name-${plan._id}`,
                    placeholder: "Name of Exercise:"
                })
                const typeInput = $("<input>", {
                    type: "text",
                    id: `type-${plan._id}`,
                    placeholder: "Type of Exercise:"
                })
                const weightLabel = $("<label>", {
                    for: `weight-${plan._id}`,
                    text: "Weights used:"
                })
                const weightInput = $("<input>", {
                    type: "number",
                    id: `weight-${plan._id}`
                })
                const setsLabel = $("<label>", {
                    for: `sets-${plan._id}`,
                    text: "Number of sets:"
                })
                const setsInput = $("<input>", {
                    type: "number",
                    id: `sets-${plan._id}`
                })                
                const repsLabel = $("<label>", {
                    for: `reps-${plan._id}`,
                    text: "Number of reps:"
                })
                const repsInput = $("<input>", {
                    type: "number",
                    id: `reps-${plan._id}`
                })
                const durationLabel = $("<label>", {
                    for: `duration-${plan._id}`,
                    text: "Duration of workout:"
                })
                const durationInput = $("<input>", {
                    type: "number",
                    id: `duration-${plan._id}`
                })


                newForm
                    .append(nameInput)
                    .append(typeInput)
                    .append(weightLabel)
                    .append(weightInput)
                    .append(setsLabel)
                    .append(setsInput)
                    .append(repsLabel)
                    .append(repsInput)
                    .append(durationLabel)
                    .append(durationInput)
                    .append(newBtn)
                newDiv
                    .append(newUl)
                    .append(newForm);

                $("#workouts").append(newDiv)
            })
        })
}
renderPlans();

$("#add").on("submit", (event) => {
    event.preventDefault();
    const date = $("#date").val().trim();
    // console.log(workoutDay + " working")
    $.ajax({
        url: "/api/workouts",
        method: "POST",
        data: { name: date }
    })
        .then(renderPlans())
})

$(".workouts").on("click", ".update-btn", (event) => {
    event.preventDefault();
    const workoutId = event.target.dataset.id;
    console.log(workoutId);
    const name = $(`#name-${workoutId}`).val().trim
    const type = $(`#type-${workoutId}`).val().trim
    const weight = parseInt($(`#weight-${workoutId}`).val())
    const sets = parseInt($(`#sets-${workoutId}`).val())
    const reps = parseInt($(`#reps-${workoutId}`).val())
    const duration = parseInt($(`#duration-${workoutId}`).val())

    const newObj = {
        name, type, weight, sets, reps, duration, workoutId
    }
    console.log(newObj);

    $.ajax({
        url: "/api/exercises",
        method: "POST",
        data: newObj
    })
        .then(dbExercises => {
            console.log(dbExercises)
            renderPlans();
        })
        .catch(err => {
            console.log(err)
        })
})