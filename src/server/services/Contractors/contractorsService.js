import { getItem, getItems, createItems, updateItems, deleteItems} from '../crudService';
import { Contractors } from '../../database/models/index';


export async function getContractor (id) {
  const data = await getItem(Contractors, id)
  return data;
}


export async function getContractors () {
  const data = await getItems(Contractors)
  return data;
}


export async function createContractor (values) {
  const data = await createItems(Contractors, values);

  if(data.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }

  return data;
}


export async function updateContractor (id, values) {
  const data = await updateItems(Contractors, values, id);

  if(data.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }
  
  if([data] == 1){
    return {
      id: id,
      nickname: values.nickname,
      firstname: values.firstname, 
      lastname: values.lastname, 
      patronymic: values.patronymic, 
    }
  }

  return false;
}


export async function deleteContractor (id) {
  const data = {}

  const isDeleted = await deleteItems(Contractors, id);

  if(isDeleted){
    data.id = id;
    data.isDeleted = isDeleted;
  }
  
  return data;
}
