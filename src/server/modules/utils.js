
export function isEmpty (obj) {
  for (let key in obj) {
    return false;
  }
  return true;
}

export function isNumber (str) {
  return /^\d+$/.test(str);
}

export function validURL (str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

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
