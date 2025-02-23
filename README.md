# admin


На сегодня 

- сохранение всех параметров
  - не сохранился линк                                    +
  - по фронту не добавились авторы                        +
- удаление доп контракторсов                              +
- редактирование всех параметров                          +

Для заказщиков

- Изменил добавление процентов до сотых
- Изменил все рачеты до копеек
- Заработали Роли пользователей - модератор не видит Выплаты и Доходы


Осталось из глобального
- страница Роялти счтитать
- страница Денежный отчет

- Модерация договоров
- Сохранять где-то PDF файлы договоров
- черный список исполнителей


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
sequelize-cli.cmd model:generate --name Contractors --attributes 'nickname:string,firstname:string,lastname:string,patronymic:string'

sequelize-cli.cmd model:generate --name Licensors --attributes 'name:string'

sequelize-cli.cmd model:generate --name Tracks --attributes 'name:string,contractorId:integer'

sequelize-cli.cmd model:generate --name Contracts --attributes 'sku:string, contractorId:integer, trackId:integer, LicensorId:integer, date:date, tax:integer, iscr:string, upc:string, link:string, file:string, moderated:integer'

sequelize-cli.cmd model:generate --name ContractsCtrs --attributes 'contractId:integer, contractorId:integer, type:string, percent:integer'

sequelize-cli.cmd model:generate --name Incomes --attributes 'contractorId:integer, trackId:integer, year:integer, q1:integer, q2:integer, q3:integer, q4:integer, total:integer, comment: string'

sequelize-cli.cmd model:generate --name Payments --attributes 'contractorId:integer, trackId:integer, year:integer, q1:integer, q1p:tinyint, q2:integer, q2p:tinyint, q3:integer, q3p:tinyint, q4:integer, q4p:tinyint, total:integer, comment:string'

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


