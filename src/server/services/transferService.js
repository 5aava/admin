import { Contracts } from '../database/models/index.js';
import { isEthereumAddress} from 'validator';
import getAnyCollectionContract from '../modules/getAnyCollectionContract.js';
import { isNumber } from '../modules/utils.js';
import sendTRX from './Transactions/asyncModules.js';


export default async function transferService () {
 

  return {error: false, data: 'result'};

}
