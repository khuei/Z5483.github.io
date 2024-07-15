let rowValue = 0;
let columnValue = 0;

function getInput() {
    rowValue = parseInt(document.getElementById('row-input').value) + 1;
    columnValue = parseInt(document.getElementById('column-input').value) + 1;
}

function constructTable() {
    let table = new Array(rowValue);

    for (let row = 0; row < rowValue; ++row) {
        table[row] = [];
        for (let col = 0; col < columnValue; ++col) {
            if (row == 0) {
                table[row][col] = col;
            } else if (col == 0) {
                table[row][col] = row;
            } else {
                table[row][col] = col * row;
            }
        }
    }

    return table;
}

function createTable(tableData) {
    let table = document.createElement('table');
    table.id = "generated-table";
    let tableBody = document.createElement('tbody');

    tableData.forEach(function(rowData) {
        let row = document.createElement('tr');

        rowData.forEach(function(cellData) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.getElementById("content").appendChild(table);
}

function createTableStr(table) {
    let tableStr = "";

    for (let row = 0; row < rowValue; ++row) {
        tableStr += "\n";
        for (let col = 0; col < columnValue; ++col) {
            tableStr += table[row][col] + "\t";
        }
    }

    return tableStr;
}

document.getElementById("generate-btn").addEventListener(
    "click",
    function() {
        getInput();

        let table = constructTable();

        let existingTable = document.getElementById("generated-table");
        if (existingTable) {
            existingTable.remove();
        }

        createTable(table);

        console.log("Number of Column to Multiply: " + (columnValue - 1));
        console.log("Number of Row to Multiply: " + (rowValue - 1));
        console.log(createTableStr(table));
    }
);
