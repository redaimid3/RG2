const util = require('../another/util')
const md5 = require('md5');
module.exports = async function (game, player, vk, db) {
    setInterval(async () => {
        for (i in game.gamesData) {
            let betss = 0
            for(let s in game.gamesData[i].convGame.bets) { betss++ }
            if (game.gamesData[i].convData.isActive == true && game.gamesData[i].convData.gamemode == 'fortune' && game.gamesData[i].convGame.amount > 0 && betss >= 2) {
                game.gamesData[i].convGame.timeNow -= Number(1)
                if (game.gamesData[i].convGame.timeNow <= 0) {                
                            let mass = [];
                            let sum = 0;
                            for(let j in game.gamesData[i].convGame.bets){
                                for(let s in game.gamesData[i].convGame.bets[j].rations) {          
                                mass.push({
                                    id: game.gamesData[i].convGame.bets[j].rations[s].ration,
                                    money: Number(game.gamesData[i].convGame.bets[j].rations[s].amount)
                                });          
                                sum += Number(game.gamesData[i].convGame.bets[j].rations[s].amount);
                                delete game.gamesData[i].convGame.bets[j].rations[s];                
                                }   
                            };
                            let sendId = game.gamesData[i].id
                            if(mass.length == 0) return; 
                            mass.sort(function(a, b) {
                                if (b.money > a.money) return 1
                                if (b.money < a.money) return -1
                                return 0
                            });    
                            let rand = Math.floor(Math.random() * sum);       
                            let ww = 0;
                            for (let s = mass[0].money; s <= rand; s += mass[ww].money) {
                                ww++;
                            }
                            player.playersData[mass[ww].id].balance += Math.floor(sum * 0.95);
                            let forHis = `Выпало число: ${game.gamesData[i].convGame.resultData.result}`
                            let str = `Выпало число: ${game.gamesData[i].convGame.resultData.result}\n\n✅ ${player.playersData[mass[ww].id].userData.globalSettings.allowCallNickname == true ? `[id${mass[ww].id}|${player.playersData[mass[ww].id].name}]` : `${player.playersData[mass[ww].id].name}`}, вы выйграли в этом раунде.\n\nНа выш баланс зачислено ${util.number_format(sum * 0.95)} CC (-5%)\n\nХеш игры: ${game.gamesData[i].convGame.resultData.hash}\nПроверка честности: ${game.gamesData[i].convGame.resultData.result}|${game.gamesData[i].convGame.resultData.secret}`
                            vk.api.messages.send({
                                peer_id: sendId,
                                message: `Итак, результаты раунда...`,
                                random_id: 0,
                                disable_mentions: 1
                            })
                    game.gamesData[i].convData.games  += 1
                    let gamesHis = game.gamesData[i].convData.games
                    game.gamesData[i].convData.history[gamesHis] = {
                    	str: forHis,
                    	secret: `${game.gamesData[i].convGame.resultData.result}|${game.gamesData[i].convGame.resultData.secret}`,
                    	hash: game.gamesData[i].convGame.resultData.hash,
                    	number: game.gamesData[i].convData.games
                    }
                    vk.api.messages.send({
                        peer_id: sendId,
                        message: str,
                        random_id: 0
                    });
                    let result = util.random(1,100)
                    let secret = util.str_rand(20)
                    let text = `${result}|${secret}`
                    let hash = md5(text)
                    game.gamesData[i].convGame.resultData.result = result
                    game.gamesData[i].convGame.resultData.secret = secret
                    game.gamesData[i].convGame.resultData.hash = hash
                    player.playersData[mass[ww].id].userStatistics.winAllTime += Math.floor(sum * 0.95)
                    player.playersData[mass[ww].id].userStatistics.winDay += Math.floor(sum * 0.95)
                    player.playersData[mass[ww].id].userStatistics.winWeek += Math.floor(sum * 0.95)
                    game.gamesData[i].convGame.timeNow = Number(game.gamesData[i].convSettings.maxTime)
                    game.gamesData[i].convGame.bets = {}
                    game.gamesData[i].convGame.amount = 0
                }
            }
       	}
    }, 1000)
}