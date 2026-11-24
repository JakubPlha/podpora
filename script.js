const BACKEND_URL = "https://vdf-games-support-api.onrender.com/chat";

const form = document.getElementById("question-form");
const textarea = document.getElementById("question");
const answerDiv = document.getElementById("answer");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = textarea.value.trim();
    if (!text) {
        answerDiv.textContent = "Nejdřív napiš dotaz.";
        return;
    }

    answerDiv.textContent = "Zpracovávám dotaz…";
    form.querySelector("button").disabled = true;

    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        if (!response.ok) {
            answerDiv.textContent = data.error || `Server vrátil chybu: ${response.status}`;
        } else if (data.reply) {
            answerDiv.textContent = data.reply;
        } else if (data.error) {
            answerDiv.textContent = "Chyba serveru: " + data.error;
        } else {
            answerDiv.textContent = "Server nevrátil žádnou odpověď.";
        }
    } catch (err) {
        console.error(err);
        answerDiv.textContent = "Nepodařilo se spojit se serverem.";
    } finally {
        form.querySelector("button").disabled = false;
        textarea.value = "";
    }
});