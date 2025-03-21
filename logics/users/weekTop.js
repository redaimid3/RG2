const {Keyboard} = require('vk-io')
const util = require('../../another/util')
module.exports = async function (db, player, context) {
    if (context.messagePayload && !context.isChat) {
        if (context.messagePayload.type == 'private' && context.messagePayload.action == 'weekTop') {
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
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} выиграл ${util.number_format(top[j].win)} коинов (Награда: ${util.shortnum(db.botSettings.topSettings.weekTop.amount[my - 1])} RDC)\n`
                }
            } else {
                for (let j = 0; j < 10; j++) {
                    my += Number(1)
                    text += `${my}) ${player.playersData[top[j].id].mark}[id${player.playersData[top[j].id].id}|${player.playersData[top[j].id].name}]${player.playersData[top[j].id].mark} выиграл ${util.number_format(top[j].win)} коинов (Награда: ${util.shortnum(db.botSettings.topSettings.weekTop.amount[my - 1])} RDC)\n`
                }
            }
            return context.send({
                message: `🌟 Топ игроков недельного рейтинга:\n\n${text}\n\n🏆 Ты находишься на ${find() + 1} месте, выиграв ${util.number_format(player.playersData[context.senderId].userStatistics.winWeek)} RDC за неделю (сброс каждый понедельник в 0:00 по МСК).`,
				reply_to: context.id
			})
        }
    }
}
