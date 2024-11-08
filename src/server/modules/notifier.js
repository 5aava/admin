import discord from './discord.js';
/* eslint-disable no-undef */

export default async function discordError (title, desc, type, error) {

  const embeds = [
    {
      'title': title, // 'Ошибка при обработке транзакции',
      'description': desc, // 'При обработке транзакции произошла ошибка',
      'fields': [
        {
          'name': 'ENV: ',
          'value': `${process.env.ENV}`,
          'inline': false,
        },
        {
          'name': 'Type: ',
          'value': type, // '[ OPEN BOX ERROR ]',
          'inline': false,
        },
        {
          'name': 'Ошибка: ',
          'value': `${error}`,
          'inline': false,
        },
      ],
    },
  ];

  const obj = {
    'content': ':loudspeaker: @here \n Blockchain Server уведомляет об Ошибке! \n',
    'embeds': embeds,
    'username': 'Blockchain Server',
  };

  discord('support', obj);

}
