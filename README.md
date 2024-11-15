# admin
Test Admin panel


docker            +
mariadb           +
logger            +
api               +
snackbars         +
dialog            +
loader            +
auth jwt          +    
auth integration  +

app               +
drawler           +
header            +
logout            +

sequelize         +


crud (Users)
  - read          
  - create
  - update
  - delete

role  

menu              

migrations        
models            
seeds             

## Migrations

```sh
sequelize-cli db:migrate:undo:all | sequelize-cli db:migrate | sequelize-cli db:seed:all
```

- Create Migrations and Models

```sh
# blockchains
sequelize-cli model:generate --name Blockchains --attributes 'name:string,network_url:string'

# contracts
sequelize-cli model:generate --name Contracts --attributes 'blockchain:string,address:string,type:string,abi:text'
sequelize migration:generate --name add-wl-fields-to-contracts

# market items (actual market)
sequelize-cli model:generate --name Marketitems --attributes 'blockchain:string,seller:string,nftContract:string,tokenId:integer,price:integer,props:text'

# market orders (logs)
sequelize-cli model:generate --name MarketOrders --attributes 'blockchain:string,seller_address:string,buyer_address:string,nftContract:string,tokenId:integer,price:integer,props:text'

# =================================================================
# events
sequelize-cli model:generate --name Events --attributes 'name:string,transaction:string,log:text'

# transactions
sequelize-cli model:generate --name Transactions --attributes 'contract:string,transaction:string,from:string,to:string,data:string,status:string'


# =================================================================
# collections
sequelize-cli model:generate --name Collections --attributes 'address:string,name:string,symbol:string,author:string'

# collections nfts
sequelize-cli model:generate --name CollectionsNfts --attributes 'blockchain:string,seller:string,nftContract:string,tokenId:integer,props:text'

sequelize-cli migration:create --name add-factory-passes

```
