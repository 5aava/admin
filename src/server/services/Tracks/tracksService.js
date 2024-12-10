import { getItem, getItems, createItems, updateItems, deleteItems} from '../crudService';
import { Tracks, Contractors } from '../../database/models/index';


export async function getTrack (id) {
  const data = await getItem(Tracks, id);
  return data;
}


export async function getTracks () {
  const tracks = await getItems(Tracks);

  const data = [];
  for(const track of tracks){
    const [contractor] = await getItem(Contractors, track.contractorId);
    data.push({
      id: track.id,
      name: track.name,
      nickname: contractor.nickname,
      firstname: contractor.firstname,
      lastname: contractor.lastname,
      patronymic: contractor.patronymic,
    })
  }

  return data;
}


export async function createTrack (values) {
  const track = await createItems(Tracks, values);

  if(track.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }

  const data = [];
  const [contractor] = await getItem(Contractors, track.contractorId);
  data.push({
    id: track.id,
    name: track.name,
    nickname: contractor.nickname,
    firstname: contractor.firstname,
    lastname: contractor.lastname,
    patronymic: contractor.patronymic,
  });

  return data[0];
}


export async function updateTrack (id, values) {
  const track = await updateItems(Tracks, values, id);

  if(track.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }
  
  if([track] == 1){
    const [contractor] = await getItem(Contractors, values.contractorId);
    
    return {
      id: id,
      name: values.name,
      nickname: contractor.nickname,
      firstname: contractor.firstname,
      lastname: contractor.lastname,
      patronymic: contractor.patronymic,
    }
  }

  return false;
}


export async function deleteTrack (id) {
  const data = {}

  const isDeleted = await deleteItems(Tracks, id);

  if(isDeleted){
    data.id = id;
    data.isDeleted = isDeleted;
  }
  
  return data;
}
