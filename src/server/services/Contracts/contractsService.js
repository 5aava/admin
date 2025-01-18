import { getItem, getItems, createItems, updateItems, deleteItems} from '../crudService';
import { Contracts, Contractors, Tracks, Licensors } 
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
    const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`

    const [track] = await getItem(Tracks, c.trackId);
    const [licensor] = await getItem(Licensors, c.licensorId);

    const moderated = c.moderated ? 'Да' : 'Нет';

    data.push({
      id: c.id,
      sku: c.sku,
      contractor: contractor,
      track: track.name,
      licensor: licensor.name,
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
  const data = await createItems(Contracts, values);

  if(data.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }

  return data;
}


export async function updateContract (id, values) {
  const contract = await updateItems(Contracts, values, id);

  if(track.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }
  
  /* if([track] == 1){
    const [contractor] = await getItem(Contractors, values.contractorId);
    
    return {
      id: id,
      name: values.name,
      nickname: contractor.nickname,
      firstname: contractor.firstname,
      lastname: contractor.lastname,
      patronymic: contractor.patronymic,
    }
  } */

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
