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
sequelize-cli.cmd db:migrate:undo:all | sequelize-cli.cmd db:migrate | sequelize-cli.cmd db:seed:all
```

- Create Migrations and Models

```sh

# migration create
sequelize-cli.cmd migration:create --name create-reports

# model generate
sequelize-cli.cmd model:generate --name Contractors --attributes 'nickname:string,firstname:string,lastname:string,patronymic:string'

sequelize-cli.cmd model:generate --name Licensors --attributes 'name:string'

sequelize-cli.cmd model:generate --name Tracks --attributes 'name:string,contractorId:number'

```

  /*
  users
  contractors
  contracts
  tracks
  licensors
  incomes
  payments
  royalties
  reports
  */
