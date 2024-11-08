import config from '../../config/config.server.js';


export function alive (req, res) {
  /*
  #swagger.tags = ['Common']
  #swagger.summary = 'CHeck if server is alive'

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

  config.sendOk(res, 'I am alive');
}

