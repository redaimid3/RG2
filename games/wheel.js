const util = require('../another/util')
const md5 = require('md5')
module.exports = async function (game, player, vk, db) {
    let redNumbers = [ 1, 3, 5, 9, 7, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
    let blackNumbers = [ 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
    let int112Numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let int1324Numbers = [ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    let int2536Numbers = [ 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
	let int118Numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ]
	let int1936Numbers = [ 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ]
    let evenNumbers = [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
    let notevenNumbers = [ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35]
    let greenNumbers = [ 0 ]
    setInterval(async () => {
        for (i in game.gamesData) {
            if (game.gamesData[i].convData.isActive == true && game.gamesData[i].convData.gamemode == 'wheel' && game.gamesData[i].convGame.amount > 0) {
                game.gamesData[i].convGame.timeNow -= Number(1)
                if (game.gamesData[i].convGame.timeNow <= 0) {
                    let type = null
                    if (redNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                        type = `красное`
                        entype = `red`
                    }
                    if (blackNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                        type = `чёрное`
                        entype = `black`
                    }
                    if (game.gamesData[i].convGame.resultData.result == 0) {
                        type = `зелёное`
                        entype = `green`
                    }
                    let forHis = `Выпало число ${game.gamesData[i].convGame.resultData.result}, ${type}`
                    let str = `Выпало число ${game.gamesData[i].convGame.resultData.result}, ${type}\n\n`
                    for (d in game.gamesData[i].convGame.bets) {
                        if (game.gamesData[i].convGame.bets[d].red > 0) {
                            if (redNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].red)} CC на красное выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].red * 2)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].red * 2)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].red * 2 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].red)
                            }
                            if (!redNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].red)} CC на красное проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].red)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].black > 0) {
                            if (blackNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].black)} CC на черное выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].black * 2)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].black * 2)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].black * 2 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].black)
                            }
                            if (!blackNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].black)} CC на черное проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].black)
                            }
                         }
                         if (game.gamesData[i].convGame.bets[d].zero > 0) {
                            if (greenNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].zero)} CC на 0 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].zero * 36)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].zero * 36)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].zero * 36 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].zero)
                            }
                            if (!greenNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].zero)} CC на 0 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].zero)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].even > 0) {
                            if (evenNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].even)} CC на четное выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].even * 2)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].even * 2)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].even * 2 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].even)
                            }
                            if (!evenNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].even)} CC на четное проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].even)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].noteven > 0) {
                            if (notevenNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].noteven)} CC на нечетное выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].noteven * 2)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].noteven * 2)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].noteven * 2 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].noteven)
                            }
                            if (!notevenNumbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].noteven)} CC на нечетное проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].noteven)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].int112 > 0) {
                            if (int112Numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].int112)} CC на промежуток 1-12 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].int112 * 3)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].int112 * 3)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int112 * 3 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int112)
                            }
                            if (!int112Numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].int112)} CC на промежуток 1-12 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int112)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].int118 > 0) {
                            if (int118Numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].int118)} CC на промежуток 1-18 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].int118 * 2)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].int118 * 2)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int118 * 2 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int118)
                            }
                            if (!int118Numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].int118)} CC на промежуток 1-18 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int118)
                          	  }
               		   }
                        if (game.gamesData[i].convGame.bets[d].int1936 > 0) {
                            if (int1936Numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].int1936)} CC на промежуток 19-36 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].int1936 * 2)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].int1936 * 2)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int1936 * 2 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int1936)
                            }
                            if (!int1936Numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].int1936)} CC на промежуток 19-36 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int1936)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].int1324 > 0) {
                            if (int1324Numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].int1324)} CC на промежуток 13-24 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].int1324 * 3)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].int1324 * 3)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int1324 * 3 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int1324)
                            }
                            if (!int1324Numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].int1324)} CC на промежуток 13-24 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int1324)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[d].int2536 > 0) {
                            if (int2536Numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].int2536)} CC на промежуток 25-36 выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].int2536 * 3)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].int2536 * 3)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int2536 * 3 - game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int2536)                          
                            }
                            if (!int2536Numbers.includes(game.gamesData[i].convGame.resultData.result)) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].int2536)} CC на промежуток 25-36 проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].int2536)
                            }
                        }
                        for (let o in game.gamesData[i].convGame.bets[d].numbers) {
                            if (game.gamesData[i].convGame.bets[d].numbers[o].number == game.gamesData[i].convGame.resultData.result && game.gamesData[i].convGame.bets[d].numbers[o].amount > 0) {
                                str += `✅ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].numbers[o].amount)} CC на число ${game.gamesData[i].convGame.bets[d].numbers[o].number} выиграла (+${util.number_format(game.gamesData[i].convGame.bets[d].numbers[o].amount * 36)})\n`
                                player.playersData[game.gamesData[i].convGame.bets[d].id].balance += Math.floor(game.gamesData[i].convGame.bets[d].numbers[o].amount * 36)
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data += Math.floor(game.gamesData[i].convGame.bets[d].numbers[o].amount * 36 - game.gamesData[i].convGame.bets[d].numbers[o].amount)
                            }
                        }
                        for (let o in game.gamesData[i].convGame.bets[d].numbers) {
                            if (game.gamesData[i].convGame.bets[d].numbers[o].number != game.gamesData[i].convGame.resultData.result && game.gamesData[i].convGame.bets[d].numbers[o].amount > 0) {
                                str += `❌ ${player.playersData[game.gamesData[i].convGame.bets[d].id].mark}${player.playersData[game.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${game.gamesData[i].convGame.bets[d].id}|${player.playersData[game.gamesData[i].convGame.bets[d].id].name}]` : `${player.playersData[game.gamesData[i].convGame.bets[d].id].name}`}${player.playersData[game.gamesData[i].convGame.bets[d].id].mark} ставка ${util.number_format(game.gamesData[i].convGame.bets[d].numbers[o].amount)} CC на число ${game.gamesData[i].convGame.bets[d].numbers[o].number} проиграла\n`
                                game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(game.gamesData[i].convGame.bets[d].numbers[o].amount)
                            }
                        }
                        if (game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data < 0) {
                            game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data = 0
                        }
                        player.playersData[game.gamesData[i].convGame.bets[d].id].userStatistics.winAllTime += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data)
                        player.playersData[game.gamesData[i].convGame.bets[d].id].userStatistics.winDay += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data)
                        player.playersData[game.gamesData[i].convGame.bets[d].id].userStatistics.winWeek += Math.floor(game.gamesData[i].convGame.bets[game.gamesData[i].convGame.bets[d].id].top_data)
                    }
                    str += `\n\nХеш игры: ${game.gamesData[i].convGame.resultData.hash}\nПроверка честности: ${game.gamesData[i].convGame.resultData.result}|${entype}|${game.gamesData[i].convGame.resultData.secret}`
                    let sendId = game.gamesData[i].id
                    vk.api.messages.send({
                        peer_id: sendId,
                        message: `Итак, результаты раунда...`,
                        random_id: 0
                    })
                    game.gamesData[i].convData.games += 1
                    let gamesHis = game.gamesData[i].convData.games
                    game.gamesData[i].convData.history[gamesHis] = {
                    	str: forHis,
                    	secret: `${game.gamesData[i].convGame.resultData.result}|${entype}|${game.gamesData[i].convGame.resultData.secret}`,
                    	hash: game.gamesData[i].convGame.resultData.hash,
                    	number: game.gamesData[i].convData.games
                    }
                    let pictureWheel = `${db.picturesData.wheel[game.gamesData[i].convGame.resultData.result]}`
                        vk.api.messages.send({
                            peer_id: sendId,
                            message: str,
                            attachment: pictureWheel,
                            random_id: 0,
                            disable_mentions: 1
                        });
                    let secret = util.str_rand(20)
                    let result = util.random(0, 36)
                    let color = null
    				if (redNumbers.includes(result)) {
                        color = `red`
                    }
                    if (blackNumbers.includes(result)) {
                        color = `black`
                    }
                    if (result == 0) {
                        color = `green`
                    }
                    let text = `${result}|${color}|${secret}`
                    let hash = md5(text)
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