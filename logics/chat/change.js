const util = require('../../another/util')
const md5 = require('md5')
const keyboards = require('../../another/keyboards')
module.exports = async function(game, context) {
	if(!context.text) return
	if(context.text.startsWith("check")) {
		let text = context.text.split(' ');
		if(!text[1]) return context.send(`Параметр «Хеш» указан не верно.`)
		let ends = md5(`${text[1]}`)
		return context.send({
			message: `⚙️ Проверка хеша:\n\nПроверяемая строка: ${text[1]}\n\nЗашифрованый результат: ${ends}`
		})
	}
     if(context.text.includes('game') && context.isChat && game.gamesData[context.peerId].convData.isActive == true || context.text.includes('Game') && context.isChat && game.gamesData[context.peerId].convData.isActive == true) {
          if(context.senderId == game.gamesData[context.peerId].convOwner){
          	if(game.gamesData[context.peerId].convGame.amount >= 1) return context.send(`Изменение режима доступно после завершения игры`)
              let command = context.text.split(' ')[1]
                	if(command == 'wheel') {
                			let secret = util.str_rand(20)
                                let result = null
                                let rand = util.random(0, 36)
                                let redNumbers = [ 1, 3, 5, 9, 7, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
    							let blackNumbers = [ 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
								let greenNumbers = [ 0 ]
								if (redNumbers.includes(rand)) {
                        			entype = `red`
                    			}
                   			 if (blackNumbers.includes(rand)) {
                        			entype = `black`
                    			}
                    			if (rand == 0) {
                        			entype = `green`
                    			}
                    			let text = `${rand}|${entype}|${secret}`
                                let hash = md5(text)
                                game.gamesData[context.peerId].convGame.amount = 0
                        game.gamesData[context.peerId].convGame.resultData.result = rand
                   game.gamesData[context.peerId].convGame.resultData.secret = secret
                game.gamesData[context.peerId].convGame.resultData.hash = hash
             game.gamesData[context.peerId].convGame.bets = {}
          game.gamesData[context.peerId].convData.gamemode = "wheel"
          return context.send({
            message: `Режим игры изменён на Wheel.`,
            keyboard: keyboards.wheel_keyboard
          })
       }
       if(command == 'mini_wheel') {
                			let secret = util.str_rand(20)
                                let result = null
                                let rand = util.random(0, 12)
                                let redNumbers = [ 1, 3, 5, 9, 7, 11 ]
    							let blackNumbers = [ 2, 4, 6, 8, 10, 12 ]
								let greenNumbers = [ 0 ]
								if (redNumbers.includes(rand)) {
                        			entype = `red`
                    			}
                   			 if (blackNumbers.includes(rand)) {
                        			entype = `black`
                    			}
                    			if (rand == 0) {
                        			entype = `green`
                    			}
                    			let text = `${rand}|${entype}|${secret}`
                                let hash = md5(text)
                                game.gamesData[context.peerId].convGame.amount = 0
                        game.gamesData[context.peerId].convGame.resultData.result = rand
                   game.gamesData[context.peerId].convGame.resultData.secret = secret
                game.gamesData[context.peerId].convGame.resultData.hash = hash
             game.gamesData[context.peerId].convGame.bets = {}
          game.gamesData[context.peerId].convData.gamemode = "mini_wheel"
          return context.send({
            message: `Режим игры изменён на Mini Wheel.`,
            keyboard: keyboards.miniWheel_keyboard
          })
       }
                       if(command == 'dream_catcher') {
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
                       game.gamesData[context.peerId].convGame.amount = 0
                       game.gamesData[context.peerId].convGame.resultData.result = result
                       game.gamesData[context.peerId].convGame.resultData.secret = secret
                       game.gamesData[context.peerId].convGame.resultData.hash = hash
                       game.gamesData[context.peerId].convGame.bets = {}
                       game.gamesData[context.peerId].convData.gamemode = "dreamcatcher"
                       return context.send({
                             message: `Режим игры изменён на Dream Catcher.`,
                             keyboard: keyboards.dreamcatcher_keyboard
                       })
                 }
                     if(command == 'double') {
                    let secret = util.str_rand(20)
                    let result = null
                    let rand = util.random(1, 1000)
                    if (rand >= 1 && rand <= 450) result = 'X2'
                    if (rand >= 451 && rand <= 850) result = 'X3'
                    if (rand >= 851 && rand <= 950) result = 'X5'
                    if (rand >= 951 && rand <= 1000) result = 'X50'
                    let hash = md5(result + '|' + secret)
                    game.gamesData[context.peerId].convGame.resultData.result = result
                    game.gamesData[context.peerId].convGame.resultData.secret = secret
                    game.gamesData[context.peerId].convGame.resultData.hash = hash
                    game.gamesData[context.peerId].convGame.amount = 0
                    game.gamesData[context.peerId].convGame.bets = {}
                    game.gamesData[context.peerId].convData.gamemode = "double"
                    return context.send({
                         message: `Режим игры изменён на Double.`,
                         keyboard: keyboards.double_keyboard
                    })
               }
                    if(command == 'under_7_over') {
                    let secret = util.str_rand(20)
                    let rand = util.random(20, 130)
                    if (rand >= 20 && rand <= 30) result = 2
                    if (rand >= 31 && rand <= 40) result = 3
                    if (rand >= 41 && rand <= 50) result = 4
                    if (rand >= 51 && rand <= 60) result = 5
                    if (rand >= 61 && rand <= 70) result = 6
                    if (rand >= 71 && rand <= 80) result = 7
                    if (rand >= 81 && rand <= 90) result = 8
                    if (rand >= 91 && rand <= 100) result = 9
                    if (rand >= 101 && rand <= 110) result = 10
                    if (rand >= 111 && rand <= 120) result = 11
                    if (rand >= 121 && rand <= 130) result = 12
                    let hash = md5(result + '|' + secret)
                    game.gamesData[context.peerId].convGame.resultData.result = result
                    game.gamesData[context.peerId].convGame.resultData.secret = secret
                    game.gamesData[context.peerId].convGame.resultData.hash = hash
                    game.gamesData[context.peerId].convGame.amount = 0
                    game.gamesData[context.peerId].convGame.bets = {}
                    game.gamesData[context.peerId].convData.gamemode = "down7up"
                    return context.send({
                            message: `Режим игры изменён на П7Н.`,
                            keyboard: keyboards.down7up_keyboard
                     })
                    }
                    if (command == 'fortune') {
                    let result = util.random(1,100)
                    let secret = util.str_rand(20)
                    let text = `${result}|${secret}`
                    let hash = md5(text)
                    game.gamesData[context.peerId].convGame.resultData.result = result
                    game.gamesData[context.peerId].convGame.resultData.secret = secret
                    game.gamesData[context.peerId].convGame.resultData.hash = hash
                    game.gamesData[context.peerId].convGame.amount = 0
                    game.gamesData[context.peerId].convGame.bets = {}
                    game.gamesData[context.peerId].convData.gamemode = "fortune"
                    return context.send({
                        message: `Режим игры изменён на Fortune.`,
                        keyboard: keyboards.fortune_keyboard
                    })
                } else {
                	return context.send(`❌ Режим не существует `)
                }
             }
          }
       }