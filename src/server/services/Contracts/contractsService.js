import { getItem, getItems, createItems, createBulkItems, updateItems, deleteItems} from '../crudService';
import { Contracts, Contractors, ContractsCtrs, Tracks, Licensors } 
  from '../../database/models/index';

import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

export async function getContract (id) {
  const data = await getItem(Contracts, id);
  return data;
}


export async function getContracts (isModerated = false) {
  dayjs.extend(customParseFormat);

  console.log('isModerated 2', isModerated)
  const where = {};
  if(isModerated){
    where.moderated = 1;
  };

  console.log(where)

  const cs = await getItems(Contracts, where);

  const data = [];
  for(const c of cs){
    const [ctr] = await getItem(Contractors, c.contractorId);
    const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;

    const [track] = await getItem(Tracks, c.trackId);
    const [licensor] = await getItem(Licensors, c.licensorId);

    const cstrs = await getItems(ContractsCtrs, {contractId: c.id});
    // console.log(cstrs);

    let authors = '';
    const dopContractors = [];

    for(const cstr of cstrs){
      // console.log(cstr);
      const [ctr] = await getItem(Contractors, cstr.contractorId);
      // console.log(ctr);

      const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;
      authors += `${cstr.type} ${cstr.percent}% - ${contractor} \n`;
      dopContractors.push({
        id: cstr.contractorId,
        name: contractor,
        type: cstr.type,
        tax: cstr.percent
      })
    };


    // console.log(c.date); // 2025-01-15T06:00:00.000Z
    // const date = dayjs(c.date).format('DD.MM.YYYY');

    data.push({
      id: c.id,
      sku: c.sku,
      contractor: contractor,
      contractorId: c.contractorId,
      track: track.name,
      trackId: c.trackId,
      licensor: licensor.name,
      licensorId: licensor.id,
      authors: authors,
      dopContractors: dopContractors,
      date: c.date, // date
      tax: c.tax,
      isrc: c.isrc,
      upc: c.upc,
      link: c.link,
      file: c.file,
      moderated: c.moderated
    })
  }

  return data;
}


export async function createContract (values) {
  const contract = await createItems(Contracts, values);
  const ctrsValues = values.contractors.map(c => {
    return {
      contractId: contract.id,
      contractorId: c.id,
      type: c.type,
      percent: c.tax,
    }
  })

  const ctrs = await createBulkItems(ContractsCtrs, ctrsValues);

  if(contract.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }

  const data = [];

  const [ctr] = await getItem(Contractors, contract.contractorId);
  const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;

  const [track] = await getItem(Tracks, contract.trackId);
  const [licensor] = await getItem(Licensors, contract.licensorId);

  const cstrs = await getItems(ContractsCtrs, {contractId: contract.id});
  // console.log(cstrs);

  let authors = '';
  const dopContractors = [];

  for(const cstr of cstrs){
    const [ctr] = await getItem(Contractors, cstr.contractorId);
    const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;
    authors += `${cstr.type} ${cstr.percent}% - ${contractor} \n`;
    dopContractors.push({
      id: cstr.id,
      name: contractor,
      type: cstr.type,
      tax: cstr.percent
    })
  };

  data.push({
    id: contract.id,
    sku: contract.sku,
    contractor: contractor,
    track: track.name,
    licensor: licensor.name,
    date: contract.date,
    authors: authors,
    dopContractors: dopContractors,
    tax: contract.tax,
    isrc: contract.isrc,
    upc: contract.upc,
    link: contract.link,
    file: 'filename',
    moderated: 0,
  });

  return data[0];
}


export async function updateContract (id, values) {
  const contract = await updateItems(Contracts, values, id);

  if(contract.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }
  
  if([contract] == 1){
    const [ctr] = await getItem(Contractors, values.contractorId);
    const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;
  
    const [track] = await getItem(Tracks, values.trackId);
    const [licensor] = await getItem(Licensors, values.licensorId);

    // const date = dayjs(values.date).format('DD.MM.YYYY');

    // delete dop contractors 
    const cstrs = await getItems(ContractsCtrs, {contractId: id});
    for(const c of cstrs){
      await deleteItems(ContractsCtrs, c.id);
    };

    // update dop contractors
    // console.log(values)
    let authors = '';
    const ctrsValues = values.contractors.map(c => {
      authors += `${c.type} ${c.tax}% - ${c.name} \n`;
      return {
        contractId: id,
        contractorId: c.id,
        type: c.type,
        percent: c.tax,
      }
    })

    console.log(ctrsValues);
    await createBulkItems(ContractsCtrs, ctrsValues);

    return {
      id: id,
      sku: values.sku,
      contractorId: values.contractorId,
      trackId: values.trackId,
      licensorId: values.licensorId,
      contractor: contractor,
      track: track.name,
      licensor: licensor.name,
      date: values.date, // date
      tax: values.tax,
      isrc: values.isrc,
      upc: values.upc,
      link: values.link,
      authors: authors,
      moderated: values.moderated,
    }
  }

  return false;
}


export async function deleteContract (id) {
  const data = {}

  const cstrs = await getItems(ContractsCtrs, {contractId: id});

  for(const cstr of cstrs){
    await deleteItems(ContractsCtrs, cstr.id);
  };

  const isDeleted = await deleteItems(Contracts, id);

  if(isDeleted){
    data.id = id;
    data.isDeleted = isDeleted;
  }
  
  return data;
}
