import express from 'express';

import { test } from './ping.js';
import { blockchains } from './blockchains.js';
import { contracts } from './contracts.js';
import { transfer } from './transfer.js';

import { marketContract } from './marketplace/contract.js';
import { marketItems } from './marketplace/items.js';
import { getPurchaseStatus } from './marketplace/getPurchaseStatus.js';
import { purchase } from './marketplace/purchase.js';
import { changeOwner } from './marketplace/changeOwner.js';
import { createItem } from './marketplace/createItem.js';
import { removeItem } from './marketplace/removeItem.js';

import { collectionMint } from './collection/mint.js';
import { collectionContract } from './collection/contract.js';
import { tokenId } from './collection/tokenId.js';
import { refreshMetadata } from './collection/refreshMetadata.js';
import { deployCollection } from './collection/deploy.js';

import { updateWhitelistRoot } from './collection/updateWhitelistRoot.js';
import { getInfo } from './collection/getInfo.js';
import { verify } from './collection/verify.js';
import { isWhitelisted } from './collection/isWhitelisted.js';
import { setBaseUri } from './collection/setBaseUri.js';
import { updateMaxMerkleMint } from './collection/updateMaxMerkleMint.js';
import { updateMaxSupply } from './collection/updateMaxSupply.js';
import { updateMetadataUpdatable } from './collection/updateMetadataUpdatable.js';
import { updateIsMintingActive } from './collection/updateIsMintingActive.js';

// mini Factory
import { minifactoryMint } from './collection/miniFactory/mint.js';
import { minifactoryUpdateWhitelistRoot } from './collection/miniFactory/updateWhitelistRoot.js';

import { minifactoryIsWhitelisted } from './collection/miniFactory/isWhitelisted.js';
import { minifactoryStake } from './collection/miniFactory/stake.js';
import { minifactoryUnStake } from './collection/miniFactory/unStake.js';
import { minifactoryIsStaked } from './collection/miniFactory/isStaked.js';
import { minifactoryIsFactoryStaked } from './collection/miniFactory/isFactoryStaked.js';

import { minifactoryIsArrayStaked } from './collection/miniFactory/isArrayStaked.js';
import { minifactoryMultiStake } from './collection/miniFactory/multiStake.js';
import { minifactoryUnMultiStake } from './collection/miniFactory/unMultiStake.js';
import { minifactoryGetFactory } from './collection/miniFactory/getFactory.js';
import { minifactoryUpdateFactory } from './collection/miniFactory/updateFactory.js';

import { minifactoryGetInfo } from './collection/miniFactory/getInfo.js';
import { minifactoryGetTokenInfo } from './collection/miniFactory/getTokenInfo.js';
import { minifactoryTokenInfoById } from './collection/miniFactory/getTokenInfoById.js';

import { minifactoryFindFactory } from './collection/miniFactory/findFactory.js';


// Kefir Factory
import { kefirFactoryPublicMint } from './collection/kefirFactory/publicMint.js';
import { kefirFactoryPrivateMint } from './collection/kefirFactory/privateMint.js';

import { kefirFactoryPassStatus } from './collection/kefirFactory/factoryPassStatus.js';
import { kefirFactoryPassMint } from './collection/kefirFactory/factoryPassMint.js';

import { kefirFactoryIsWhitelisted } from './collection/kefirFactory/isWhitelisted.js';
import { kefirFactoryStake } from './collection/kefirFactory/stake.js';
import { kefirFactoryUnStake } from './collection/kefirFactory/unStake.js';
import { kefirFactoryIsStaked } from './collection/kefirFactory/isStaked.js';
import { kefirFactoryIsFactoryStaked } from './collection/kefirFactory/isFactoryStaked.js';

import { kefirFactoryMultiStake } from './collection/kefirFactory/multiStake.js';
import { kefirFactoryUnMultiStake } from './collection/kefirFactory/unMultiStake.js';
import { kefirFactoryGetFactory } from './collection/kefirFactory/getFactory.js';
import { kefirFactoryUpdateFactory } from './collection/kefirFactory/updateFactory.js';

import { kefirFactoryGetInfo } from './collection/kefirFactory/getInfo.js';
import { kefirFactoryGetTokenInfo } from './collection/kefirFactory/getTokenInfo.js';
import { kefirFactoryTokenInfoById } from './collection/kefirFactory/getTokenInfoById.js';

// transactions
import { getStatusTransaction } from './transaction/getStatusTransaction.js';
import { cancelTransaction } from './transaction/cancelTransaction.js';
import { accelerateTransaction } from './transaction/accelerateTransaction.js';

import { barrelsMint } from './collection/barrels/mint.js';
import { barrelsBurn } from './collection/barrels/burn.js';
import { barrelsContractInfo } from './collection/barrels/contractInfo.js';
import { barrelsTokenUri } from './collection/barrels/tokenUri.js';
import { barrelsUpdateVolume } from './collection/barrels/updateVolume.js';
import { barrelsGetTokenInfo } from './collection/barrels/getTokenInfo.js';

import { boxesMint } from './collection/boxes/mint.js';
import { boxesContractInfo } from './collection/boxes/contractInfo.js';
import { boxesTokenUri } from './collection/boxes/tokenUri.js';
import { boxesGetTokenInfo } from './collection/boxes/getTokenInfo.js';
import { boxesIsWhitelisted } from './collection/boxes/isWhitelisted.js';
import { boxesOpenBox } from './collection/boxes/openBox.js';

