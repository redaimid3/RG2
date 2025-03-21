const util = require('../../another/util')
module.exports = async function (db, player, context) {
    if (context.isChat) {
        if (context.text == 'Ñ‚Ð¾Ð¿ Ð½ÐµÐ´ÐµÐ»Ð¸' || context.text == 'Ð¢Ð¾Ð¿ Ð½ÐµÐ´ÐµÐ»Ð¸') {
            let top = []
            let topme = []
            let my = 0
            for (let i in player.playersData) {
                top.push({
                    id: player.playersData[i].id,
                    name: player.playersData[i].name,
                    win: player.playersData[i].userStatistics.winWeek
                })
            }
            const find = () => {
                let pos = 1000;
                for (let i = 0; i < top.length; i++) {
                    if (top[i].id === context.senderId) return pos = i;
                }
                return pos;
            }
            top.sort(function (a, b) {
                if (b.win > a.win) return 1
                if (b.win < a.win) return -1
                return 0
            });
            let text = ""
            for (let s = 0; s < top.length; s++) {
                topme.push(top[s].id)
            }
            if (top.length < 10) {
                for (let j = 0; j < top.length; j++) {
                    my += Number(1)
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} Ð²Ñ‹Ð¸Ð³Ñ€Ð°Ð» ${util.number_format(top[j].win)} ÐºÐ¾Ð¸Ð½Ð¾Ð² (Ð�Ð°Ð³Ñ€Ð°Ð´Ð°: ${util.shortnum(db.botSettings.topSettings.weekTop.amount[my - 1])} RDC)\n`
                }
            } else {
                for (let j = 0; j < 10; j++) {
                    my += Number(1)
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} Ð²Ñ‹Ð¸Ð³Ñ€Ð°Ð» ${util.number_format(top[j].win)} ÐºÐ¾Ð¸Ð½Ð¾Ð² (Ð�Ð°Ð³Ñ€Ð°Ð´Ð°: ${util.shortnum(db.botSettings.topSettings.weekTop.amount[my - 1])} RDC)\n`
                }
            }
            return context.send({
                message: `ðŸ”¥ Ð¢Ð¾Ð¿ Ð¸Ð³Ñ€Ð¾ÐºÐ¾Ð² Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¾Ð³Ð¾ Ñ€ÐµÐ¹Ñ‚Ð¸Ð½Ð³Ð°:\n\n${text}\n\nðŸ�† Ð¢Ñ‹ Ð½Ð°Ñ…Ð¾Ð´Ð¸ÑˆÑŒÑ�Ñ� Ð½Ð° ${find() + 1} Ð¼ÐµÑ�Ñ‚Ðµ, Ð²Ñ‹Ð¸Ð³Ñ€Ð°Ð² ${util.number_format(player.playersData[context.senderId].userStatistics.winWeek)} RDC Ð·Ð° Ð½ÐµÐ´ÐµÐ»ÑŽ (Ñ�Ð±Ñ€Ð¾Ñ� ÐºÐ°Ð¶Ð´Ñ‹Ð¹ Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº Ð² 0:00 Ð¿Ð¾ ÐœÐ¡Ðš).`, disable_mentions: 1  })
        }
    }
}
