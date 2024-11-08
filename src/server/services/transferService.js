import { Contracts } from '../database/models/index.js';
import { isEthereumAddress} from 'validator';
import getAnyCollectionContract from '../modules/getAnyCollectionContract.js';
import { isNumber } from '../modules/utils.js';
import sendTRX from './Transactions/asyncModules.js';


export default async function transferService (
  nftContract, tokenId, newOwner, time, confirmations,
) {
  // sanitize
  if (!nftContract) { return {error: 403, data: 'Error: NFT contract is empty'}; }
  if (!newOwner) { return {error: 403, data: 'Error: New Owner contract is empty'}; }
  if (!isNumber(tokenId)) { return {error: 403, data: 'Error: Token Id is empty'}; }

  if (!isEthereumAddress(nftContract)) {
    return {
      error: 403,
      data: 'Error: Incorrect NFT contract Ethereum address'};
  }
  if (!isEthereumAddress(newOwner)) {
    return {
      error: 403,
      data: 'Error: Incorrect newOwner Ethereum address'};
  }
  if (isNaN(+tokenId)) { return {error: 403, data: 'Error: Incorrect TokenId'}; }

  // get addresses
  const contractData = await Contracts.findOne({
    where: {
      type: 'marketplace',
    },
  }).then(contract => contract);

  const marketAdminAddress = contractData.admin;

  const CollectionContract = await getAnyCollectionContract(nftContract, true);
  if (CollectionContract.error) {
    return {error: 404, data: CollectionContract.data};
  }

  const ownerOf = await CollectionContract.ownerOf(tokenId);
  if (ownerOf != marketAdminAddress) {
    const isApproved = await CollectionContract.isApprovedForAll(
      ownerOf, marketAdminAddress,
    );
    if (!isApproved) {
      return {
        error: 200, data: 'Error: Token is NOT Approved to Admin address',
      };
    }
  }

  console.log('marketAdminAddress ', marketAdminAddress);
  console.log('nftContract ', nftContract);
  console.log('tokenId ', tokenId);
  console.log('tokenOwner: ', ownerOf);

  const result = await sendTRX(
    CollectionContract, 'transferFrom',
    [ownerOf, newOwner, tokenId],
  );


  if (result.code === 1) {
    result.details.from = ownerOf;
    result.details.to = newOwner;
  }

  return {error: false, data: result};

}
