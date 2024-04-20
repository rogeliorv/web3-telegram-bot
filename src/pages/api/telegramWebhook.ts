/* eslint-disable no-console */
import { InlineKeyboardMarkup, Message } from '@grammyjs/types';
import { NextApiRequest, NextApiResponse } from 'next';

import { telegramClient } from '@/clients/TelegramApiClient';


const HELP_COMMAND = '/help';
const INFO_COMMAND = '/info';
const GET_CASH = '/cash';
const ADD_TO_SAVINGS = '/addSavings';
const HUMAN_ATM_COMMAND = '/humanATM';



class MessageHandler {

  private rawRequest: unknown;
  private message: Message;
  private callbackQuery: unknown;

  private commandToFunctionMapping: {[key:string]: () => void } = {
    [HELP_COMMAND]: this.executeHelpCommand.bind(this),
    [INFO_COMMAND]: this.executeInfoCommand.bind(this),
    [GET_CASH]: this.executeGetCashCommand.bind(this),
    [ADD_TO_SAVINGS]: this.executeAddToSavingsCommand.bind(this),
    [HUMAN_ATM_COMMAND]: this.executeHumanATMCommand.bind(this),
  };

  constructor(request: any) {
    this.rawRequest = request;
    this.message = request.message;
    this.callbackQuery = request.callback_query;
  }

  private executeHelpCommand() {
    // Do nothing
  }

  private async executeStartCommand() {
    const reply_markup: InlineKeyboardMarkup = {
      inline_keyboard:[
        [{
          text: 'Launch WebApp',
          web_app: { url: process.env.NEXT_PUBLIC_APP_URL || 'https://chonki.ai' },
        },
        {
          text: 'Hello',
          callback_data: 'Hello',
        }
      ],
      ]
    };


  await telegramClient.sendMessage(
    this.message.chat.id,
    `You said ${this.message.text}`,
    reply_markup,
    );
  }

  private getCommandFunctionFromText(text: string): () => void {
    const lowercaseTextCommand = text.toLocaleLowerCase().trim();
    return this.commandToFunctionMapping[lowercaseTextCommand];
  }


  private getAvailableCommands(): string {
    return `These are the commands you can use with this bot:
      /info - More info about this bot
      /cash - Withdraw cash from our P2P network
      /addSavings - This will let you deposit cash to your wallet
      /humanATM - This will help you earn money by letting people take cash from you in exchange for deposits
      /help - Will show this menu
    `
    ;
  }

  private async sendAvailableCommands() {
    await telegramClient.sendMessage(
      this.message.chat.id,
      this.getAvailableCommands(),
    );
  }

  // When a user clicks on a button we returned as InlineKeyboardMarkup
  // then we get a callback_query
  private handleCallbackQuery() {
    console.log('Callback query not implemented yet');
  };

  // Handles all the messages that come as text from the user
  private async handleMessage() {
    if(this.message.text) {
      const func = this.getCommandFunctionFromText(this.message.text);
      if(func) {
        return func();
      }
    }

    return this.sendAvailableCommands();
  };

  public handleRequest() {
    if(this.message) {
      console.debug('Handling message');
      return this.handleMessage();
    }
    else if(this.callbackQuery) {
      console.debug('Handling callback query');
      return this.handleCallbackQuery();
    }
  }

  private executeInfoCommand() {
    // Do nothing
  }

  private executeHumanATMCommand() {
    // Do nothing
  }

  private executeGetCashCommand() {
    // Do nothing
  }

  private executeAddToSavingsCommand() {
    // Do nothing
  }
}


export default async function handleWebhookRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log(`Received message on ${Date.now()}`);
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
