chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    var url = info.url || tab.url;
    if (url && matchUrls.indexOf(url) > -1)
        chrome.browserAction.enable(tabId);
    else
        chrome.browserAction.disable(tabId);
});

const matchUrls = ["https://wrem.sis.yorku.ca/Apps/WebObjects/ydml.woa/wa/DirectAction/document?name=CourseListv1",
"https://wrem.sis.yorku.ca/Apps/WebObjects/ydml.woa/wa/DirectAction/document?name=GradeReportv1",
"https://wrem.sis.yorku.ca/Apps/WebObjects/ydml.woa/wa/DirectAction/document?name=GradeRpSummerv1"];
