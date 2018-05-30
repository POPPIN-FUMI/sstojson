function onOpen(){
  var mySpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var myMenuEntries = [];
  myMenuEntries.push({name: "JSON表示", functionName: "getJson"});
  mySpreadsheet.addMenu("ELSOUL-ツール", myMenuEntries);
}

function getJson(){
  var active = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = active.getActiveSheet();
  convertSheet2Json(sheet);
}

Array.prototype.divide = function(n){
    var ary = this;
    var idx = 0;
    var results = [];
    var length = ary.length;

    while (idx + n < length){
        var result = ary.slice(idx,idx+n)
        results.push(result);
        idx = idx + n
    }

    var rest = ary.slice(idx,length+1)
    results.push(rest)
    return results;
}

function convertSheet2Json(sheet) {

  var lastColumn = sheet.getLastColumn();
  var lastRow = sheet.getLastRow();
  var cellValues = [];
  var json = new Object();

  for(var columnIndex=1; columnIndex<=lastColumn; columnIndex++) {
    for(var rowIndex=1; rowIndex<=lastRow; rowIndex++) {
      var cell = sheet.getRange(rowIndex, columnIndex);
      var value = cell.getValue().replace(/\r?\n/g, "<br />");
      cellValues.push(value);
    }
  }

  divideAry = cellValues.divide(lastRow)

  for(var i=0; i<lastColumn; i++) {
    for(var j=0; j<lastRow; j++) {
      json["p"+j] = divideAry[i][j];
    }
    Browser.msgBox(JSON.stringify(json));
  }
}