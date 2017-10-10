'use strict';
const BootBot = require('bootbot');

const bot = new BootBot({
  accessToken: 'FB_ACCESS_TOKEN',
  verifyToken: 'FB_VERIFY_TOKEN',
  appSecret: 'caf6a33e15466a78a9d47c7561e06565'
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});

bot.start();