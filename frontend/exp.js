const userForm = document.getElementById('user-form');
const userList = document.getElementById('user-list');
const expenseList = document.getElementById('expense-list');
const previousButton = document.getElementById('previousButton');
const nextButton = document.getElementById('nextButton');

// const totalIncomeBox = document.querySelector('.box1');

userForm.addEventListener('submit', handleUserForm);

async function handleUserForm(event) {
    event.preventDefault();

    const addButtonClicked = event.submitter.id === 'add-income-btn';
    const token = localStorage.getItem('token');

    if (!token) {
        console.log("Token not found!");
        return;
    }

    const userData = addButtonClicked ? prepareIncomeData() : prepareExpenseData();

    try {
        const response = await fetch(addButtonClicked ? 'https://expense-tracker-app-backend-ashen.vercel.app/exp/add_income' : '/exp/add_expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            console.log(addButtonClicked ? 'Income created successfully!' : 'Expense created successfully!');
            fetchUsers();
            document.getElementById('income').value = '';
            document.getElementById('expense').value = '';
            document.getElementById('description').value = '';
            document.getElementById('category').selectedIndex = 0;
            document.getElementById('credit-card').checked = false;
            document.getElementById('debit-card').checked = false;
        } else {
            console.log(`Error creating ${addButtonClicked ? 'income' : 'expense'}.`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


function prepareIncomeData() {
    const income = document.getElementById('income').value;
    return { income };
}

function prepareExpenseData() {
    const expense = document.getElementById('expense').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const cardOptions = document.getElementsByName('payment');
    let card;

    for (const option of cardOptions) {
        if (option.checked) {
            card = option.value;
            break;
        }
    }

    return { expense, description, category, card };
}


// Fetching Income&Expenses
async function fetchUsers() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("Token not found!");
            return;
        }

        //?page=${currentPage}
        const responseExpenses = await fetch(`https://expense-tracker-app-backend-ashen.vercel.app/exp/fetch_exp`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const dataExpenses = await responseExpenses.json();

        userList.innerHTML = '';
        let totalExpense = 0;
        const expenses = dataExpenses.expenses;

        for (const expense of expenses) {
            const li = document.createElement('li');
            li.innerHTML = `<div class="expense-item">
            <span class="category">${expense.category}</span>
            <span class="card">${expense.card}</span>
            <span class="expense"> -₹${expense.expense}</span>
            </div>`;

            totalExpense += parseInt(expense.expense);
            userList.appendChild(li);
        }
        createlineChart(expenses);

        expenses.sort((a, b) => parseInt(b.expense) - parseInt(a.expense));
        const top3Expenses = expenses.slice(0, 3);
        createChart(top3Expenses);

        const totalExpenseElement = document.getElementById('totalExpense');
        totalExpenseElement.textContent = `- ₹${totalExpense}`;

        const responseIncome = await fetch(`https://expense-tracker-app-backend-ashen.vercel.app/exp/fetch_income`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const dataIncome = await responseIncome.json();

        let totalIncome = 0;
        const incomes = dataIncome.income;

        for (const income of incomes) {
            totalIncome += parseInt(income.income);
        }

        const totalIncomeBox = document.getElementById('totalIncome');
        totalIncomeBox.textContent = `₹ ${totalIncome}`;

        const remainingAmount = totalIncome - totalExpense;
        const remainingText = remainingAmount < 0 ? `-₹${Math.abs(remainingAmount)}` : `₹${remainingAmount}`;
        const totalRemaining = document.getElementById('totalRemain');
        totalRemaining.textContent = remainingText;

        totalPages = dataExpenses.totalPages;
        // updatePaginationButtons();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Pagination
let currentPage = 1;
let totalPages = 1;

// previousButton.addEventListener('click', () => {
//     if (currentPage > 1) {
//         currentPage--;
//         fetchUsers();
//     }
// });

// nextButton.addEventListener('click', () => {
//     if (currentPage < totalPages) {
//         currentPage++;
//         fetchUsers();
//     }
// });


// function updatePaginationButtons() {
//     previousButton.disabled = currentPage === 1;
//     nextButton.disabled = currentPage === totalPages;
// }


// Deleting Expenses
async function deleteUser(expenseId) {
    try {
        const response = await fetch(`https://expense-tracker-app-backend-ashen.vercel.app/exp/del_exp/${expenseId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            fetchUsers();
        } else {
            console.error('Error deleting user.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}


fetchUsers();


// Logout Code
const logout = document.getElementById('logOut');

logout.addEventListener('click', async () => {
    window.location.href = "index.html";
    localStorage.clear();
    alert("Logged Out Successfully");
});


// Backdrop Effext
document.addEventListener('DOMContentLoaded', function() {
    const newButton = document.getElementById('new-button');
    const backdrop = document.getElementById('backdrop');
    const formContainer = document.getElementById('form-container');
    const closeButton = document.getElementById('close-button');

    newButton.addEventListener('click', function() {
        backdrop.style.display = 'block';
        formContainer.style.display = 'block';
    });

    closeButton.addEventListener('click', function() {
        backdrop.style.display = 'none';
        formContainer.style.display = 'none';
    });
});


// Menubar
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});



// Day and Night

const darkModeButton = document.getElementById('dark-mode');
const lightModeButton = document.getElementById('light-mode');

darkModeButton.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
});

lightModeButton.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
});



