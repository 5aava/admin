import { getItem, getItems, createItems, updateItems, deleteItems} from '../crudService';
import { Licensors } from '../../database/models/index';


export async function getLicensor (id) {
  const data = await getItem(Licensors, id)
  return data;
}


export async function getLicensors () {
  const data = await getItems(Licensors)
  return data;
}


export async function createLicensor (values) {
  const data = await createItems(Licensors, values);

  if(data.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }

  return data;
}


export async function updateLicensor (id, values) {
  const data = await updateItems(Licensors, values, id);

  if(data.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }
  
  if([data] == 1){
    return {
      id: id,
      name: values.name,
    }
  }

  return false;
}


export async function deleteLicensor (id) {
  const data = {}

  const isDeleted = await deleteItems(Licensors, id);

  if(isDeleted){
    data.id = id;
    data.isDeleted = isDeleted;
  }
  
  return data;
}
