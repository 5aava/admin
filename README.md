# admin


На сегодня 


Для заказщиков
- 


Осталось из глобального
- страница Роялти счтитать                          
- страница Денежный отчет

- Модерация договоров, отдельная страница
- Сохранять где-то PDF файлы договоров
- черный список исполнителей

# Расчитать роялти

Выбираем
- Исполнитель (селект)
- Треки (несколько)
  - MultiSelect, Chip 
- Выбираем года где есть доходы (селект)
  - MultiSelect, Chip 
- Вибираем кварталы (чекбоксы)
  - MultiSelect, Chip 

Считаем Роялти
- Берем 1 исполнителя

  - берем 1 трек (в цикле)
    - выбираем год (в цикле)
      - берем кварталы
        
      - суммируем за кварталы (total)

  - суммируем Вал за все года
  - вычитаем УСН
  - считаем ГАЗ 30%
  - считаем на доп исполнителей 70%
    - берем доп исполнителя
    - считаем роялти по проценту

===========================
Считаем Роялти по кварталу
- Берем 1 исполнителя

  - берем 1 трек (в цикле)
    - выбираем год (в цикле)
      - берем кварталы (в цикле)
        - берем 1 квартал 1 года
        - получаем по нему доход
        - вычитаем УСН по договору
        - берем 70% полученной суммы
          - берем доп исполнителя
          - считаем роялти по проценту
      
Таблица Royalties
  contractorId
  contractId
  trackId
  years
  totalValByYears
  usnTax
  valMinusUsn
  valForGaz
  valForDopContractors

Таблица RoyaltiesCtrs
  royaltyId
  contractorId
  contractId
  trackId
  usnTax
  percent (summ)
  year 
  q1
  q2
  q3
  q4
  total
  


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

## Договора
                                                        db        Front         API         
Поля
- Номер договора (текстовое поле)                         +         
- Один Главный исполнитель                                +         
- Один трек исполнителя                                   +         
- Один лицензиар                                          +         
- Дата релиза (календарь)                                 +         

- Добавить исполнителя (+)                                +
  - Исполнитель                                           +
  - Выбор (певец, автор текста, автор музыки)             +
  - процентная ставка                                     +
  - Кнопка добавить, удалить                              +

- Налог (0% или 6%)                                       +
- вручную вносим ISRC (текстовое поле)                    +
- вручную вносим UPC (текстовое поле)                     +
- вручную вносим "Ссылка на релиз" (текстовое поле)       +

-	подгружаем PDF файл                                     
-	Сохраняем, отправляем на Модерацию                      
 

## Migrations

```sh
sequelize-cli.cmd db:migrate:undo:all | sequelize-cli.cmd db:migrate | sequelize-cli.cmd db:seed:all

sequelize-cli.cmd db:seed --seed 20250118134800-contracts.js

sequelize-cli.cmd db:migrate --to 20250112142348-create-contracts.js

# migration create
sequelize-cli.cmd migration:create --name create-reports

# model generate
sequelize-cli.cmd model:generate --name Payments --attributes 'contractorId:integer, trackId:integer, year:integer, q1:integer, q1p:tinyint, q2:integer, q2p:tinyint, q3:integer, q3p:tinyint, q4:integer, q4p:tinyint, total:integer, comment:string'

sequelize-cli.cmd model:generate --name Royalties --attributes 'contractorId:integer, contractId:integer, trackId:integer, years:integer, totalValByYears:integer, usnTax:integer, valMinusUsn:integer, valForGaz:integer, valForContractors:integer'

sequelize-cli.cmd model:generate --name RoyaltiesCtrs --attributes 'royaltyId:integer, contractorId:integer, contractId:integer, trackId:integer, usnTax:integer, amount:integer, year:integer, q1:integer, q2:integer, q3:integer,  q4:integer, total:integer'



# pm2
pm2 start npm --name "prod" -- run "start"

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



-------

- музыка
- текст
- исполнитель
- сведение
- жесткий процент


Поле Ф.И.О

% в сотых (2 знака после запятой)
До 100% проверять


