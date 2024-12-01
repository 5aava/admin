import { getItem, getItems, createItems, updateItems, deleteItems} from '../crudService';
import { Users } from '../../database/models/index';
import bcrypt from "bcrypt";


export async function getUser (userId) {
  const data = await getItem(Users, userId)
  return data;
}


export async function getUsers () {
  const data = await getItems(Users)
  return data;
}


export async function createUser (values) {
  // bcrypt password
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(values.password, salt);
  values.password = hash;

  const data = await createItems(Users, values);

  if(data.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }

  return data;
}


export async function updateUser (userId, values) {
  const data = {}

  const [user] = await updateItems(Users, values, userId);
  if(user){
    data.id = userId;
    data.name = values.name;
    data.email = values.email;
    data.role = values.role;
  }

  return data;
}


export async function deleteUser (userId) {
  const data = {}

  const isDeleted = await deleteItems(Users, userId);

  if(isDeleted){
    data.id = userId;
    data.isDeleted = isDeleted;
  }
  
  return data;
}
