console.log("Hey");


const form = document.getElementById("anemiaForm");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const hemoglobin = parseFloat(document.getElementById("hemoglobin").value);
    const gender = parseInt(document.getElementById("gender").value);
    const mch = parseFloat(document.getElementById("mch").value);
    const mchc = parseFloat(document.getElementById("mchc").value);
    const mcv = parseFloat(document.getElementById("mcv").value);

    const dataObj = [gender, hemoglobin, mch, mchc, mcv];

    fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        body: JSON.stringify({ data: dataObj }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("predictionResult").textContent = data.prediction === 1 ? "Have Anemia" : "Don't Have Anemia";
            document.getElementById("confidenceResult").textContent = `${data.confidance.toFixed(2)}% confidence`;
        })
        .catch(error => {
            console.error("An error occurred:", error);
        });
});
