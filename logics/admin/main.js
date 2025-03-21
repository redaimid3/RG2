const config = require('../../cloud/config');
const { Keyboard } = require('vk-io');
const util = require('../../another/util');
module.exports = async function(db, player, game, vk, context) {
    if(!config.globalAdmins.includes(context.senderId)) return;
        if(context.text == 'панель' && !context.isChat) {
        	require('./statistic.js') (db, player, vk, context)
        	require('./mail.js') (player, vk, context)
        	require('./banUser.js') (player, vk, context)
        	require('./giveUser.js') (player, vk, context)
            return context.send({
                message: `Добро пожаловать в админ панель`,
                keyboard: Keyboard.builder()
                .textButton({ label: `Статистика бота`, payload: { command: "admin_getBotStatistic"}, color: 'positive'}).row()
                .textButton({ label: `Рассылка`, payload: {command: "getNewsSender"}, color: 'positive'})
                .textButton({ label: `Выдача баланса`, payload: {command: "admin_give"}, color: 'positive'}).row()
                .textButton({ label: `Блокировка игрока`, payload: {command: "admin_ban"}, color: 'primary'})
                .textButton({ label: `Разблокировка игрока`, payload: {command: "admin_unban"}, color: 'primary'}).row()
                .textButton({ label: `Установка поста`, payload: {command: "admin_post"}, color: 'secondary'})
                .textButton({ label: `Установка знаков`, payload: {command: "admin_setMarks"}, color: 'secondary'}).row()
                .textButton({ label: "Главное меню", payload: { command: "mainmenu" }, color: 'negative'})
            })
        }
        if(context.text == '/clear_peers' && context.isChat || context.text == '/Clear_peers' && context.isChat) {
        	for(i in game.gamesData) {
        	game.gamesData[i].convData.history = {}
        	game.gamesData[i].convData.games = 0
        	}
        return context.send({
        	message: `✅ Я очистил все истории бесед.`
        });
       }
        if(context.text == 'бан' && context.isChat || context.text == 'Бан' && context.isChat) {
        	if(!context.replyMessage) {
			await context.loadMessagePayload();
			let uid = context.forwards[0].senderId
        	await context.send({ message: `❕[id${uid}|Вам] была выдана блокировка в игровом чате. Вы будете исключены из беседы навсегда.\n\nДля возвращения в чат обратитесь к администрации.`})
            return vk.api.messages.removeChatUser({
                chat_id: context.peerId - 2000000000,
                user_id: uid
            });
          }
        }
}