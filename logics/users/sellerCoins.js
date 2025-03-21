const util = require('../../another/util');
const axios = require('axios');
module.exports = async function (player, context, vk) {
	if(context.messagePayload && !context.isChat) {
    	if (context.messagePayload.type == 'private' && context.messagePayload.action == 'seller') {
    		const data = JSON.stringify({
				"token": "3c6b491a6f49b8043b7a8a88e6384431",
				"botId": 211934278,
				"userId": context.senderId
			});
			const settings = {
				method: 'post',
				url: 'https://wdonate.ru/api/getLink',
				headers: {
					'Content-Type': 'application/json'
				},
				data : data
				};
				return axios(settings)
					.then(async function(response) {
						const brl = await vk.api.utils.getShortLink({
							url: response.data.response.link,
							private: 0
						})
            			const url = brl.short_url;
						return context.send(`🔥 Ваша сыллка на пополнение: ${url}\n📥 Курс пополнения: 10₽ - 1 000 RD Coins`);
					})
					.catch(async function(error) {
						return context.send(`Во время получения ссылки на пополнение произошла ошибка.`);
					});
		}
    	if(context.messagePayload.type == 'private' && context.messagePayload.action == "bonus") {
        let amount = Number(context.messagePayload.amount);
    	if(isNaN(amount)) return
		if(player.playersData[context.senderId].balance < amount) {
			return context.send({
				message: `❌ ${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}, на вашем балансе недостаточно коинов...`,
				reply_to: context.id
			})
		}
		if(player.playersData[context.senderId].balance >= amount) {
			player.playersData[context.senderId].balance -= amount
			player.playersData[context.senderId].bbalance += Math.floor(amount * 1.1)
			return context.send({
				message: `✅ ${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}, вы обменяли ${util.number_format(amount)} VKC. На ваш бонусный баланс зачислено: ${util.number_format(amount * 1.1)} RDC.`,
				reply_to: context.id
			})
		}
    }
}
}