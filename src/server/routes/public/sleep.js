import config from '../../config/config.server.js';


export async function sleep (req, res) {
  /*
  #swagger.tags = ['Common']
  #swagger.summary = 'CHeck for sleep'

  #swagger.responses[200] = {
    content: {
      "application/json": {
        schema:{
          $ref: "#/components/schemas/response"
        }
      }
    }
  }

  */
  await new Promise(r => setTimeout(r, 5 * 60 * 1000));

  config.sendOk(res, 'After sleeping');
}


