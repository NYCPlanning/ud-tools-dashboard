import XLSX from 'xlsx';
import _ from 'lodash';
import { currentISODate } from './format';

export default class RWCDSWorkbook {
  constructor(state, rwcds) {
    this.rwcds = rwcds;
    this.state = state;
    this.book = XLSX.utils.book_new();
    this.initialize();
  }

  initialize = () => {
    let wb = this.book;
    const rwcds = this.rwcds;
    const sites = this.state.Sites;
    const lots = this.state.LotTable;

    sheetNames.forEach((s) => {
      let sheetContent = {}
      switch (s) {
        case 'sites_existing':
          sheetContent = this.assignFromRWCDS(rwcds, 'Existing');
          break;
        case 'sites_no-action':
          sheetContent = this.assignFromRWCDS(rwcds, 'No_Action');
          break;  
        case 'sites_with-action':
          sheetContent = this.assignFromRWCDS(rwcds, 'With_Action');
          break;
        case 'sites_increment':
          // for increment, define a formula that diffs between no action and with action
          // use https://stackoverflow.com/questions/29520596/how-to-set-formula-for-cell-data-for-export-to-xlsx-sheetjs-js-xlsx-https
          // let sheet = wb.Sheets[s];
          // const copyFormula = {f: `IF(ISBLANK(${sheetNames[0]}!A1),"",${sheetNames[0]}!A1)`};
          // const copyOrigin = XLSX.utils.encode_cell({r:0, c:0});
          // const copyRange = { s: { r: 0, c: 0}, e: { c: 6}};
          // sheet[copyOrigin] = copyFormula;
          // sheet['!ref'] = XLSX.utils.encode_range(copyRange);
          // const sum = {f: 'A2+A3'};
          // sheetContent = XLSX.utils.json_to_sheet({});
          break;
        case 'sites_lots':
          let sitesLots = sites.map((s) => (
              {
                'Site ID': s.ID,
                'Lot BBLs': s.LotIDs.join(', '),
                'Address': lots.filter((l) => s.LotIDs.includes(l.ID)).map((l) => l.Address)[0]
              }
            )
          )
          sheetContent = XLSX.utils.json_to_sheet(sitesLots)
          break;
        case 'lots':
          let lotsRemapped = lots.map((l) => {
            let rm = {};
            // assign from lot field mapping
            Object.entries(lotFieldMapping)
              .forEach(([k, v]) => {
                rm[k] = _.get(l, v)
              }
            );
            // assign siteid field
            rm['Site ID'] = sites.filter((s) => s.LotIDs.includes(l.ID))
              .map((s) => (s.ID))
              .join(', ')

            return rm;
          });
          sheetContent = XLSX.utils.json_to_sheet(lotsRemapped)
          break;
        default:
          console.log('error');
          break;
          //sheetContent = XLSX.utils.json_to_sheet({});
      }
      wb.SheetNames.push(s);
      wb.Sheets[s] = sheetContent;
    });
  }

  // checks to make sure a scenario exists in a RWCDS object and assigns remapped sites
  assignFromRWCDS = (rwcds, key) => {
    if (rwcds && rwcds[key]) {
      return XLSX.utils.json_to_sheet(
        this.remapSites(
          rwcds[key]
        )
      )
    } else {
      return null;
    }
  };

  // returns a restructured list of sites using the mapping defined below
  remapSites = (sites) => (
    sites.map((s) => {
      let rm = {};
      Object.entries(siteFieldMapping)
        .forEach(([k, v]) => ([
          rm[k] = _.get(s, v)
        ])
      );
      return rm;
    })
  );

  // attempt to download/save the current workbook
  download = () => {
    const fileName = `${currentISODate()}.xlsx`
    XLSX.writeFile(this.book, fileName)
  };
}

const sheetNames = ['sites_existing', 'sites_no-action', 'sites_with-action', 'sites_increment', 'sites_lots', 'lots']

