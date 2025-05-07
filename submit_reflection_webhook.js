
function submitReflection() {
    const answers = {};
    for (let i = 1; i <= 26; i++) {
        const textarea = document.getElementById(`q${i}`);
        if (textarea) {
            answers[`q${i}`] = textarea.value.trim();
        }
    }

    const phases = {
        phase1: Object.values(answers).slice(0, 6).join("\n"),
        phase2: Object.values(answers).slice(6, 14).join("\n"),
        phase3: Object.values(answers).slice(14, 21).join("\n"),
        phase4: Object.values(answers).slice(21, 26).join("\n"),
    };

    const payload = {
        timestamp: new Date().toISOString(),
        ...phases
    };

    fetch("https://hook.us1.make.com/YOUR_WEBHOOK_URL", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (response.ok) {
            alert("Your reflection has been submitted. The mirror remembers.");
            showPage('disclaimer-page');
        } else {
            alert("Submission failed. Please try again.");
        }
    }).catch(error => {
        console.error("Error submitting reflection:", error);
        alert("An error occurred. Please try again.");
    });
}
