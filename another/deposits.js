const util = require('./util');
const axios = require('axios');
module.exports = async function (player, db, vk) {
	setInterval(async () => {
		const data = JSON.stringify({
			"token": "vk1.a.-LltSCebbs7vZNeimoOt7TWSDIq3fBrBVu7PIbQk5WuSutlsh2e9WfcdhiowK3c4zaEWQKmkekivWpIzRS_kJI5gPaQN1fiAm-PxJ657gfRbKNI9uMN-Jq2HJyOmvpVn5Oy6lqSdcFvo26wOnqDkIlU8B8xY5LZYV6iKa4XTgPJngXUZ7h8mMHyU1NDcNYKTxbS0JeY2ep46k2eQ7s2S0Q",
			"botId": 219247304,
			"count": 1
		});
		const settings = {
			method: 'post',
			url: 'https://wdonate.ru/api/getPayments',
			headers: {
				'Content-Type': 'application/json'
			},
			data : data
		};

		return axios(settings)
			.then(async function(response) {
				const transfer = response.data.response[0];
				const amount = Number(transfer.sum).toFixed(2);
				if(!transfer.userId) return;
				const userID = Number(transfer.userId);
				if(!player.playersData[userID]) return;
				const txID = Number(transfer.txnId);
				if(db.bonuscoins[txID]) return;
				const coins = Math.floor(amount * 1000);
				player.playersData[userID].balance += coins;
				db.bonuscoins[txID] = {
					user_id: userID,
					amount_rub: amount,
					anount_coins: coins
				}
			await vk.api.messages.send({
					message: `✅ Получен платёж, в размере: ${amount}₽\n\n🧾 Выписка оплаты:\n💸 Оплачено: ${amount}₽\n📥 К получению: ${util.number_format(coins)} RD Coins\n👤 Система оплаты: WDonate\n⚙️ TX ID в системе: ${util.number_format(txID)}\n\n❕ Сохраните данную выписку и выписку из вашего банка в случае ошибки выдачи, подробнее в [https://vk.com/@-211934278-polzovatelskoe-soglashenie|Пользовательском соглашении].`,
					peer_id: userID,
					random_id: 0
			});
			return vk.api.messages.send({
				message: `💳 Зачисление ${amount}₽\nОтправлено ${util.number_format(coins)} RD Coins`,
				peer_id: 219247304,
				random_id: 0
			});
			})
			.catch(function(error) {
					return;
			});
	}, 5000);
}