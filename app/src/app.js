const getGPA = 'Get GPA';
const GPA = 'GPA';

document.addEventListener('DOMContentLoaded', () => {
    queryGPA();
    document.getElementById("AddRow").addEventListener('click', pushRow);
    document.getElementById("PopRow").addEventListener('click', popRow);
});

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name !== 'contentScript') {
        return;
    }
    port.onMessage.addListener(function(msg) {
        if (msg.hasOwnProperty(GPA)) {
            document.getElementById(GPA).innerHTML = msg[GPA].toFixed(2);
            setGPATextColour(msg[GPA]);
        }
    });
});

function queryGPA() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const port = chrome.tabs.connect(tabs[0].id, { name : 'app' });
        port.postMessage(getGPA);
    });
}

function setGPATextColour(gpa) {
    if (gpa < 4) {
        document.getElementById(GPA).style.color = "red";
    } else if (gpa >= 4 && gpa < 8) {
        document.getElementById(GPA).style.color = "orange";
    } else {
        document.getElementById(GPA).style.color = "green";
    }
}

function pushRow() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const port = chrome.tabs.connect(tabs[0].id, { name : 'app' });
        port.postMessage({ add: [
            document.getElementById("Session").value,
            document.getElementById("Course").value,
            document.getElementById("Title").value,
            document.getElementById("Grade").value
        ]});
    });
}

function popRow() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const port = chrome.tabs.connect(tabs[0].id, { name : 'app' });
        port.postMessage("Pop Row");
    });
}
