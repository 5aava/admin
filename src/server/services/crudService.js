
export async function getItem (Model, id) {
  return await Model.findAll({ where: { id: id} });
}


export async function getItems (Model, where) {
  return await Model.findAll({
    where: where,
    attributes: {
      exclude: ['password']
    }
  }).catch(e => e);
}


export async function createItems (Model, values) {
  return await Model.create(values)
    .catch(e => e);
}

export async function createBulkItems (Model, values) {
  return await Model.bulkCreate(values, {returning: true})
    .catch(e => e);
}

export async function updateItems (Model, values, userId) {
  return await Model.update({ ...values }, { where: { id: userId } })
    .catch(e => e);
}


export async function deleteItems (Model, id) {
  return await Model.destroy({ where: { id } })
    .catch(e => e);
}
