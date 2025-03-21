module.exports = async function (game, player, context) {
    if(!context.isChat) return
    if (game.gamesData[context.peerId].convData.isActive == true && context.messagePayload && context.messagePayload.action == 'listofgames' && context.messagePayload && context.messagePayload.type == 'conversation') {
    	if(player.playersData[context.senderId].banned == true){
    	return context.send({
    		message: `${player.playersData[context.senderId].mark}${player.playersData[context.senderId].userData.globalSettings.allowCallNickname == true ? `[id${context.senderId}|${player.playersData[context.senderId].name}]` : `${player.playersData[context.senderId].name}`}${player.playersData[context.senderId].mark}, ваш аккаунт заблокирован...`
    	})
    }
	let top = []
	let my = 0
	let topme = []
	for (i in game.gamesData[context.peerId].convData.history) {
                top.push({
                    str: game.gamesData[context.peerId].convData.history[i].str,
                    hash: game.gamesData[context.peerId].convData.history[i].hash,
                    secret: game.gamesData[context.peerId].convData.history[i].secret,
                    id: game.gamesData[context.peerId].convData.history[i].number
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
                if (b.id > a.id) return 1
                if (b.id < a.id) return -1
                return 0
            });
      let text = ""
            for (let s = 0; s < top.length; s++) {
                topme.push(top[s].id)
            }
            if (top.length < 5) {
                for (let j = 0; j < top.length; j++) {
                    my += Number(1)
                    text += `${my}. ${game.gamesData[context.peerId].convData.history[top[j].id].str}\nХеш: ${game.gamesData[context.peerId].convData.history[top[j].id].hash}\nПроверка честности: ${game.gamesData[context.peerId].convData.history[top[j].id].secret}\n\n`
                }
            } else {
                for (let j = 0; j < 5; j++) {
                    my += Number(1)
                    text += `${my}. ${game.gamesData[context.peerId].convData.history[top[j].id].str}\nХеш: ${game.gamesData[context.peerId].convData.history[top[j].id].hash}\nПроверка честности: ${game.gamesData[context.peerId].convData.history[top[j].id].secret}\n\n`
                }
            }
            if(text == "") { 
            	return context.send(`В данной беседе ещё не было игр...`)
            }
        return context.send(`Последние игры:\n\n${text}`)
    }
}