const router = express.Router();


router.get('/ping', test);

// common
router.get('/blockchains', blockchains);
router.get('/contracts', contracts);
router.put('/transfer', transfer);

// marketplace
router.get('/marketplace/contract', marketContract);
router.get('/marketplace/items', marketItems);
router.get('/marketplace/getPurchaseStatus', getPurchaseStatus);
router.put('/marketplace/purchase', purchase);
router.put('/marketplace/changeOwner', changeOwner);
router.post('/marketplace/createItem', createItem);
router.post('/marketplace/removeItem', removeItem);

// collection
router.post('/collection/deploy', deployCollection);
router.post('/collection/:address/verify', verify);

router.put('/collection/:address/updateIsMintingActive', updateIsMintingActive);
router.put('/collection/:address/mint', collectionMint);

router.put('/collection/:address/setBaseUri', setBaseUri);
router.put('/collection/:address/updateWhitelistRoot', updateWhitelistRoot);
router.put('/collection/:address/updateMaxMerkleMint', updateMaxMerkleMint);
router.put('/collection/:address/updateMaxSupply', updateMaxSupply);
router.put('/collection/:address/updateMetadataUpdatable', updateMetadataUpdatable);

router.get('/collection/:address', collectionContract);
router.get('/collection/:address/isWhitelisted', isWhitelisted);
router.get('/collection/:address/getInfo', getInfo);

router.get('/collection/:address/:tokenId', tokenId);
router.get('/collection/:address/:tokenId/refreshMetadata', refreshMetadata);

// minifactory
router.put('/minifactory/mint', minifactoryMint);
router.put('/minifactory/updateWhitelistRoot', minifactoryUpdateWhitelistRoot);
router.put('/minifactory/stake', minifactoryStake);
router.put('/minifactory/unStake', minifactoryUnStake);

router.get('/minifactory/isWhitelisted', minifactoryIsWhitelisted);
router.get('/minifactory/isStaked', minifactoryIsStaked);
router.get('/minifactory/isArrayStaked', minifactoryIsArrayStaked);
router.get('/minifactory/isFactoryStaked', minifactoryIsFactoryStaked);

router.get('/minifactory/getInfo', minifactoryGetInfo);
router.get('/minifactory/getTokenInfo', minifactoryGetTokenInfo);
router.get('/minifactory/getTokenInfoById', minifactoryTokenInfoById);

router.put('/minifactory/createFactory', minifactoryMultiStake);
router.put('/minifactory/updateFactory', minifactoryUpdateFactory);
router.put('/minifactory/removeFactory', minifactoryUnMultiStake);
router.get('/minifactory/getFactory', minifactoryGetFactory);

router.get('/minifactory/findFactory', minifactoryFindFactory);

// Kefir Factory
router.put('/kefirFactory/publicMint', kefirFactoryPublicMint);
router.put('/kefirFactory/privateMint', kefirFactoryPrivateMint);

router.put('/kefirFactory/stake', kefirFactoryStake);
router.put('/kefirFactory/unStake', kefirFactoryUnStake);

router.get('/kefirFactory/isWhitelisted', kefirFactoryIsWhitelisted);
router.get('/kefirFactory/isStaked', kefirFactoryIsStaked);
router.get('/kefirFactory/isFactoryStaked', kefirFactoryIsFactoryStaked);

router.get('/kefirFactory/getInfo', kefirFactoryGetInfo);
router.get('/kefirFactory/getTokenInfo', kefirFactoryGetTokenInfo);
router.get('/kefirFactory/getTokenInfoById', kefirFactoryTokenInfoById);

router.put('/kefirFactory/createFactory', kefirFactoryMultiStake);
router.put('/kefirFactory/updateFactory', kefirFactoryUpdateFactory);
router.put('/kefirFactory/removeFactory', kefirFactoryUnMultiStake);
router.get('/kefirFactory/getFactory', kefirFactoryGetFactory);

router.get('/kefirFactory/factoryPassStatus', kefirFactoryPassStatus);
router.put('/kefirFactory/factoryPassMint', kefirFactoryPassMint);

// barrels
router.put('/barrels/mint', barrelsMint);
router.put('/barrels/burn', barrelsBurn);
router.put('/barrels/updateVolume', barrelsUpdateVolume);

router.get('/barrels/contractInfo', barrelsContractInfo);
router.get('/barrels/tokenUri', barrelsTokenUri);
router.get('/barrels/getTokenInfo', barrelsGetTokenInfo);

// boxes
router.put('/boxes/mint', boxesMint);

router.get('/boxes/contractInfo', boxesContractInfo);
router.get('/boxes/tokenUri', boxesTokenUri);
router.get('/boxes/getTokenInfo', boxesGetTokenInfo);

router.get('/boxes/isWhitelisted', boxesIsWhitelisted);

router.put('/boxes/openBox', boxesOpenBox);

// transactions
router.get('/trx/status', getStatusTransaction);
router.get('/trx/cancel', cancelTransaction);
router.get('/trx/accelerate', accelerateTransaction);

export default router;
