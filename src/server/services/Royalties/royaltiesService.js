import { getItem, getItems, createItems, createBulkItems, 
  updateItems, deleteItems} from '../crudService';
import { Royalties, RoyaltiesCtrs, Incomes, Contracts, 
  ContractsCtrs, Contractors, Tracks } from '../../database/models/index';


export async function getRoyalty (id) {
  const data = await getItem(Royalties, id)
  return data;
}


export async function getRoyalties () {
  const cs = await getItems(Royalties);

  const data = [];
  for(const c of cs){
    const [ctr] = await getItem(Contractors, c.contractorId);
    const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;
    const [track] = await getItem(Tracks, c.trackId);
    const [contract] = await getItem(Contracts, c.contractId);

    data.push({
      id: c.id,
      contract: contract.sku,
      contractor: contractor,
      contractorId: c.contractorId,
      track: track.name,
      trackId: c.trackId,
      usnTax: c.usnTax,
      totalValByYears: c.totalValByYears,
      valMinusUsn: c.valMinusUsn,
      valForGaz: c.valForGaz,
      valForContractors: c.valForContractors,
    });
  }

  return data;
}


export async function createRoyalty (values) {

  const response = [];
  const bulkValues = [];

  // calculate
  const contractorId = values.contractorId;
  const tracks = getRequestObj(values.tracks);

  // идём по трекам
  for(const track of tracks){
    const trackId = track.trackId;
    const years = track.years;

    // получаем контракт
    const contract = await Contracts.findOne({
      where: {
        contractorId: contractorId,
        trackId: trackId,
      },
    }).then(contract => {
      if(contract){
        return {
          contractId: contract.id,
          tax: contract.tax
        }
      }
    }).catch(e => e);
    if(!contract) continue;

    const usnTax = contract.tax;
    const contractId = contract.contractId;

    // получаем доп исполнителей по контракту
    const dopContractors = await ContractsCtrs.findAll({
      where: {
        contractId: contractId,
      },
    }).then(ctrts => {
      if(ctrts){
        return ctrts.map(i => {
          return {
            contractorId: i.contractorId,
            percent: i.percent,
            type: i.type,
          }
        });
      }
    }).catch(e => e);

    const upValues = {};
    const values = {
      contractorId: contractorId,
      trackId: trackId,
      contractId: contractId,
      usnTax: usnTax,
    }
    const royaltyDBItem = await createItems(Royalties, values);
    if(!royaltyDBItem.id) continue;

    // идем по доп исполнителям
    for(const dopContractor of dopContractors){
      let totalValByYears = 0;

      // идем по годам
      for(const oneyear of years){
        const year = oneyear.year;
        const quarters = oneyear.quarters;

        // получаем доход по треку, году и гл. исполнителю
        const dbIncome = await Incomes.findOne({
          where: {
            contractorId: contractorId,
            trackId: trackId,
            year: year,
          },
        }).then(income => {
          if(income){
            return {
              contractorId: income.contractorId,
              trackId: income.trackId,
              q1: income.q1,
              q2: income.q2,
              q3: income.q3,
              q4: income.q4,
              total: income.total,
            }
          } 
        }).catch(e => e);
        
        if(!dbIncome) continue;
        // идем по кварталам
        const q = {};
        for(const quarter of quarters){
          // Доходы по треку по году по исполнителю по кварталу
          // q[quarter] = dbIncome[`q${quarter}`];

          // доход за квартал минус УСН
          const qvalMinusUsn = +(dbIncome[`q${quarter}`] - (dbIncome[`q${quarter}`] * (usnTax * 0.01))).toFixed(2);

          // считаем роялти Исполнителя согласно проценту
          q[quarter] = +(qvalMinusUsn * dopContractor.percent * 0.01).toFixed(2);
        }
        const q1 = +q[1] || 0;
        const q2 = +q[2] || 0;
        const q3 = +q[3] || 0;
        const q4 = +q[4] || 0;
        const total = q1 + q2 + q3 + q4

        const qvalue = {
          royaltyId: royaltyDBItem.id,
          dopContractorId: dopContractor.contractorId,
          percent: dopContractor.percent,
          type: dopContractor.type,
          year: year,
          q1: q[1],
          q2: q[2],
          q3: q[3],
          q4: q[4],
          total: total,
        }
        bulkValues.push(qvalue);

        totalValByYears = +(totalValByYears + dbIncome.total).toFixed(2);

      // конец years
      }

      // тут считаем Апдейт по всем годам
      const valByYears = +totalValByYears.toFixed(2);
      upValues.totalValByYears = valByYears;

      const valMinusUsn = usnTax ? 
        +(valByYears - (valByYears * (usnTax * 0.01))).toFixed(2) :
        valByYears;
      upValues.valMinusUsn = valMinusUsn;

      const valForGaz = +(valMinusUsn * 0.3).toFixed(2);
      upValues.valForGaz = valForGaz;

      upValues.valForContractors = +(valMinusUsn - valForGaz).toFixed(2);

    // конец dopContractors
    }

    await updateItems(Royalties, upValues, royaltyDBItem.id);
    
    const contractor = await getItem(Contractors, contractorId)

    upValues.contractor = contractor.name;
    upValues.trackId = trackId;
    upValues.contractId = contractId;
    upValues.usnTax = usnTax;
    upValues.id = royaltyDBItem.id
    response.push(upValues);

    await createBulkItems(RoyaltiesCtrs, bulkValues);

    // empty arrays
    upValues.length = 0; 
    bulkValues.length = 0;

  // конец треков
  }

  
  return response;
}



export async function deleteRoyalty (id) {
  const data = {};

  const cstrs = await getItems(RoyaltiesCtrs, {royaltyId: id});

  for(const cstr of cstrs){
    await deleteItems(RoyaltiesCtrs, cstr.id);
  };

  const isDeleted = await deleteItems(Royalties, id);

  if(isDeleted){
    data.id = id;
    data.isDeleted = isDeleted;
  }
  
  return data;
}



function getRequestObj(datas){
  // console.log(m)
  const tracks = [];

  // add tracks
  datas.forEach(i => {
    // check for double
    const result = tracks.find(o => {
      if( o?.trackId === i.trackId){
        return o;
      }
    });

    if(!result){
      tracks.push({
        trackId: i.trackId,
        years: []
      })
    }

  }) 

  // add  years
  tracks.forEach(track => {
    datas.forEach(data => {
      if(data.trackId == track.trackId){

        // check for double
        const r = track.years.find(o => {
          if( o?.year === data.year){
            return o;
          }
        });
      
        if(!r){
          track.years.push({
            year: data.year,
            quarters: []
          })
        }
      }
    })
  })

  // add quarters
  tracks.forEach(track => {
    track.years.forEach(year => {
      datas.forEach(data => {
        if(data.trackId == track.trackId && data.year == year.year){

          // check for double
          const found = year.quarters.find((e) => e === data.q);
          if(!found){
            year.quarters.push(data.q);
          }
        
        }
      })

    })
  });

  return tracks;
}
