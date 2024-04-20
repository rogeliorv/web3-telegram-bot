/* eslint-disable no-console */



import { InlineKeyboardMarkup } from '@grammyjs/types';

import { BaseClient, extractErrorFromClientException } from '@/clients/BaseClient';

const BASE_URL = 'https://api.telegram.org/bot';

export class TelegramApiClient extends BaseClient {
  constructor(telegramBotToken: string) {
    if(!telegramBotToken) {
      throw new Error('You need to specify the telegram bot token');
    }

    const url = `${BASE_URL}${telegramBotToken}`;
    super(url);
  }

  public async sendMessage(chat_id: number, text: string, reply_markup?: InlineKeyboardMarkup) {
    try {
      console.log('sending message');
      const result = await this.client.post(`sendMessage`, {
        chat_id,
        text,
        reply_markup,
      });
      return {
        response: result?.data,
        error: null,
      };
    } catch (error) {
      console.error(error);
      return {
        response: null,
        error: extractErrorFromClientException(error),
      };
    }
  }
}
