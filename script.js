document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculate').addEventListener('click', calculateProjection);
});

function calculateProjection() {
    const maintenanceFee = parseFloat(document.getElementById('maintenanceFee').value) || 0;
    const maintenanceFee2 = parseFloat(document.getElementById('maintenanceFee2').value) || 0;
    const priceIncrease = parseFloat(document.getElementById('priceIncrease').value) / 100 || 0;

    let data = [], data2 = [], labels = [], totalSavings = 0;
    let fee1 = maintenanceFee, fee2 = maintenanceFee2;

    for (let year = 1; year <= 20; year++) {
        fee1 *= (1 + priceIncrease);
        fee2 *= (1 + priceIncrease);
        data.push(fee1);
        data2.push(fee2);
        labels.push(`Year ${year}`);
        totalSavings += (fee1 - fee2);
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Company 1',
                data: data,
                borderColor: 'red',
                fill: false,
            }, {
                label: 'Spinnaker',
                data: data2,
                borderColor: 'green',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Maintenance Fee ($)'
                    }
                }
            }
        }
    });

    document.getElementById('savings').innerHTML = `20-Year Savings with Spinnaker: $${Math.abs(totalSavings).toFixed(2)}`;
}
