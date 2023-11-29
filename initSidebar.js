function onOpen() {
  SpreadsheetApp.getUi()
  .createMenu('Sidebars')
  .addItem('Folder Arborescence' , 'customSidebar')
  .addToUi();
}

function customSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle('Generate folder arborescence')
  SpreadsheetApp.getUi().showSidebar(html);
}
