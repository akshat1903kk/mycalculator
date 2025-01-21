document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.querySelector(".input input:nth-child(1)");
    const sizeInput = document.querySelector(".input input:nth-child(2)");
    const monthsInput = document.querySelector(".input input:nth-child(3)");
    const shiftInput = document.querySelector(".input input:nth-child(4)");
    const daysInput = document.querySelector(".input input:nth-child(5)");
    const submitButton = document.querySelector(".input input[type='button']");
    const outputInput = document.querySelector(".output input");

    const calculateTonPerHour = async () => {
        const amount = parseFloat(amountInput.value);
        const size = parseInt(sizeInput.value);
        const months = parseInt(monthsInput.value);
        const shift = parseFloat(shiftInput.value);
        const days = parseInt(daysInput.value);

        if (isNaN(amount) || isNaN(size) || isNaN(months) || isNaN(shift) || isNaN(days)) {
            alert("Please fill out all fields with valid numbers.");
            return;
        }

        try {
            const response = await fetch(`/home/${amount}/${size}/${months}/${shift}/${days}`);
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                outputInput.value = data.ton_per_day.toFixed(2);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    submitButton.addEventListener("click", calculateTonPerHour);
});
