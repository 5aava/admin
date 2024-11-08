import config from '../../config/config.server.js';


export function test (req, res) {
  /*
    #swagger.tags = ['Common']
    #swagger.summary = 'CHeck if private route is work correctly'

    #swagger.security = [{
      "apiKeyAuth": []
    }]

    #swagger.responses[200] = {
      content: {
        "application/json": {
          schema:{
            $ref: "#/components/schemas/response"
          }
        }
      }
    }

    #swagger.responses[403] = {
      content: {
        "application/json": {
          schema:{
            $ref: "#/components/schemas/response"
          }
        }
      }
    }

  */
  config.sendOk(res, 'check private pong');
}
