export const changeFontStyle = `const activeSheet = univerAPI.getActiveWorkbook().getActiveSheet();

// Set A1:B2 value
activeSheet.getRange(0, 0, 2, 2).setValues([[1,2],[3,4]]);
// Set A1:B2 to bold
activeSheet.getRange(0, 0, 2, 2).setFontWeight('bold');`
