import { getItem, getItems, createItems, updateItems, deleteItems} from '../crudService';
import { Payments, Contractors, Tracks } from '../../database/models/index';


export async function getPayment (id) {
  const data = await getItem(Payments, id)
  return data;
}


export async function getPayments () {
  const payments = await getItems(Payments)
  const data = [];

  for(const payment of payments){
    const [ctr] = await getItem(Contractors, payment.contractorId);
    const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;
    const [track] = await getItem(Tracks, payment.trackId);
  
    data.push({
      id: payment.id,
      contractor: contractor,
      track: track.name,
      year: payment.year,
      q1: payment.q1,
      q1p: payment.q1p,
      q2: payment.q2,
      q2p: payment.q2p,
      q3: payment.q3,
      q3p: payment.q3p,
      q4: payment.q4,
      q4p: payment.q4p,
      total: payment.total,
      comment: payment.comment,
    });
  }

  return data;
}


export async function createPayment (values) {
  const payments = await createItems(Payments, values);

  if(payments.name == 'SequelizeUniqueConstraintError'){
    return 'dublicate';
  }

  const data = [];

  const [ctr] = await getItem(Contractors, values.contractorId);
  const contractor = `${ctr.lastname} ${ctr.firstname} ${ctr.patronymic} (${ctr.nickname})`;
  const [track] = await getItem(Tracks, values.trackId);

  data.push({
    id: payments.id,
    contractor: contractor,
    track: track.name,
    year: payments.year,
    q1: payments.q1,
    q1p: payments.q1p,
    q2: payments.q2,
    q2p: payments.q2p,
    q3: payments.q3,
    q3p: payments.q3p,
    q4: payments.q4,
    q4p: payments.q4p,
    total: payments.total,
    comment: payments.comment,
  });

  return data[0];
}


export async function updatePayment (id, values) {
  const data = await updateItems(Payments, values, id);

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
      q1p: values.q1p, 
      q2: values.q2,
      q2p: values.q2p, 
      q3: values.q3,
      q3p: values.q3p,
      q4: values.q4,
      q4p: values.q4p,
      total: values.total, 
      comment: values.comment,
    }
  }

  return false;
}


export async function deletePayment (id) {
  const data = {}

  const isDeleted = await deleteItems(Payments, id);

  if(isDeleted){
    data.id = id;
    data.isDeleted = isDeleted;
  }
  
  return data;
}
