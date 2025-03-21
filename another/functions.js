const util = require('./util')
module.exports = async function (player, game, db, vk) {
    setInterval(async() => {
        let hour = new Date().getHours()
        let minute = new Date().getMinutes()
        if (hour == 0 && minute == 0) {
            let topS = 0
            let top = []
            let topme = []
            for (let i in player.playersData) {
                top.push({
                    id: player.playersData[i].id,
                    name: player.playersData[i].name,
                    win: player.playersData[i].userStatistics.winDay
                })
            }
            top.sort(function (a, b) {
                if (b.win > a.win) return 1
                if (b.win < a.win) return -1
                return 0
            });
            for (let s = 0; s < top.length; s++) {
                topme.push(top[s].id)
            }
            for (let j in top) {
                topS += 1
                if (topS > 10) {
                    for (i in player.playersData) {
                        player.playersData[i].userStatistics.winDay = Number(0)
                    }
                    return vk.api.messages.send({
                        peer_id: 291283942,
                        message: `✅ Призы за топ дня отправлены. Топ обновлен`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 1) {
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.dayTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winDay -= Number(player.playersData[top[j].id].userStatistics.winDay)
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `🎉 Поздравляю!\n\n🎊 Ты занял топ ${topS} в ежедневном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} Chery Coin's уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 2) {               	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.dayTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winDay -= Number(player.playersData[top[j].id].userStatistics.winDay)
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `🎉 Поздравляю!\n\n🎊 Ты занял топ${topS} место в ежедневном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 3) { 
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.dayTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winDay -= Number(player.playersData[top[j].id].userStatistics.winDay)
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `🎉 Поздравляю!\n\n🎊 Ты занял топ ${topS} в ежедневном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 4) {       	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.dayTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winDay -= Number(player.playersData[top[j].id].userStatistics.winDay)
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `💥 Поздравляем!\n\n🚀 Ты занял топ ${topS} в ежедневном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 5) {               	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.dayTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winDay -= Number(player.playersData[top[j].id].userStatistics.winDay)
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `💥 Поздравляем!\n\n🚀 Ты занял топ ${topS}  в ежедневном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 6) {            	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.dayTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winDay -= Number(player.playersData[top[j].id].userStatistics.winDay)
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `💥 Поздравляем!\n\n🚀 Ты занял топ ${topS} в ежедневном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 7) {               	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.dayTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winDay -= Number(player.playersData[top[j].id].userStatistics.winDay)
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `💥 Поздравляем!\n\n🚀 Ты занял ${topS} место в ежедневном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 8) {               	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.dayTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winDay -= Number(player.playersData[top[j].id].userStatistics.winDay)
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `✨ Отлично!\n\n💰 Ты занял ${topS} место в ежедневном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 9) {       	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.dayTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winDay -= Number(player.playersData[top[j].id].userStatistics.winDay)
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message:`✨ Отлично!\n\n💰 Ты занял ${topS} место в ежедневном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 10) {
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.dayTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winDay -= Number(player.playersData[top[j].id].userStatistics.winDay)
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `✨ Отлично!\n\n💰 Ты занял ${topS} место в ежедневном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                db.botSettings.top_status = true;
            }
        }
    }, 60000);
    setInterval(async() => {
    	let days = [
  		'Воскресенье',
  		'Понедельник',
  		'Вторник',
  		'Среда',
  		'Четверг',
  		'Пятница',
  		'Суббота'
	];
		let d = new Date();
		let n = d.getDay();
		if(days[n] != 'Понедельник') return
        let hour = new Date().getHours()
        let minute = new Date().getMinutes()
        if (hour == 0 && minute == 0) {
            let topS = 0
            let top = []
            let topme = []
            for (let i in player.playersData) {
                top.push({
                    id: player.playersData[i].id,
                    name: player.playersData[i].name,
                    win: player.playersData[i].userStatistics.winWeek
                })
            }
            top.sort(function (a, b) {
                if (b.win > a.win) return 1
                if (b.win < a.win) return -1
                return 0
            });
            for (let s = 0; s < top.length; s++) {
                topme.push(top[s].id)
            }
            for (let j in top) {
                topS += 1
                if (topS > 10) {
                    for (i in player.playersData) {
                        player.playersData[i].userStatistics.winWeek = 0;
                    }
                    return vk.api.messages.send({
                        peer_id: 291283942,
                        message: `✅ Призы за топ недели отправлены. Топ обнулён.`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 1) {
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.weekTop.amount[topS - 1])
                    player.playersData[top[j].id].userStatistics.winWeek = 0;
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `🎉 Невероятно!\n\n🎊 Ты занял ${topS} место в недельном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} Chery Coin's уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 2) {               	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.weekTop.amount[topS - 1]);
                    player.playersData[top[j].id].userStatistics.winWeek = 0;
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `🎉 Невероятно!\n\n🎊 Ты занял ${topS} место в недельном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 3) { 
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.weekTop.amount[topS - 1]);
                    player.playersData[top[j].id].userStatistics.winWeek = 0;
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `🎉 Невероятно!\n\n🎊 Ты занял ${topS} место в недельном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 4) {       	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.weekTop.amount[topS - 1]);
                    player.playersData[top[j].id].userStatistics.winWeek = 0;
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `💥 Поздравляем!\n\n🚀 Ты занял ${topS} место в недельном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 5) {               	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.weekTop.amount[topS - 1]);
                    player.playersData[top[j].id].userStatistics.winWeek = 0;
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `💥 Поздравляем!\n\n🚀 Ты занял ${topS} место в недельном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 6) {            	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.weekTop.amount[topS - 1]);
                    player.playersData[top[j].id].userStatistics.winWeek = 0;
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `💥 Поздравляем!\n\n🚀 Ты занял ${topS} место в недельном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 7) {               	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.weekTop.amount[topS - 1]);
                    player.playersData[top[j].id].userStatistics.winWeek = 0;
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `💥 Поздравляем!\n\n🚀 Ты занял ${topS} место в недельном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 8) {               	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.weekTop.amount[topS - 1]);
                    player.playersData[top[j].id].userStatistics.winWeek = 0;
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `✨ Отлично!\n\n💰 Ты занял ${topS} место в недельном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 9) {       	
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.weekTop.amount[topS - 1]);
                    player.playersData[top[j].id].userStatistics.winWeek = 0;
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message:`✨ Отлично!\n\n💰 Ты занял ${topS} место в недельном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
                if(topS == 10) {
                    player.playersData[top[j].id].balance += Number(db.botSettings.topSettings.weekTop.amount[topS - 1]);
                    player.playersData[top[j].id].userStatistics.winWeek = 0;
                    await vk.api.messages.send({
                        peer_id: top[j].id,
                        message: `✨ Отлично!\n\n💰 Ты занял ${topS} место в недельном розыгрыше! ${util.number_format(db.botSettings.topSettings.dayTop.amount[topS -1])} RD Coins уже на твоём балансе!`,
                        random_id: 0
                    }).catch((err) => {
                        console.log(`❌ Не отправлено сообщение о топах.`);
                    });
                }
            }
        }
    }, 60000);
    setInterval(async() => {
    	let hour = new Date().getHours()
        let minute = new Date().getMinutes()
        let o = `${hour}:0${minute}`
        for(i in game.gamesData) {
    		if(game.gamesData[i].convData.type == "player") {
			game.gamesData[i].convData.active_timer -= 1;
			if(game.gamesData[i].convData.active_timer <= 0) {
				game.gamesData[i].convData.isActive = false;
				game.gamesData[i].convData.gamemode = "null";
				game.gamesData[i].convData.history = {};
				game.gamesData[i].convData.games = 0;
					}
				}
			}
        if (o == '0:00') {
        	let days = [
  		'Воскресенье',
  		'Понедельник',
  		'Вторник',
  		'Среда',
  		'Четверг',
  		'Пятница',
  		'Суббота'
	];
		let d = new Date();
		let n = d.getDay();
		if(days[n] == 'Понедельник') {
		for(i in game.gamesData) {
    		game.gamesData[i].convData.userStatisticsBet.betDay = {};
    		game.gamesData[i].convData.userStatisticsBet.betWeek = {};
    		game.gamesData[i].convData.userStatisticsBet.amountDay = 0;
    		game.gamesData[i].convData.admin_earn = 0;
    	}
    	for(i in game.gamesData) {
    		game.gamesData[i].convData.history = {}
    		game.gamesData[i].convData.games = 0
    	}
}
    	for(i in game.gamesData) {
    		game.gamesData[i].convData.userStatisticsBet.betDay = {};
    		game.gamesData[i].convData.userStatisticsBet.amountDay = 0;
    		game.gamesData[i].convData.admin_earn = 0;
    	}
    	for(i in game.gamesData) {
    		game.gamesData[i].convData.history = {}
    		game.gamesData[i].convData.games = 0
    	}
    	}
    }, 60000)
}