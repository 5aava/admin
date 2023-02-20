import fetch from 'node-fetch';
import slugify from 'slugify';


// update or insert
export async function upsert (Model, values, condition) {
  return await Model
    .findOne({ where: condition })
    .then(function (obj) {
      // update
      if (obj) {return obj.update(values);}
      // insert
      return Model.create(values);
    }).catch(err => console.log(err));
}


export function getSlug (name) {
  return slugify (name, {
    replacement: '_',   // replace spaces with replacement character, defaults to `-`
    remove: undefined,  // remove characters that match regex, defaults to `undefined`
    lower: true,        // convert to lower case, defaults to `false`
    strict: true,       // strip special characters except replacement, defaults to `false`
    locale: 'en',       // language code of the locale to use
  });
}
