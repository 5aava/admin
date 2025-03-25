import { getItem, getItems, createItems, createBulkItems, 
  updateItems, deleteItems} from '../crudService';
import { Royalties, RoyaltiesCtrs, RoyaltiesTrks, Incomes, Contracts, 
  ContractsCtrs, Contractors, Tracks, Reports} from '../../database/models/index';

import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";


export async function getRoyalty (id) {
  dayjs.extend(customParseFormat);
  const response = {};

  const [data] = await getItem(Royalties, id);
  const date = dayjs(data.createdAt).format('DD.MM.YYYY HH:mm');
  const [cr] = await getItem(Contractors, data.contractorId);
  const contractorName = `${cr.lastname} ${cr.firstname} ${cr.patronymic} (${cr.nickname})`;

  response.id = data.id;
  response.contractor = contractorName;
  response.date = date;

  response.tracks = [];
  const trks = await getItems(RoyaltiesTrks, {royaltyId: id});

  for(const trk of trks){

    const dopCtrs = await getItems(RoyaltiesCtrs, {royaltyId: id, trackId: trk.trackId});
    const dopContractors = [];

    for(const dopCtr of dopCtrs){

      const [dcr] = await getItem(Contractors, dopCtr.dopContractorId);
      const dcrName = `${dcr.lastname} ${dcr.firstname} ${dcr.patronymic} (${dcr.nickname})`;

      const dopContractor = {
        // id: dopCtr.id,
        // royaltyId: dopCtr.royaltyId,
        // trackId: dopCtr.trackId,
        // dopContractorId: dopCtr.dopContractorId,
        dopContractorName: dcrName,
        percent: dopCtr.percent,
        type: dopCtr.type,
        year: dopCtr.year,
        q1: dopCtr.q1,
        q2: dopCtr.q2,
        q3: dopCtr.q3,
        q4: dopCtr.q4,
        total: dopCtr.total,
      };

      dopContractors.push(dopContractor);
    }

    const [tr] = await getItem(Tracks, trk.trackId);
    const [ct] = await getItem(Contracts, trk.contractId);

    const trackTotal = {
      totalValByYears: trk.totalValByYears,
      valMinusUsn: trk.valMinusUsn,
      valForGaz: trk.valForGaz,
      valForContractors: trk.valForContractors,
    };

    const track = {
      // id: trk.id,
      // royaltyId: trk.royaltyId,
      // contractorId: trk.contractorId,
      // trackId: trk.trackId,
      // contractId: trk.contractId,
      contrackSku: ct.sku,
      trackName: tr.name,
      usnTax: trk.usnTax,
      /* totalValByYears: trk.totalValByYears,
      valMinusUsn: trk.valMinusUsn,
      valForGaz: trk.valForGaz,
      valForContractors: trk.valForContractors, */
      dopContractors: dopContractors,
      trackTotal: trackTotal
    }

    response.tracks.push(track);
  }

  response.total = {
    totalValByYears: data.totalValByYears,
    valMinusUsn: data.valMinusUsn,
    valForGaz: data.valForGaz,
    valForContractors: data.valForContractors,
  };

  return response;
}

export async function getRoyalties () {
  dayjs.extend(customParseFormat);

  const cs = await getItems(Royalties);

  const data = [];
  for(const c of cs){
    const [ctr] = await getItem(Contractors, c.contractorId);
    const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;

    const date = dayjs(c.createdAt).format('DD.MM.YYYY HH:mm');

    data.push({
      id: c.id,
      contractor: contractor,
      contractorId: c.contractorId,
      date: date,
      totalValByYears: c.totalValByYears,
      valMinusUsn: c.valMinusUsn,
      valForGaz: c.valForGaz,
      valForContractors: c.valForContractors,
    });
  }

  return data;
}


