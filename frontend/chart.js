let line_Chart; 
let pie_Chart;

function createlineChart(expenses) {
    const linechart = document.querySelector('#myChart');
    const labels = expenses.map(expense => expense.category);
    const dataValues = expenses.map(expense => parseInt(expense.expense));

    const negativeDataValues = dataValues.map(value => -value);

    if (line_Chart) {
        line_Chart.destroy();
    }

    line_Chart = new Chart(linechart, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Expenses',
                    data: negativeDataValues,
                    borderColor: 'red',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            hover: {
                mode: 'index'
            }
        }
    });
}

function createChart(top3Expenses) {
    const piechart = document.querySelector('#chart');

    const labels = top3Expenses.map(expense => expense.category);
    const dataValues = top3Expenses.map(expense => parseInt(expense.expense));
    const negativeDataValues = dataValues.map(value => -value);

    if (pie_Chart) {
        pie_Chart.destroy();
    }

    pie_Chart = new Chart(piechart, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Expenses',
                    data: negativeDataValues,
                    backgroundColor: ['red', 'blue', 'green'],
                    borderColor: 'white',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            hover: {
                mode: 'index'
            }
        }
    });
}


document.getElementById('income-btn1').addEventListener('click', () => {
    addToIncome(100);
});


function addToIncome(amount) {
    const incomeInput = document.getElementById('income');
    const currentIncome = parseFloat(incomeInput.value || 0);
    const newIncome = currentIncome + amount;
    incomeInput.value = newIncome;
}