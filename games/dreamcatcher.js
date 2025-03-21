const util = require('../another/util')
const md5 = require('md5')
module.exports = async function (game, player, vk, db) {
    setInterval(async () => {
        for (i in game.gamesData) {
            if (game.gamesData[i].convData.isActive == true && game.gamesData[i].convData.gamemode == 'dreamcatcher' && game.gamesData[i].convGame.amount > 0) {
                game.gamesData[i].convGame.timeNow -= Number(1)
                if (game.gamesData[i].convGame.timeNow <= 0) {
                	let forHis = `Выпал коэффициент ${game.gamesData[i].convGame.resultData.result}`
                    let str = `Выпал коэффициент ${game.gamesData[i].convGame.resultData.result}\n\n`
                    for (d in game.gamesData[i].convGame.bets) {
                        if (game.gamesData[i].convGame.bets[d].x1 > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 'x1') {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x1)} CC на коэффициент x1 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].x1 * 1)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].x1 * 1 + game.gamesData[i].convGame.bets[d].x1)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x1 * 1 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x1)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 'x1') {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x1)} CC на коэффициент x1 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x1)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].x2 > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 'x2') {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x2)} CC на коэффициент x2 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].x2 * 2)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].x2 * 2 + game.gamesData[i].convGame.bets[d].x2)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x2 * 2 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x2)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 'x2') {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x2)} CC на коэффициент x2 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x2)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].x5 > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 'x5') {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x5)} CC на коэффициент x5 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].x5 * 5)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].x5 * 5 + game.gamesData[i].convGame.bets[d].x5)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x5 * 5 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x5)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 'x5') {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x5)} CC на коэффициент x5 проиграла\n` 
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x5)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].x10 > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 'x10') {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x10)} CC на коэффициент x10 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].x10 * 10)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].x10 * 10 + game.gamesData[i].convGame.bets[d].x10)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x10 * 10 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x10)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 'x10') {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x10)} CC на коэффициент x10 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x10)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].x20 > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 'x20') {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x20)} CC на коэффициент x20 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].x20 * 20)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].x20 * 20 + game.gamesData[i].convGame.bets[d].x20)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x20 * 20 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x20)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 'x20') {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x20)} CC на коэффициент x20 проиграла\n` 
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x20)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].x40 > 0) {
                            if (game.gamesData[i].convGame.resultData.result == 'x40') {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x40)} CC на коэффициент x40 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].x40 * 40)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].x40 * 40 + game.gamesData[i].convGame.bets[d].x40)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x40 * 40 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x40)
                            }
                            if (game.gamesData[i].convGame.resultData.result != 'x40') {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].x40)} CC на коэффициент x40 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].x40)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data < 0) {
                            game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data = 0
                        }
                        player.playersData[game.gamesData[i].convGame.bets[d].id].userStatistics.winAllTime += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data)
                        player.playersData[game.gamesData[i].convGame.bets[d].id].userStatistics.winDay += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data)
                        player.playersData[game.gamesData[i].convGame.bets[d].id].userStatistics.winWeek += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data)
                    }
                    str += `\n\nХеш игры: ${game.gamesData[i].convGame.resultData.hash}\nПроверка честности: ${game.gamesData[i].convGame.resultData.result}|${game.gamesData[i].convGame.resultData.secret}`
                    let sendId = game.gamesData[i].id
                    vk.api.messages.send({
                        peer_id: sendId,
                        message: `Итак, результаты раунда...`,
                        random_id: 0
                    })
                    game.gamesData[i].convData.games  += 1
                    let gamesHis = game.gamesData[i].convData.games
                    game.gamesData[i].convData.history[gamesHis] = {
                    	str: forHis,
                    	secret: `${game.gamesData[i].convGame.resultData.result}|${game.gamesData[i].convGame.resultData.secret}`,
                    	hash: game.gamesData[i].convGame.resultData.hash,
                    	number: game.gamesData[i].convData.games
                    }
                    if(game.gamesData[i].convGame.resultData.result == `x1`){
                    	let randomMessageID = `${util.random(1, 16)}`
                    let pictureDream = `${db.picturesData.dream.x1[randomMessageID]}`
                    game.gamesData[sendId].convGame.pictureGame = pictureDream
                    }
                    if(game.gamesData[i].convGame.resultData.result == `x2`){
                    	let randomMessageID = `${util.random(1, 10)}`
                    let pictureDream = `${db.picturesData.dream.x2[randomMessageID]}`
                    game.gamesData[sendId].convGame.pictureGame = pictureDream
                    }
                    if(game.gamesData[i].convGame.resultData.result == `x5`){
                    	let randomMessageID = `${util.random(1, 5)}`
                    let pictureDream = `${db.picturesData.dream.x5[randomMessageID]}`
                    game.gamesData[sendId].convGame.pictureGame = pictureDream
                    }
                    if(game.gamesData[i].convGame.resultData.result == `x10`){
                    	let randomMessageID = `${util.random(1, 3)}`
                    let pictureDream = `${db.picturesData.dream.x10[randomMessageID]}`
                    game.gamesData[sendId].convGame.pictureGame = pictureDream
                    }
                    if(game.gamesData[i].convGame.resultData.result == `x20`){
                    	let randomMessageID = `${util.random(1, 2)}`
                    let pictureDream = `${db.picturesData.dream.x20[randomMessageID]}`
                    game.gamesData[sendId].convGame.pictureGame = pictureDream
                    }
                    if(game.gamesData[i].convGame.resultData.result == `x40`){
                    	let randomMessageID = `${util.random(1, 1)}`
                    let pictureDream = `${db.picturesData.dream.x40[randomMessageID]}`
                    game.gamesData[sendId].convGame.pictureGame = pictureDream
                    }
                        vk.api.messages.send({
                            peer_id: sendId,
                            message: str,
                            attachment: game.gamesData[sendId].convGame.pictureGame,
                            random_id: 0,
                            disable_mentions: 1
                        })
                    let secret = util.str_rand(20)
                    let result = null
                    let rand = util.random(1, 100)
                    if (rand >= 1 && rand <= 42) result = 'x1'
                    if (rand >= 43 && rand <= 69) result = 'x2'
                    if (rand >= 70 && rand <= 82) result = 'x5'
                    if (rand >= 83 && rand <= 89) result = 'x10'
                    if (rand >= 90 && rand <= 95) result = 'x20'
                    if (rand >= 96 && rand <= 100) result = 'x40'
                    let hash = md5(result + '|' + secret)
                    game.gamesData[i].convGame.resultData.result = result
                    game.gamesData[i].convGame.resultData.secret = secret
                    game.gamesData[i].convGame.resultData.hash = hash
                    game.gamesData[i].convGame.timeNow = Number(game.gamesData[i].convSettings.maxTime)
                    game.gamesData[i].convGame.bets = {}
                    game.gamesData[i].convGame.amount = 0
                }
            }
        }
    }, 1000)
}