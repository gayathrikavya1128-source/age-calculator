
let todayToggle = false;

function toggleToday(){
    todayToggle = !todayToggle;

    let btn = document.getElementById("todayBtn");
    btn.innerText = todayToggle ? "Today On" : "Use Today";
    btn.classList.toggle("off", !todayToggle);
    
    let prevDateInput = document.getElementById("prevYear");

    if (todayToggle) {
        let today = new Date().toISOString().split("T")[0];
        prevDateInput.value = today;
        prevDateInput.disabled = true;
    } else {
        prevDateInput.value = "";
        prevDateInput.disabled = false;
    }
}

function calculateAge() {
    let dob = document.getElementById("dob").value;
    let prevYear = document.getElementById("prevYear").value;

    if (!dob) {
        alert("Please select date of birth");
        return;
    }

    if (prevYear && new Date(prevYear) > new Date()) {
        alert("Future date is not allowed");
        return;
    }

    let dobDate = new Date(dob);
    let currentDate = todayToggle
        ? new Date()
        : (prevYear ? new Date(prevYear) : new Date());

    let years = currentDate.getFullYear() - dobDate.getFullYear();
    let months = currentDate.getMonth() - dobDate.getMonth();
    let days = currentDate.getDate() - dobDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }
    years = years + 1;

    if (years < 0) years = 0;
    if (months < 0) months = 0;
    if (days < 0) days = 0;

    document.getElementById("ageResult").innerText =
        `${years} Years ${months} Months ${days} Days`;
}


function clearAge(){
    document.getElementById("dob").value = "";
    document.getElementById("prevYear").value = "";
    document.getElementById("ageResult").innerText = "";
    document.getElementById("todayBtn").innerText = "Use Today";
    todayToggle = false;
    
    document.getElementById("prevYear").disabled = false;
}


// TEMPERATURE CONVERTER
function convertTemp(){
    let value = parseFloat(document.getElementById("tempValue").value);
    let from = document.getElementById("fromScale").value;
    let to = document.getElementById("toScale").value;

    if (isNaN(value)){
        alert("Enter a temperature value");
        return;
    }

    if (from === to){
        document.getElementById("tempResult").innerText =
        `${value}°${from} = ${value}°${to}`;
        return;
    }

    let C;

    if (from === "C") C = value;
    if (from === "F") C = (value - 32) * 5/9;
    if (from === "K") C = value - 273.15;

    let result;

    if (to === "C") result = C;
    if (to === "F") result = (C * 9/5) + 32;
    if (to === "K") result = C + 273.15;

    document.getElementById("tempResult").innerText =
        `${value}°${from} = ${result.toFixed(2)}°${to}`;
}

function clearTemp(){
    document.getElementById("tempValue").value = "";
    document.getElementById("tempResult").innerText = "";
}
