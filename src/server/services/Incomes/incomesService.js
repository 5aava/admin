import { getItem, getItems, createItems, updateItems, deleteItems} from '../crudService';
import { Incomes, Contractors, Tracks } from '../../database/models/index';


export async function getIncome (id) {
  const data = await getItem(Incomes, id)
  return data;
}


export async function getIncomes (contractorId = null, trackIdArray = []) {
  const where = {}

  console.log(trackIdArray);

  if(contractorId) {  where.contractorId = contractorId};
  if(trackIdArray.length) { where.trackId = trackIdArray };

  const incomes = await getItems(Incomes, where);
  const data = [];

  for(const income of incomes){
    const [ctr] = await getItem(Contractors, income.contractorId);
    const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;
    const [track] = await getItem(Tracks, income.trackId);
  
    data.push({
      id: income.id,
      contractor: contractor,
      contractorId: income.contractorId,
      track: track.name,
      trackId: income.trackId,
      year: income.year,
      q1: income.q1,
      q2: income.q2,
      q3: income.q3,
      q4: income.q4,
      total: income.total,
      comment: income.comment,
    });
  }

  return data;
}


export async function createIncome (values) {
  const incomes = await createItems(Incomes, values);

  if(incomes.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }

  const data = [];

  const [ctr] = await getItem(Contractors, values.contractorId);
  const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;
  const [track] = await getItem(Tracks, values.trackId);

  data.push({
    id: incomes.id,
    contractor: contractor,
    track: track.name,
    year: incomes.year,
    q1: incomes.q1,
    q2: incomes.q2,
    q3: incomes.q3,
    q4: incomes.q4,
    total: incomes.total,
    comment: incomes.comment,
  });

  return data[0];
}


export async function updateIncome (id, values) {
  const data = await updateItems(Incomes, values, id);

  if(data.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }
  
  if([data] == 1){
    return {
      id: id,
      contractorId: values.contractorId,
      trackId: values.trackId,
      year: values.year,
      q1: values.q1,
      q2: values.q2,
      q3: values.q3,
      q4: values.q4,
      total: values.total,
      comment: values.comment,
    }
  }

  return false;
}


export async function deleteIncome (id) {
  const data = {}

  const isDeleted = await deleteItems(Incomes, id);

  if(isDeleted){
    data.id = id;
    data.isDeleted = isDeleted;
  }
  
  return data;
}
