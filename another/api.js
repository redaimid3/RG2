const express = require('express');
const rateLimit = require('express-rate-limit');
const users = require('../cloud/players.json');
const db = require('../cloud/database.json');
const PORT = 5080;
const host = "45.86.181.179";
const { VK } = require('vk-io');
const vk = new VK({
    token: "vk1.a.-LltSCebbs7vZNeimoOt7TWSDIq3fBrBVu7PIbQk5WuSutlsh2e9WfcdhiowK3c4zaEWQKmkekivWpIzRS_kJI5gPaQN1fiAm-PxJ657gfRbKNI9uMN-Jq2HJyOmvpVn5Oy6lqSdcFvo26wOnqDkIlU8B8xY5LZYV6iKa4XTgPJngXUZ7h8mMHyU1NDcNYKTxbS0JeY2ep46k2eQ7s2S0Q",
    pollingGroupId: 219247304
});
const util = require('./util');

const app = express();
const aniLimits = rateLimit({
	windowMs: 5 * 1000,
	max: 3,
	message: 'The request can be made every 5 seconds',
	standardHeaders: true,
	legacyHeaders: false
});

app.get('/send_coins', aniLimits, async (req, res) => {
    let { user_id, amount, token, sender_id } = req.query;
    if (!req.query.user_id || !req.query.amount || !req.query.token || !req.query.sender_id || isNaN(user_id) || isNaN(sender_id) || isNaN(amount)) {
		res.status(405).send('Invalid request')
		return
    }
    if(!users.playersData[user_id]) {
    	res.status(405).send('User not found')
		return
    }
    if(users.playersData[user_id].key == token) {
		res.status(405).send('You cant translate yourself')
		return
    }
    	if(users.playersData[sender_id].key == token) {
    	if(users.playersData[sender_id].banned == true) {
    		res.status(405).send('User banned')
			return;
    	} 
    	if(users.playersData[sender_id].balance < amount) {
    		res.status(405).send('Not enough coins')
			return;
    	}
    	if(users.playersData[sender_id].balance >= amount) {
			let date = Date.now();
			let number_of_transfer = db.txTransfers + 1;
			db.txTransfers += 1;
			const data = { "id": number_of_transfer, "sender_id": Number(sender_id), "recipient_id": Number(user_id), "amount": Math.floor(amount), "created_at": date }
			users.playersData[sender_id].transfers.out[number_of_transfer] = {
				"id": number_of_transfer,
				"sender_id": Number(sender_id),
				"recipient_id": Number(user_id),
				"amount": Math.floor(amount),
				"created_at": date
			}
			users.playersData[user_id].transfers.in[number_of_transfer] = {
				"id": number_of_transfer,
				"sender_id": Number(sender_id),
				"recipient_id": Number(user_id),
				"amount": Math.floor(amount),
				"created_at": date
			}
			users.playersData[user_id].transfers.in.id = number_of_transfer;
			users.playersData[sender_id].balance -= Math.floor(amount);
			users.playersData[user_id].balance += Math.floor(amount);
			await vk.api.messages.send({
				message: `✅ Получен перевод от ${users.playersData[sender_id].mark}[id${sender_id}|${users.playersData[sender_id].name}]${users.playersData[sender_id].mark}, на сумму: ${util.number_format(amount)} RDC.`,
				peer_id: user_id,
				random_id: 0
			});
			res.send(data);
			return;
   		}
		}
		if(users.playersData[sender_id].key != token) {
			res.status(405).send('Access is denied')
			return;
		}
});
app.get('/balance', aniLimits, async (req, res) => {
  let { token, user_id } = req.query;
  if (!req.query.token || !req.query.user_id || isNaN(user_id) || isNaN(user_id)) {
    res.status(405).send('Invalid request')
	return
  }
  	if(users.playersData[user_id].key == token) {
    	if(users.playersData[user_id].banned == true) {
    		res.status(405).send('User banned')
			return
    	} 
    	if(users.playersData[user_id].banned != true) {
    		const data = { "user_id": user_id, "balance": users.playersData[user_id].balance }
    		res.send(data);
    		return;
  		}
  	}
	if(users.playersData[user_id].key != token) {
		res.status(405).send('Access is denied')
		return
	}
});
app.get('/transaction_last', async (req, res) => {
	let { token, user_id } = req.query;
	if (!req.query.token || !req.query.user_id || isNaN(user_id)) {
		res.status(405).send('Invalid request')
		return;
    }
			if(users.playersData[user_id].key == token) {
					if(users.playersData[user_id].banned == true) {
    					res.status(500).send('User banned')
						return;
    				} 
					if(users.playersData[user_id].banned != true){
    					let last_id = users.playersData[user_id].transfers.in.id
    					if(!users.playersData[user_id].transfers.in[last_id]) {
    						res.status(405).send('Translation history is empty')
							return;
						}
    					const data = {
							"id": last_id,
							"sender_id": users.playersData[user_id].transfers.in[last_id].sender_id,
							"recipient_id": user_id,
							"amount": users.playersData[user_id].transfers.in[last_id].amount,
							"created_at": users.playersData[user_id].transfers.in[last_id].created_at
                		}
						res.send(data)
						return;
					}
				}
				if(users.playersData[user_id].key != token) {
					res.status(405).send('Access is denied')
					return;
				}
});
app.listen(PORT,host);