const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let expenses = [];
let totalExpenses = 0;

function showMenu() {
    console.log("\n===== EXPENSE TRACKER =====");
    console.log("1. Add Expense");
    console.log("2. View Expenses");
    console.log("3. View Total Expenses");
    console.log("4. Delete Expense");
    console.log("5. Exit");

    rl.question("Choose an option: ", handleMenu);
}

function handleMenu(choice) {
    if (choice === "1") {
        addExpense();
    } else if (choice === "2") {
        viewExpenses();
    } else if (choice === "3") {
        viewTotal();
    } else if (choice === "4") {
        deleteExpense();
    } else if (choice === "5") {
        console.log("Thank you for using Expense Tracker!");
        rl.close();
    } else {
        console.log("Invalid choice. Please try again.");
        showMenu();
    }
}

function showExpenseSummary() {
    console.log("\n===== EXPENSE SUMMARY =====");
    console.log(`Number of Expenses: ${expenses.length}`);
    console.log(`Total Expenses: ₱${totalExpenses.toFixed(2)}`);
}

function addExpense() {
    rl.question("Enter expense name: ", function (name) {
        rl.question("Enter expense amount: ", function (amountInput) {
            const amount = Number(amountInput);

            if (name.trim() === "" || amountInput.trim() === "" ||
                !Number.isFinite(amount) || amount <= 0) {
                console.log("Please enter a valid name and amount.");
                showMenu();
                return;
            }

            expenses.push({
                name: name.trim(),
                amount: amount
            });

            totalExpenses += amount;

            console.log("Expense added successfully!");
            showExpenseSummary();
            showMenu();
        });
    });
}

function viewExpenses() {
    console.log("\n===== YOUR EXPENSES =====");

    if (expenses.length === 0) {
        console.log("No expenses recorded yet.");
    } else {
        expenses.forEach(function (expense, index) {
            console.log(
                `${index + 1}. ${expense.name} - ₱${expense.amount.toFixed(2)}`
            );
        });
    }

    showMenu();
}

function viewTotal() {
    showExpenseSummary();
    showMenu();
}

function deleteExpense() {
    if (expenses.length === 0) {
        console.log("There are no expenses to delete.");
        showMenu();
        return;
    }

    viewExpensesWithoutMenu();

    rl.question("Enter the expense number to delete: ", function (input) {
        const index = Number(input) - 1;

        if (
            input.trim() === "" ||
            !Number.isInteger(Number(input)) ||
            index < 0 ||
            index >= expenses.length
        ) {
            console.log("Invalid expense number.");
        } else {
            const removedExpense = expenses.splice(index, 1)[0];
            totalExpenses -= removedExpense.amount;

            console.log(`${removedExpense.name} has been deleted.`);
            showExpenseSummary();
        }

        showMenu();
    });
}

function viewExpensesWithoutMenu() {
    console.log("\n===== YOUR EXPENSES =====");

    expenses.forEach(function (expense, index) {
        console.log(
            `${index + 1}. ${expense.name} - ₱${expense.amount.toFixed(2)}`
        );
    });
}

showMenu();