const siteFieldMapping = {
  'Site ID': 'ID',
  'Lot Count': 'Counts.Lots',
  'Zoning Lot Area': 'ZoningLot.Area',
  'Existing Zoning': 'ZoningLot.ZonesExisting',
  'Proposed Zoning': 'ZoningLot.ZonesScenario',
  'Group': 'Group',
  'Note': 'Note',
  'Residential ZFA': 'ZFA.Residential',
  'Residential GFA': 'GFA.Residential',
  'Medical Office ZFA': 'ZFA.MedicalOffice',
  'Medical Office GFA': 'GFA.MedicalOffice',
  'School ZFA': 'ZFA.School',
  'School GFA': 'GFA.School',
  'House of Worship ZFA': 'ZFA.HouseOfWorship',
  'House of Worship GFA': 'GFA.HouseOfWorship',
  'Community Facility Other ZFA': 'ZFA.CommunityFacilityOther',
  'Community Facility Other GFA': 'GFA.CommunityFacilityOther',
  'Community Facility ZFA': 'ZFA.CommunityFacility',
  'Community Facility GFA': 'GFA.CommunityFacility',
  'Local Retail ZFA': 'ZFA.LocalRetail',
  'Local Retail GFA': 'GFA.LocalRetail',
  'Destination Retail ZFA': 'ZFA.DestinationRetail',
  'Destination Retail GFA': 'GFA.DestinationRetail',
  'Supermarket ZFA': 'ZFA.Supermarket',
  'Supermarket GFA': 'GFA.Supermarket',
  'Office ZFA': 'ZFA.Office',
  'Office GFA': 'GFA.Office',
  'Life Sciences ZFA': 'ZFA.LifeSciences',
  'Life Sciences GFA': 'GFA.LifeSciences',
  'Commercial Other ZFA': 'ZFA.CommercialOther',
  'Commercial Other GFA': 'GFA.CommercialOther',
  'Hotel ZFA': 'ZFA.Hotel',
  'Hotel GFA': 'GFA.Hotel',
  'Commercial ZFA': 'ZFA.Commercial',
  'Commercial GFA': 'GFA.Commercial',
  'Warehouse ZFA': 'ZFA.Warehouse',
  'Warehouse GFA': 'GFA.Warehouse',
  'Self Storage ZFA': 'ZFA.SelfStorage',
  'Self Storage GFA': 'GFA.SelfStorage',
  'Auto Related ZFA': 'ZFA.AutoRelated',
  'Auto Related GFA': 'GFA.AutoRelated',
  'Industrial ZFA': 'ZFA.Industrial',
  'Industrial GFA': 'GFA.Industrial',
  'Manufacturing Other ZFA': 'ZFA.ManufacturingOther',
  'Manufacturing Other GFA': 'GFA.ManufacturingOther',
  'Manufacturing ZFA': 'ZFA.Manufacturing',
  'Manufacturing GFA': 'GFA.Manufacturing',
  'Total ZFA': 'ZFA.Total',
  'Total GFA': 'GFA.Total',
  'Residential FAR': 'UtilizedFAR.Residential',
  'Community Facility FAR': 'UtilizedFAR.CommunityFacility',
  'Commercial FAR': 'UtilizedFAR.Commercial',
  'Manufacturing FAR': 'UtilizedFAR.Manufacturing',
  'Total FAR': 'UtilizedFAR.Total',
  'Total Height': 'Dims.HeightFromBasePlane',
  'Hotel Rooms': 'Counts.HotelRooms',
  'Residential Units': 'Counts.ResidentialUnits',
  'Residential Units @ 20% Affordable': 'Counts.ResidentialUnitsAffordable20',
  'Residential Units @ 25% Affordable': 'Counts.ResidentialUnitsAffordable25',
  'Residential Units @ 30% Affordable': 'Counts.ResidentialUnitsAffordable30',
  'Residential Parking Required': 'ParkingRequired.SpacesResidential',
  'Residential Parking Required @ 25% Affordable': 'ParkingRequired.SpacesResidentialAffordable25',
  'Residential Parking Required @ 30% Affordable': 'ParkingRequired.SpacesResidentialAffordable30',
  'Community Facility Parking Required': 'ParkingRequired.SpacesCommunityFacility',
  'Commercial Parking Required': 'ParkingRequired.SpacesCommercial',
  'Manufacturing Parking Required': 'ParkingRequired.SpacesManufacturing',
  'Total Parking Required': 'ParkingRequired.SpacesTotal',
  'Parking Required GFA': 'ParkingRequired.Area',
  'Parking Provided GFA': 'GFA.Parking',
  'Loading Berths Required': 'LoadingRequired.SpacesTotal',
  'Loading Required GFA': 'LoadingRequired.Area',
  'Loading Provided GFA': 'GFA.Loading',
  'Total Bicycle Parking Required': 'BikeParkingRequired.SpacesTotal',
  'Bicycle Parking Required GFA': 'BikeParkingRequired.Area',
  'Bicycle Parking Provided GFA': 'GFA.BikeParking'
}

const lotFieldMapping = {
  'BBL': 'ID',
  'Site ID': 'None',
  'Block': 'TaxBlock',
  'Lot': 'TaxLot',
  'Address': 'Address',
  'Owner Name': 'OwnerName',
  'Building Class': 'BldgClass',
  'Land Use Code': 'LandUseCode',
  'Landmark': 'Landmark',
  'Zones Existing': 'ZonesExisting',
  'Lot Area': 'TaxLotArea',
  'Residential GFA': 'Residential',
  'Retail GFA': 'LocalRetail',
  'Office GFA': 'Office',
  'Commercial Other GFA': 'CommercialOther',
  'Commercial GFA': 'Commercial',
  'Warehouse GFA': 'Warehouse',
  'Industrial GFA': 'Industrial',
  'Manufacturing GFA': 'Manufacturing',
  'Total GFA': 'Total',
  'Residential Units': 'ResidentialUnits',
}