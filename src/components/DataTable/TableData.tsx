import {DetailsRendrer,MessageRendrer,ImageRendrer}  from './cellRenderors';

const row = {
    id: 1,
    name: "Test",
    symbol: "Test",
    type: "type",
    tokens: ["T1,T2"],
    depositsFullName: "depositsFullName",
    depositsSymbol: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    wrapperSymbol: "string",
    depositsAPR: 1,
    depositsTVL: 2,
    depositsLP: 3,
    depositsFlag: true,
    depositsDepositAsset: [4,5],
    depositsReRouteAsset: 6,
    // emissionsFullName: "string",
    // emissionsSymbol: "string",
    // emissionsTCE: 7,
    // emissionsAPR: 8,
    // emissionsDeposit: 9,
    // emissionsCollected: 10,
    // emissionsBalance: 11,
    // emissionsAllocated: 12,
    // emissionLastSignalSymbol: "string",
    // emissionList?: EmissionListData[],
    fieldFlag:1,
    isNFT:true
  }

export const testData = [
    row,
  ]

  export const testColDefs = [
    {
      colHeader: "Name",
      rendrer: ImageRendrer,
      dataIndex:"name",
    },
    {
      colHeader: "Detail",
      rendrer: DetailsRendrer,
      dataIndex:"depositsAPR",
    },
    {
      colHeader: "Message",
      rendrer: MessageRendrer,
      dataIndex:"",
    },
  ]