export async function createRoyalty (values) {
  dayjs.extend(customParseFormat);

  const response = {}
  const bulkValues = [];
  const totalRoyaltyUpValues = {      
    totalValByYears: 0,
    valForGaz: 0,
    valMinusUsn: 0,
    valForContractors: 0,
  };

  // calculate
  const contractorId = values.contractorId;
  const tracks = getRequestObj(values.tracks);

  const royaltyDBItem = await createItems(Royalties, { contractorId: contractorId });

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
          sku: contract.sku,
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
      royaltyId: royaltyDBItem.id,
      contractorId: contractorId,
      trackId: trackId,
      contractId: contractId,
      usnTax: usnTax,
    }
    const trackDBItem = await createItems(RoyaltiesTrks, values);
    if(!trackDBItem.id) continue;

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

          // считаем роялти для исполнителей в 70%... тоесть отнимаем 30% для ГАЗ
          const qvalMinusUsnForContractors = +(qvalMinusUsn * 0.7).toFixed(2);

          // считаем роялти Исполнителя согласно проценту
          q[quarter] = +(qvalMinusUsnForContractors * dopContractor.percent * 0.01).toFixed(2);
        }
        const q1 = +q[1] || 0;
        const q2 = +q[2] || 0;
        const q3 = +q[3] || 0;
        const q4 = +q[4] || 0;
        const total = q1 + q2 + q3 + q4

        const qvalue = {
          royaltyId: royaltyDBItem.id,
          trackId: trackId,
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
      const valMinusUsn = usnTax ? 
        +(valByYears - (valByYears * (usnTax * 0.01))).toFixed(2) :
        valByYears;
      const valForGaz = +(valMinusUsn * 0.3).toFixed(2);
      const valForContractors = +(valMinusUsn - valForGaz).toFixed(2);

      upValues.totalValByYears = valByYears;
      upValues.valMinusUsn = valMinusUsn;
      upValues.valForGaz = valForGaz;
      upValues.valForContractors = valForContractors;

    // конец dopContractors
    }
    
    totalRoyaltyUpValues.totalValByYears += +(upValues.totalValByYears).toFixed(2);
    totalRoyaltyUpValues.valMinusUsn += +(upValues.valMinusUsn).toFixed(2);
    totalRoyaltyUpValues.valForGaz += +(upValues.valForGaz).toFixed(2);
    totalRoyaltyUpValues.valForContractors += +(upValues.valForContractors).toFixed(2);

    await updateItems(RoyaltiesTrks, upValues, trackDBItem.id);

    await createBulkItems(RoyaltiesCtrs, bulkValues);

    // empty arrays
    upValues.length = 0;
    bulkValues.length = 0;

  // конец треков
  }

  // добавляем в общую таблицу
  console.log(totalRoyaltyUpValues);
  await updateItems(Royalties, totalRoyaltyUpValues, royaltyDBItem.id);

  // формируем ответ
  const [cr] = await getItem(Contractors, contractorId);
  const contractorName = `${cr.lastname} ${cr.firstname} ${cr.patronymic} (${cr.nickname})`;

  const date = dayjs(royaltyDBItem.createdAt).format('DD.MM.YYYY HH:mm');

  response.id = royaltyDBItem.id;
  response.contractor = contractorName;
  response.date = date;
  response.totalValByYears = +(totalRoyaltyUpValues.totalValByYears).toFixed(2);
  response.valMinusUsn = +(totalRoyaltyUpValues.valMinusUsn).toFixed(2);
  response.valForGaz = +(totalRoyaltyUpValues.valForGaz).toFixed(2);
  response.valForContractors = +(totalRoyaltyUpValues.valForContractors).toFixed(2);

  return response;
}



export async function deleteRoyalty (id) {
  const data = {};

  const cstrs = await getItems(RoyaltiesCtrs, {royaltyId: id});
  const trks = await getItems(RoyaltiesTrks, {royaltyId: id});
  const rpts = await getItems(Reports, {royaltyId: id});

  for(const cstr of cstrs){
    await deleteItems(RoyaltiesCtrs, cstr.id);
  };

  for(const trk of trks){
    await deleteItems(RoyaltiesTrks, trk.id);
  };

  for(const rpt of rpts){
    await deleteItems(Reports, rpt.id);
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
