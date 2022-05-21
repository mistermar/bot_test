const TelegramBotApi = require('node-telegram-bot-api')
const axios = require('axios')

const token = '5327266952:AAFw9CAgW__obt4gdS9aN8L1XgFJjQUF3mw'
const bot = new TelegramBotApi(token, {polling: true})


const orderOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text:`Принять`, callback_data: `true`}, {text:`Отклонить`, callback_data: `false`}],
        ]
    })
}

function orderOption(status) {
    let text = status ? 'Принято' : 'Отклонено'
  return {
      reply_markup: JSON.stringify({
          inline_keyboard: [
              [{text: text, callback_data: `test`}],
          ]
      })
  }
}
function orderOption2(status) {
    let text = status ? 'Принято' : 'Отклонено'
  return {
      reply_markup: JSON.stringify({
          inline_keyboard: [
              [{text: '31', callback_data: `test`}],
          ]
      })
  }
}

let orders = [
    {name: 'pizza'},
    {name: 'tea'},
    {name: 'roll'},
    {name: 'bread'},
]

async function orderFn(chatId, orders){
    if(!orders.length){
        await bot.sendMessage(chatId, `All done! Waiting new orders`)

        return false;
    }

    bot.sendMessage(chatId, `order name ${orders[0].name}`, orderOptions)
}


function start (){

    bot.setMyCommands([
        {command: '/start', description: "start msg"},
        {command: '/info', description: "info name"},
        {command: '/order', description: "click"},
        {command: '/add_orders', description: "click to add"},
    ])

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id
        const text = msg.text
        const userId = msg.from.id

        if(text === '/order'){
            await bot.sendMessage(chatId, `You have new orders count : ${orders.length}`)

            orderFn(chatId, orders)
            return true;
        }

        if(text === '/info'){
            await bot.sendMessage(chatId, 'your name '+ msg.from.username + " " + msg.from.first_name)
        }
        if(text === '/add_orders'){
            orders.push({name: 'Super Pizza'})
            return true;
        }


        return bot.sendMessage(chatId, 'повторите попытку')
    })

    bot.on("callback_query", async msg=>{
        const chatId = msg.message.chat.id
        if(msg.data === 'true'){
            await bot.sendMessage(chatId, `  принято`)
            orders.splice(0,1)
            orderFn(chatId, orders)

        }else if (msg.data === 'false'){
            await bot.sendMessage(chatId, `отменено`)
            orders.splice(0,1)

            orderFn(chatId, orders)
        }
    })
}

start()
