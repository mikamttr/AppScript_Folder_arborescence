function getFolderTree(folderId, listAll) {
  var parentFolder = DriveApp.getFolderById(folderId);
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.clear();
  sheet.appendRow(["Type", "Full Path", "Name", "URL", "Access"]);
  
  var childFolders = parentFolder.getFolders();
  if (!childFolders.hasNext() && listAll) {
    listFilesInFolder(parentFolder.getName(), parentFolder, sheet);
  } else {
    getChildFolders(parentFolder.getName(), parentFolder, sheet, listAll);
  }
}

function getChildFolders(parentName, parent, sheet, listAll) {
  var childFolders = parent.getFolders();

  while (childFolders.hasNext()) {
    var childFolder = childFolders.next();
    var data = [
      'folder',
      parentName + "/" + childFolder.getName(),
      childFolder.getName(),
      childFolder.getUrl()
    ];

    var editors = childFolder.getEditors();
    var datau = [];

    for (var i = 0; i < editors.length; i++) {
     datau.push(editors[i].getEmail());
    }

    var dataf = data.concat(datau);
    sheet.appendRow(dataf);

    var files = childFolder.getFiles();
    while (listAll && files.hasNext()) {
      var childFile = files.next();
      data = [
        'file',
        parentName + "/" + childFolder.getName() + "/" + childFile.getName(),
        childFile.getName(),
        childFile.getUrl(),
      ];

      editors = childFile.getEditors();
      datau = [];

      for (var i = 0; i < editors.length; i++) {
        datau.push(editors[i].getEmail());
      }

      dataf = data.concat(datau);
      sheet.appendRow(dataf);
    }

    getChildFolders(parentName + "/" + childFolder.getName(), childFolder, sheet, listAll);
  }
}

/**
 * Lists files in the specified folder and appends their information to the provided spreadsheet sheet.
 * 
 * @param {string} parentName - The name of the parent folder.
 * @param {GoogleAppsScript.Drive.Folder} parent - The parent folder object.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet - The spreadsheet sheet to which the file information will be appended.
 */
function listFilesInFolder(parentName, parent, sheet) {
  var files = parent.getFiles();

  // Iterate through the files in the folder
  while (files.hasNext()) {
    var childFile = files.next();
    var data = [
      'file',
      parentName + "/" + childFile.getName(),
      childFile.getName(),
      childFile.getUrl(),
    ];

    var editors = childFile.getEditors();
    var datau = [];

    // Iterate through the editors of the file
    for (var i = 0; i < editors.length; i++) {
      datau.push(editors[i].getEmail());
    }

    var dataf = data.concat(datau);
    sheet.appendRow(dataf);
  }
}
