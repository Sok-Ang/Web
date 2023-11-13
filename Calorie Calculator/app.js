document.addEventListener("DOMContentLoaded", function () {
    var calcForm = document.getElementById("calc-form");
    var resultsDiv = document.getElementById("results");

    calcForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get user input values
        var age = parseInt(document.getElementById("age").value);
        var gender = document.querySelector("select[name='gender']").value;
        var heightFt = parseInt(document.getElementById("height-ft").value);
        var heightIn = parseInt(document.getElementById("height-in").value);
        var heightCm = parseInt(document.getElementById("height-cm").value);
        var weight = parseInt(document.getElementById("weight").value);
        var weightUnit = document.querySelector("select[name='weight_unit']").value;

        // Perform the calorie calculation
        var calculatedCalories = calculateCalories(age, gender, heightFt, heightIn, heightCm, weight, weightUnit);

        // Display the results
        displayResults(calculatedCalories);
    });

    function calculateCalories(age, gender, heightFt, heightIn, heightCm, weight, weightUnit) {
        // Replace this with your actual calorie calculation logic based on the provided input
        // Example: calculate calories using a simplified formula
        var baseCalories = 0;
        if (heightCm) {
            baseCalories = 10 * weight + 6.25 * heightCm - 5 * age;
        } else {
            var totalHeightInCm = heightFt * 30.48 + heightIn * 2.54;
            baseCalories = 10 * weight + 6.25 * totalHeightInCm - 5 * age;
        }

        // Adjust BMR based on gender
        if (gender === "Female") {
            baseCalories -= 161;
        } else if (gender === "Male") {
            baseCalories += 5;
        }

        // Adjust BMR based on weight unit
        if (weightUnit === "lb") {
            baseCalories /= 2.20462; // Convert weight to kg
        }

        // Simplified calculation (adjust as needed)
        var calculatedCalories = baseCalories * 1.2;

        return calculatedCalories;
    }

    function displayResults(calories) {
        resultsDiv.style.display = "block";
        resultsDiv.innerHTML = "Calories per day: " + calories.toFixed(2);
    }
});
