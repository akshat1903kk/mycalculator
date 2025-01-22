document.addEventListener("DOMContentLoaded", () => {
    const calculationTable = document.querySelector("#calculationTable tbody");
    const addRowButton = document.getElementById("addRow");

    const calculateTonPerHour = async (row) => {
        const amountInput = row.querySelector(".amount");
        const sizeInput = row.querySelector(".size");
        const monthsInput = row.querySelector(".months");
        const shiftInput = row.querySelector(".shift");
        const daysInput = row.querySelector(".days");
        const outputInput = row.querySelector(".ton-per-hour");

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

    const addRow = () => {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td><input type="number" class="amount" placeholder="Amount"></td>
            <td><input type="number" class="size" placeholder="Size"></td>
            <td><input type="number" class="months" placeholder="Duration in Months"></td>
            <td><input type="number" class="shift" placeholder="Shift in Hour"></td>
            <td><input type="number" class="days" placeholder="Number of Working Days"></td>
            <td><input type="number" class="ton-per-hour" placeholder="TON PER HOUR" readonly></td>
            <td><button type="button" class="calculate">Calculate</button></td>
        `;
        calculationTable.appendChild(newRow);

        const calculateButton = newRow.querySelector(".calculate");
        calculateButton.addEventListener("click", () => calculateTonPerHour(newRow));
    };

    // Add event listener to initial calculate button
    document.querySelectorAll(".calculate").forEach((button) => {
        const row = button.closest("tr");
        button.addEventListener("click", () => calculateTonPerHour(row));
    });

    // Add event listener to addRow button
    addRowButton.addEventListener("click", addRow);
});
