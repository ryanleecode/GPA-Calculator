chrome.runtime.onConnect.addListener(function (incPort) {
    if (incPort.name !== "app") {
        return;
    }
    incPort.onMessage.addListener(function (msg) {
        if (msg === "Get GPA") {
            sendGPA();
        }
        if (msg.hasOwnProperty("add")) {
            addRow(msg["add"]);
            sendGPA();
        }
        if (msg === "Pop Row") {
            popRow();
            sendGPA();
        }
    });
});

// Get the table that contains the user's grades
// This is hard coded based on the format of the YorkU grades page
function getGradesTable() {
    const tableBodies = document.getElementsByTagName("tbody");
    for (let i = 0; i < tableBodies.length; i++) {
        const tBodyRows = tableBodies[i].children;
        if (
            tBodyRows.length >= 2 &&
            tBodyRows.hasOwnProperty("0") &&
            tBodyRows.hasOwnProperty("1")
        ) {
            if (
                (tBodyRows["0"].innerText === "Enrolled Courses" &&
                    tBodyRows["1"].innerText === "Session	Course	Title	Grade") ||
                tBodyRows["0"].innerText === "Session	Course	Title	Grade"
            ) {
                return tableBodies[i];
            }
        }
    }
}

function getGPA() {
    let total = 0.0;
    let counter = 0.0;
    const gradesRows = getGradesTable().children;
    for (const prop in gradesRows) {
        if (
            !gradesRows.hasOwnProperty(prop) ||
            gradesRows[prop].children.length !== 4
        ) {
            continue;
        }
        const tableData = gradesRows[prop].children;
        let credits = tableData[1].textContent.match(/[0-9]*\.[0-9]*/);
        let grade = YorKUGradeScale[tableData[3].innerText];
        if (credits === null || grade === undefined) {
            continue;
        }
        total += parseFloat(grade) * parseFloat(credits[0]);
        counter += parseFloat(credits[0]);
    }
    return total / counter;
}

function sendGPA() {
    const port = chrome.runtime.connect({ name: "contentScript" });
    port.postMessage({ GPA: getGPA() });
}

function addRow(rowData) {
    const gradesTable = getGradesTable();
    const row = document.createElement("tr");
    for (let i = 0; i < rowData.length; i++) {
        const td = document.createElement("td");
        const textNode = document.createTextNode(rowData[i]);
        td.appendChild(textNode);
        row.appendChild(td);
    }
    gradesTable.appendChild(row);
}

function popRow() {
    const gradesTable = getGradesTable();
    gradesTable.removeChild(gradesTable.lastChild);
}

const YorKUGradeScale = {
    "A+": 9,
    A: 8,
    "B+": 7,
    B: 6,
    "C+": 5,
    C: 4,
    "D+": 3,
    D: 2,
    E: 1,
    F: 0,
    "F NGR": 0,
};
