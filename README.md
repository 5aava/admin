# admin

Осталось из глобального               
- страница Денежный отчет                       +
- Модерация договоров, отдельная страница       +
- Сохранять где-то PDF файлы договоров          +

# HTTP 

```json
// request /create
{
  "contractorId": 1,
  "tracks": [
    {
      "trackId": 1,
      "incomes": [
        {
          "year": 2023,
          "quarters": [
            1,2,3,4
          ]
        }
        // ...
      ]
    }
    // ...
  ],
}

// response
```


## Migrations

```sh
yarn sequelize-cli db:migrate 
yarn sequelize-cli db:migrate:undo:all 
yarn sequelize-cli db:seed:all

yarn sequelize-cli db:seed --seed 20250118134800-contracts.js
yarn sequelize-cli db:migrate --to 20250112142348-create-contracts.js

# migration create
yarn sequelize-cli migration:create --name create-reports

# model generate
yarn sequelize-cli model:generate --name Payments --attributes 'contractorId:integer, trackId:integer, year:integer, q1:integer, q1p:tinyint, q2:integer, q2p:tinyint, q3:integer, q3p:tinyint, q4:integer, q4p:tinyint, total:integer, comment:string'

yarn sequelize-cli model:generate --name Royalties --attributes 'contractorId:integer, contractId:integer, trackId:integer, years:integer, totalValByYears:integer, usnTax:integer, valMinusUsn:integer, valForGaz:integer, valForContractors:integer'

yarn sequelize-cli model:generate --name RoyaltiesCtrs --attributes 'royaltyId:integer, contractorId:integer, contractId:integer, trackId:integer, usnTax:integer, amount:integer, year:integer, q1:integer, q2:integer, q3:integer,  q4:integer, total:integer'

yarn sequelize-cli model:generate --name Reports --attributes 'royaltyId:integer, totalIncomes:integer, totalPayments:integer, totalSaldo:integer'

# pm2
pm2 start npm --name "prod" -- run "prod"
```