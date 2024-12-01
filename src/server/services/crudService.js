
export async function getItem (Model, id) {
  return await Model.findAll({ where: { id: id} });
}


export async function getItems (Model) {
  return await Model.findAll();
}


export async function createItems (Model, values) {
  return await Model.create(values).catch(e => e);
}


export async function updateItems (Model, values, userId) {
  return await Model.update({ ...values }, { where: { id: userId } });
}


export async function deleteItems (Model, id) {
  return await Model.destroy({ where: { id } });
}
