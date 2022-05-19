const TelegramBotApi = require('node-telegram-bot-api')

const token = '5327266952:AAFw9CAgW__obt4gdS9aN8L1XgFJjQUF3mw'

const bot = new TelegramBotApi(token, {polling: true})

const stats = {}

const gameOption = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text:1, callback_data: 'test1'}],
            [{text:2, callback_data: 'test2'}],
            [{text:3, callback_data: 'test3'}],
            [{text:4, callback_data: 'test4'}],
            [{text:5, callback_data: 'test5'}],
        ]
    })
}

function start (){
    bot.setMyCommands([
        {command: '/start', description: "hello here"},
        {command: '/info', description: "info here"},
        {command: '/game', description: "info game"}
    ]).then( r => {
        console.log(77777,r)
    })

    bot.on('message', async (msg)=>{
        const chatId = msg.chat.id
        const text = msg.text


        if(text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.jpg')
            await bot.sendMessage(chatId, 'Hi '+ msg.from.username + " " + msg.from.first_name)
        }
        if(text === '/info'){
            await bot.sendMessage(chatId, 'your name '+ msg.from.username + " " + msg.from.first_name)
        }
        if(text === '/game'){
            await bot.sendMessage(chatId, 'угадай число')
            const answer = 5
            stats[chatId] = answer
            return bot.sendMessage(chatId, 'угадай число 5', gameOption)
        }

        return bot.sendMessage(chatId, 'повторите попытку')
    })

    bot.on("callback_query", msg=>{
        console.log(msg)
    })
}


start()
