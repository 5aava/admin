import { getItem, getItems, createItems, createBulkItems, updateItems, deleteItems} from '../crudService';
import { Contracts, Contractors, ContractsCtrs, Tracks, Licensors } 
  from '../../database/models/index';


export async function getContract (id) {
  const data = await getItem(Contracts, id);
  return data;
}


export async function getContracts () {
  const cs = await getItems(Contracts);

  const data = [];
  for(const c of cs){
    const [ctr] = await getItem(Contractors, c.contractorId);
    const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;

    const [track] = await getItem(Tracks, c.trackId);
    const [licensor] = await getItem(Licensors, c.licensorId);

    const moderated = c.moderated ? 'Да' : 'Нет';

    const cstrs = await getItems(ContractsCtrs, {contractId: c.id});
    // console.log(cstrs);

    let authors = '';
    for(const cstr of cstrs){
      const [ctr] = await getItem(Contractors, cstr.contractorId);
      const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;
      authors += `${cstr.type} ${cstr.percent}% - ${contractor} \n`;
    };

    data.push({
      id: c.id,
      sku: c.sku,
      contractor: contractor,
      track: track.name,
      licensor: licensor.name,
      authors: authors,
      date: c.date,
      tax: c.tax,
      isrc: c.isrc,
      upc: c.upc,
      link: c.link,
      file: c.file,
      moderated: moderated
    })
  }

  return data;
}


export async function createContract (values) {
  console.log('!!!!!!!!! createContract');

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

  data.push({
    id: contract.id,
    sku: contract.sku,
    contractor: contractor,
    track: track.name,
    licensor: licensor.name,
    authors: '', // string
    date: contract.date,
    tax: contract.tax,
    isrc: contract.isrc,
    upc: contract.upc,
    link: contract.link,
    file: 'filename',
    moderated: 'Да'
  });

  console.log(data);

  return data[0];
}


export async function updateContract (id, values) {
  const contract = await updateItems(Contracts, values, id);

  if(contract.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }
  
  return false;
}


export async function deleteContract (id) {
  const data = {}

  const isDeleted = await deleteItems(Contracts, id);

  if(isDeleted){
    data.id = id;
    data.isDeleted = isDeleted;
  }
  
  return data;
}
