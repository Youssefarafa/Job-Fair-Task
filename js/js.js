google.charts.load('current', { 'packages': ['corechart'] });
document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});
let objectBank;
function DisplayCharts(x) {
    document.getElementById("charts").scrollIntoView({ behavior: 'smooth' });
    let malhoza = Array.from(document.getElementsByClassName("malhoza"));
    malhoza.forEach(element => {
        element.innerHTML = `Please Wait Until The Charts Looding...`
    });
    let data = {
        theName: objectBank.customers[0].name,
        theDateAndtheAmount: [],
    }
    for (let i = 0; i < objectBank.customers.length; i++) {
        if (objectBank.customers[i].id == x) {
            data.theName = objectBank.customers[i].name;
            break;
        }
    }
    for (let i = 0; i < objectBank.transactions.length; i++) {
        if (objectBank.transactions[i].customer_id == x) {
            data.theDateAndtheAmount.push([objectBank.transactions[i].date, objectBank.transactions[i].amount]);
        }
    }
    let obj = { title: data.theName };
    let newData = [
        ['Date', 'Amount'],
        ...data.theDateAndtheAmount
    ]
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart1);
    function drawChart1() {
        const data = google.visualization.arrayToDataTable(newData);
        const options = {
            ...obj,
            is3D: true,
            titleTextStyle: {
                color: '#e0e0e0',
                fontName: 'Arial',
                fontSize: 24,
                bold: true,
                italic: false
            },
            backgroundColor: '#015252',
            chartArea: {
                left: 70,
                top: 100,
                width: '80%',
                height: '70%'
            },
            colors: ['#1f4eaa', '#8f2206', '#c48c09', '#0a7612', '#7a137a', '#0c670c'],
            legend: {
                position: 'left',
                textStyle: {
                    color: '#e0e0e0',
                    fontSize: 16
                }
            },
            pieSliceText: 'value',
            pieSliceTextStyle: {
                color: '#e0e0e0',
                fontSize: 14
            },
            slices: {
                0: { offset: 0.1 }
            }
        };
        document.getElementById('myChart1').innerHTML = ``;
        const chart = new google.visualization.PieChart(document.getElementById('myChart1'));
        chart.draw(data, options);
    }
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart2);
    function drawChart2() {
        const data = google.visualization.arrayToDataTable(newData);
        const options = {
            ...obj,
            titleTextStyle: {
                color: '#333',
                fontSize: 24,
                bold: true
            },
            titlePosition: 'out',
            curveType: 'function',
            legend: 'none',
            backgroundColor: '#e6e4e4',
            chartArea: {
                backgroundColor: '#e6e4e4',
                width: '80%',
                height: '70%',
                top: 70,
                left: 100
            },
            hAxis: {
                title: `Date`,
                textStyle: {
                    color: '#333',
                    fontSize: 10,
                    bold: true
                },
                titleTextStyle: {
                    color: '#333',
                    fontSize: 16,
                    bold: true
                }
            },
            vAxis: {
                title: `Amount Transection`,
                textStyle: {
                    color: '#333',
                    fontSize: 10,
                    bold: true
                },
                titleTextStyle: {
                    color: '#333',
                    fontSize: 16,
                    bold: true
                }
            },
            series: {
                0: { color: '#0395e9' },
                1: { color: '#dc3912' }
            },
            lineWidth: 4,
            pointSize: 6,
            pointShape: 'circle',
            tooltip: {
                textStyle: {
                    color: '#333',
                    fontSize: 12
                },
                showColorCode: true
            }
        };
        document.getElementById('myChart2').innerHTML = ``;
        const chart = new google.visualization.LineChart(document.getElementById('myChart2'));
        chart.draw(data, options);
    }
}
function fetchData() {
    Promise.all([
        fetch('http://localhost:3000/customers').then(response => response.json()),
        fetch('http://localhost:3000/transactions').then(response => response.json())
    ])
        .then((myData) => {
            let arrBank = JSON.parse(JSON.stringify(myData));
            objectBank = {
                "customers": arrBank[0],
                "transactions": arrBank[1]
            }
            let cartona1 = ``;
            let cartona2 = ``;
            let cartona = ``;
            let cartonaa = ``;
            let counter = 0;
            let myTable = document.getElementById("myTable");
            function part1DisplayTabelByCustomerName(objectBank, i, arr1, arr2) {
                for (let j = 0; j < objectBank.transactions.length; j++) {
                    if (objectBank.transactions[j].customer_id == objectBank.customers[i].id) {
                        arr1.push(objectBank.transactions[j].amount);
                        arr2.push(objectBank.transactions[j].date);
                        counter++;
                    }
                }
                cartona1 = `
                    <tr>
                        <td class="text-center p-2 myBorder p-1" rowspan="${counter}">${objectBank.customers[i].id}</td>
                        <td class="text-center p-2 myBorder p-1" rowspan="${counter}">${objectBank.customers[i].name}</td>
                    `;
            }
            function part2DisplayTabelByCustomerName(arr1, arr2, i) {
                for (let j = 0; j < arr1.length; j++) {
                    if (j == 0) {
                        cartona2 = `
                    <td class="text-center p-2 myBorder rounded-4 p-1">${arr1[j]}$</td>
                    <td class="text-center p-2 myBorder rounded-4 p-1">${arr2[j]}</td>
                    <td class="text-center p-2 myBorder rounded-4 p-1"><button type="button" class="btn btn-outline-primary h-9px pt-0 w-50px" onclick="DisplayCharts(${objectBank.customers[i].id})">View Data</button></td>
                </tr>
            `
                    } else {
                        cartona2 += `
                <tr>
                    <td class="text-center p-2 myBorder rounded-4 p-1">${arr1[j]}$</td>
                    <td class="text-center p-2 myBorder rounded-4 p-1">${arr2[j]}</td>
                    <td class="text-center p-2 myBorder rounded-4 p-1"><button type="button" class="btn btn-outline-primary h-9px pt-0 w-50px" onclick="DisplayCharts(${objectBank.customers[i].id})">View Data</button></td>
                </tr>
                `
                    }
                }
                cartona += cartona1 + cartona2;
                cartona1 = ``; cartona2 = ``;
                counter = 0;
            }
            (function () {
                for (let i = 0; i < objectBank.customers.length; i++) {
                    let arr1 = [];
                    let arr2 = [];
                    part1DisplayTabelByCustomerName(objectBank, i, arr1, arr2);
                    part2DisplayTabelByCustomerName(arr1, arr2, i);
                }
                cartonaa = cartona;
                myTable.innerHTML = cartona;
            })();
            let CustomerName = document.getElementById("CustomerName");
            let TransactionAmount = document.getElementById("TransactionAmount");
            CustomerName.addEventListener("keyup", function () {
                TransactionAmount.value = "";
                cartona = ``; cartona1 = ``; cartona2 = ``;
                for (let i = 0; i < objectBank.customers.length; i++) {
                    let arr1 = [];
                    let arr2 = [];
                    // !! you can search about any name has a Character in iny part of this name by using indexOf() instead of startsWith().
                    if (objectBank.customers[i].name.toLowerCase().startsWith(this.value.toLowerCase()) != false) {
                        part1DisplayTabelByCustomerName(objectBank, i, arr1, arr2);
                    }
                    part2DisplayTabelByCustomerName(arr1, arr2, i);
                }
                myTable.innerHTML = cartona;
            })
            function DisplayTabaleByTransactionAmount(x) {
                CustomerName.value = "";
                cartona = ``; cartona1 = ``; cartona2 = ``;
                counter = 0;
                for (let i = 0; i < objectBank.transactions.length; i++) {
                    counter=0;
                    if (objectBank.transactions[i].amount == x.value) {
                        cartona2 = `
                    <td class="text-center p-2 myBorder rounded-4 p-1">${objectBank.transactions[i].amount}$</td>
                    <td class="text-center p-2 myBorder rounded-4 p-1">${objectBank.transactions[i].date}</td>
                `;
                        counter++;
                        for (let j = 0; j < objectBank.customers.length; j++) {
                            if (objectBank.transactions[i].customer_id == objectBank.customers[j].id) {
                                cartona1 = `
                        <tr>
                            <td class="text-center p-2 myBorder p-1" rowspan="${counter}">${objectBank.customers[j].id}</td>
                            <td class="text-center p-2 myBorder p-1" rowspan="${counter}">${objectBank.customers[j].name}</td>
                        `;
                                cartona2 += `
                            <td class="text-center p-2 myBorder rounded-4 p-1"><button type="button" class="btn btn-outline-primary h-9px pt-0 w-50px" onclick="DisplayCharts(${objectBank.customers[j].id})">View Data</button></td>
                        </tr>
                        `
                            }
                        }
                        cartona += cartona1 + cartona2;
                        cartona1 = ``; cartona2 = ``;
                    }
                    if (x.value == '') {
                        cartona = cartonaa;
                    }
                }
                myTable.innerHTML = cartona;
            }
            TransactionAmount.addEventListener("keyup", function () {
                DisplayTabaleByTransactionAmount(this);
            })
            TransactionAmount.addEventListener("change", function () {
                DisplayTabaleByTransactionAmount(this);
            })
            function displayMalhoza(x) {
                console.log(x.value);
                if (x.value != '' && x.value <= objectBank.customers.length && x.value >= 1) {
                    DisplayCharts(x.value);
                } else if (x.value == '') {
                    let myChart1 = document.getElementById("myChart1");
                    myChart1.innerHTML = `
                        <div class="position-relative w-100 h-100">
                            <p
                                class="font-Montserrat fs-4 text-center fw-600 text-custom1 position-absolute top-50 start-50 translate-middle w-75 malhoza">
                                Please select one of the buttons <strong class="my-text-info">view</strong> and press it or Enter ID Customer in an Id Input</p>
                        </div>
                        `;
                    let myChart2 = document.getElementById("myChart2");
                    myChart2.innerHTML = `
                        <div class="position-relative w-100 h-100">
                            <p
                                class="font-Montserrat fs-4 text-center fw-600 text-custom1 position-absolute top-50 start-50 translate-middle w-75 malhoza">
                                Please select one of the buttons <strong class="my-text-info">view</strong> and press it or Enter ID Customer in an Id Input</p>
                        </div>
                        `;
                } else {
                    let myChart1 = document.getElementById("myChart1");
                    myChart1.innerHTML = `
                        <div class="position-relative w-100 h-100">
                            <p
                                class="font-Montserrat fs-4 text-center fw-600 text-custom1 position-absolute top-50 start-50 translate-middle w-75 malhoza">
                                Please select one of the buttons <strong class="my-text-info">view</strong> and press it or Enter <strong class='my-text-danger'>Valid</strong> ID Customer in an Id Input</p>
                        </div>
                        `;
                    let myChart2 = document.getElementById("myChart2");
                    myChart2.innerHTML = `
                        <div class="position-relative w-100 h-100">
                            <p
                                class="font-Montserrat fs-4 text-center fw-600 text-custom1 position-absolute top-50 start-50 translate-middle w-75 malhoza">
                                Please select one of the buttons <strong class="my-text-info">view</strong> and press it or Enter <strong class='my-text-danger'>Valid</strong> ID Customer in an Id Input</p>
                        </div>
                        `;
                }
            }
            document.getElementById("CustomerId").addEventListener("keyup", function () {
                displayMalhoza(this);
            })
            document.getElementById("CustomerId").addEventListener("change", function () {
                displayMalhoza(this);
            })
            let btns = Array.from(document.getElementsByClassName("btn"));
            btns.forEach(element => {
                element.addEventListener("click", function () {
                    document.getElementById("CustomerId").value = '';
                })
            });
        })
        .catch(function (error) {
            console.log("error is : " + error.message);
        })
}
