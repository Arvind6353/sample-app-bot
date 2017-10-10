'use strict';
const BootBot = require('bootbot');

const bot = new BootBot({
  accessToken: 'EAAN3s3DTH3sBAGeceVOiKV1q9SPzXLZB1nZBvnUppliWecQgeVCwcVTMQovfT4J4awZBh6foS5Ir2qvxQ3BCBOu8k7QSKIEGn7ZA2AIQ9c6APCvZAlZBpGYEkhkJeRwHeYs9ZAENwKB0aMqW1qspfmJWd8LZArZCgw60CiuIVJv5VxQZDZD',
  verifyToken: 'FB_VERIFY_TOKEN',
  appSecret: 'caf6a33e15466a78a9d47c7561e06565'
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  chat.say(`Echo: ${text}`);
});

bot.start();