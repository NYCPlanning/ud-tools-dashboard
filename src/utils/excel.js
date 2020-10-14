import XLSX from 'xlsx';
import { formatFAR, formatNum } from '../utils/format';

const sheetNames = ['sites_existing', 'sites_no-action', 'sites_with-action', 'sites_increment', 'sites_lots', 'lots']
const testArray = [
        {
          'ID': 2,
          'Name': 'Jason'
        },
        {
          'ID': 3,
          'Name': 'Steve'
        },
      ];

export default class RWCDSWorkbook {
  constructor(state) {
    this.book = XLSX.utils.book_new();
    this.initialize();
  }

  initialize = () => {
    let wb = this.book;

    sheetNames.forEach((s) => {
      const sheetContent = XLSX.utils.json_to_sheet(testArray)
      wb.SheetNames.push(s);
      wb.Sheets[s] = sheetContent;
    });
  }

  download = () => {
    XLSX.writeFile(this.book, 'out.xlsx')
  }
}