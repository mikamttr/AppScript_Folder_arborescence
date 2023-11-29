function checkFolderExists(folderId) {
  try {
    var folder = DriveApp.getFolderById(folderId);
    return { success: true, message: "Folder exists" };
  } catch (error) {
    return { success: false, message: "The folder doesn't exist or you don't have access" };
  }
}
