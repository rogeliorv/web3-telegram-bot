/* eslint-disable no-console */
import { InlineKeyboardMarkup, Message } from '@grammyjs/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { TelegramApiClient } from '@/clients/TelegramApiClient';

const WITHDRAW_MONEY_CALLBACK = 'withdraw_money';
const DEPOSIT_MONEY_CALLBACK = 'deposit_money';

class MessageHandler {

  private rawRequest: unknown;
  private message: Message;
  private callbackQuery: unknown;
  private telegramApiClient: TelegramApiClient;
  private appUrl: string;

  constructor(request: any) {

    if(!process.env.TELEGRAM_USER_BOT_TOKEN) {
      throw new Error('You need to specify TELEGRAM_USER_BOT_TOKEN in your environment');
    }

    if(!process.env.NEXT_PUBLIC_APP_URL) {
      throw new Error('You need to specify NEXT_PUBLIC_APP_URL in your environment');
    }

    this.telegramApiClient = new TelegramApiClient(process.env.TELEGRAM_USER_BOT_TOKEN || '');
    this.appUrl = process.env.NEXT_PUBLIC_APP_URL;
    this.rawRequest = request;
    this.message = request.message;
    this.callbackQuery = request.callback_query;
  }


  private async sendStartOptions() {

    console.log(`${this.appUrl}/findPartnersMap`);

    const reply_markup: InlineKeyboardMarkup = {
      inline_keyboard:[
        [
      /*  {
          text: 'Withdraw Cash',
          web_app: { url: `${this.appUrl}/findPartnersMap`},
        },*/
          {
            text: 'Withdraw Cash',
            web_app: { url: `${this.appUrl}/withdrawAmount`},
          },
        {
          text: 'Deposit Cash',
          web_app: { url: `${this.appUrl}/findPartnersMap`},
        }

      ],
      ]
    };

    await this.telegramApiClient.sendMessage(
      this.message.chat.id,
      `You said ${this.message.text}`,
      reply_markup,
    );
  }

  // When a user clicks on a button we returned as InlineKeyboardMarkup
  // then we get a callback_query
  private async handleCallbackQuery() {
    console.log('Callback query not implemented yet');
  };

  // Handles all the messages that come as text from the user
  private async handleMessage() {
    await this.sendStartOptions();
  };

  public async handleRequest() {

    if(this.message) {
      console.debug('Handling message');
      return await this.handleMessage();
    }
    else if(this.callbackQuery) {
      console.debug('Handling callback query');
      return await this.handleCallbackQuery();
    }
  }
}


export default async function handleWebhookRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(`User bot received message on ${Date.now()}`);
    // console.log(req.body);

    if(!req.body) {
      console.warn('No body was found in message. Bye');
      res.status(200).end();
      return;
    }

    const handler = new MessageHandler(req.body);
    await handler.handleRequest();
    res.status(200).end();
  }
  catch(error) {
    // Never fail as to not queue webhook messages
    console.error(error);
    res.status(200).end();
  }
}
