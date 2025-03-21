const { Keyboard } = require('vk-io')
module.exports = {
    main_menu: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `▶️ Играть`, payload: { type: 'private', action: 'gamelist' }, color: 'positive' })
        ], 
        [
           Keyboard.textButton({ label: `💳 Пополнить баланс`, color: 'secondary', payload: { action: 'seller', type: 'private'  } }),
           Keyboard.textButton({ label: `🤝 Перевести другу`, color: 'secondary', payload: { action: 'transfer',  type: 'private' } })
        ],
        [
            Keyboard.textButton({ label: `⚙️ Настройки`, color: 'primary', payload: { action: 'settings', type: 'private' } }),
        ],
        [
            Keyboard.textButton({ label: `👑 Топ недели`, color: 'negative', payload: { action: 'weekTop', type: 'private' } }),
            Keyboard.textButton({ label: `👑  Топ дня`, color: 'negative', payload: { action: 'dayTop', type: 'private' } })
        ],
        [
        	Keyboard.textButton({ label: `✅ Проверенные проекты`, color: 'negative', payload: { action: 'project', type: 'private' } })
        ],
        [
                Keyboard.textButton({ label: `Как играть?`, color: 'primary', payload: { action: 'howtoplay', type: 'private' } })
        ]
    ]),
    wheel_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Банк`, payload: { type: 'conversation', action: 'bank' }, color: 'positive' }),
            Keyboard.textButton({ label: `Баланс`, payload: { type: 'conversation', action: 'balance' }, color: 'positive' })
        ],
        [
            Keyboard.textButton({ label: `Четное`,  payload: { action: 'wheel', bet: 'even', type: 'conversation' }, color: 'primary' }),
            Keyboard.textButton({ label: `На число`,  payload: { action: 'wheel', bet: 'numbers', type: 'conversation' }, color: 'primary' }),
            Keyboard.textButton({ label: `Нечетное`,  payload: { action: 'wheel', bet: 'noteven', type: 'conversation' }, color: 'primary' })        
        ],
        [
            Keyboard.textButton({ label: `1-18`,  payload: { action: 'wheel', bet: '1-18', type: 'conversation' }, color: 'secondary' }),
            Keyboard.textButton({ label: `19-36`,  payload: { action: 'wheel', bet: '19-36', type: 'conversation' }, color: 'secondary' })
		],
        [
            Keyboard.textButton({ label: `1-12`,  payload: { action: 'wheel', bet: '1-12', type: 'conversation' }, color: 'secondary' }),
            Keyboard.textButton({ label: `13-24`,  payload: { action: 'wheel', bet: '13-24', type: 'conversation' }, color: 'secondary' }),
            Keyboard.textButton({ label: `25-36`,  payload: { action: 'wheel', bet: '25-36', type: 'conversation' }, color: 'secondary' })      
        ],
        [
            Keyboard.textButton({ label: `Красное`,  payload: { action: 'wheel', bet: 'red', type: 'conversation' }, color: 'positive' }),
            Keyboard.textButton({ label: `0`,  payload: { action: 'wheel', bet: 'zero', type: 'conversation' }, color: 'positive' }),
            Keyboard.textButton({ label: `Черное`, payload: { action: 'wheel', bet: 'black', type: 'conversation' }, color: 'positive' })
        ]
    ]),
    dreamcatcher_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Банк`, payload: { type: 'conversation', action: 'bank' }, color: 'positive' }),
            Keyboard.textButton({ label: `Баланс`, payload: { type: 'conversation', action: 'balance' }, color: 'positive' })
        ],
        [
            Keyboard.textButton({ label: `x1`,  payload: { action: 'dreamcatcher', bet: 'X1', type: 'conversation' }, color: 'secondary' }),
            Keyboard.textButton({ label: `x2`, payload: { action: 'dreamcatcher', bet: 'X2', type: 'conversation' }, color: 'secondary' }),
            Keyboard.textButton({ label: `x5`, payload: { action: 'dreamcatcher', bet: 'X5', type: 'conversation' }, color: 'secondary' })
        ],
        [
            Keyboard.textButton({ label: `x10`,  payload: { action: 'dreamcatcher', bet: 'X10', type: 'conversation' }, color: 'positive' }),
            Keyboard.textButton({ label: `x20`, payload: { action: 'dreamcatcher', bet: 'X20', type: 'conversation' }, color: 'positive' }),
            Keyboard.textButton({ label: `x40`, payload: { action: 'dreamcatcher', bet: 'X40', type: 'conversation' }, color: 'positive' })
        ]
    ]),
    double_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Банк`, payload: { type: 'conversation', action: 'bank'}, color: 'positive' }),
            Keyboard.textButton({ label: `Баланс`, payload: { type: 'conversation', action: 'balance' }, color: 'positive' })
        ],
        [
            Keyboard.textButton({ label: `x2`,  payload: { action: 'double', bet: 'X2', type: 'conversation' }, color: 'secondary' }),
            Keyboard.textButton({ label: `x3`, payload: { action: 'double', bet: 'X3', type: 'conversation' }, color: 'secondary' }),
            Keyboard.textButton({ label: `x5`, payload: { action: 'double', bet: 'X5', type: 'conversation' }, color: 'secondary' })
        ],
        [
            Keyboard.textButton({ label: `x50`, payload: { action: 'double', bet: 'X50', type: 'conversation' }, color: 'positive' })
        ]  
    ]),
    down7up_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Банк`, payload: { type: 'conversation', action: 'bank'}, color: 'positive' }),
            Keyboard.textButton({ label: `Баланс`, payload: { type: 'conversation', action: 'balance' }, color: 'positive' })
        ],
        [
            Keyboard.textButton({ label: `Под`,  payload: { action: 'd7u', bet: 'down', type: 'conversation'}, color: 'secondary' }),
            Keyboard.textButton({ label: `7`, payload: { action: 'd7u', bet: '7', type: 'conversation'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Над`, payload: { action: 'd7u', bet: 'up', type: 'conversation'}, color: 'secondary' })
        ]
    ]),
    fortune_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Сделать ставку`, payload: { action: 'fortune', bet: 'bet', type: 'conversation'}, color: 'positive' })

        ],
        [
            Keyboard.textButton({ label: `Банк`, payload: { type: 'conversation', action: 'bank'}, color: 'primary' }),
            Keyboard.textButton({ label: `Баланс`, payload: { type: 'conversation', action: 'balance'}, color: 'primary' })
        ]
    ]),
    dice_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Банк`, payload: { type: 'conversation', action: 'bank'}, color: 'positive' }),
            Keyboard.textButton({ label: `Баланс`, payload: { type: 'conversation', action: 'balance' }, color: 'positive' })
        ],
        [
            Keyboard.textButton({ label: `1`,  payload: { action: 'dice', bet: '1', type: 'conversation'}, color: 'primary' }),
            Keyboard.textButton({ label: `2`,  payload: { action: 'dice', bet: '2', type: 'conversation'}, color: 'primary' }),
            Keyboard.textButton({ label: `3`,  payload: { action: 'dice', bet: '3', type: 'conversation'}, color: 'primary' })
        ],
        [
            Keyboard.textButton({ label: `4`,  payload: { action: 'dice', bet: '4', type: 'conversation'}, color: 'primary' }),
            Keyboard.textButton({ label: `5`,  payload: { action: 'dice', bet: '5', type: 'conversation'}, color: 'primary' }),
            Keyboard.textButton({ label: `6`,  payload: { action: 'dice', bet: '6', type: 'conversation'}, color: 'primary' })
        ],
        [
        	Keyboard.textButton({ label: `Чётное`, payload: { action: 'dice', bet: 'even', type: 'conversation'}, color: 'secondary' }),
            Keyboard.textButton({ label: `Нечётное`, payload: { action: 'dice', bet: 'odd', type: 'conversation'}, color: 'secondary' })
		]
    ]),
    miniWheel_keyboard: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Банк`, payload: { type: 'conversation', action: 'bank' }, color: 'positive' }),
            Keyboard.textButton({ label: `Баланс`, payload: { type: 'conversation', action: 'balance' }, color: 'positive' })
        ],
        [
            Keyboard.textButton({ label: `Четное`,  payload: { action: 'mini_wheel', bet: 'even', type: 'conversation' }, color: 'primary' }),
            Keyboard.textButton({ label: `На число`,  payload: { action: 'mini_wheel', bet: 'numbers', type: 'conversation' }, color: 'primary' }),
            Keyboard.textButton({ label: `Нечетное`,  payload: { action: 'mini_wheel', bet: 'noteven', type: 'conversation' }, color: 'primary' })        
        ],
        [
            Keyboard.textButton({ label: `1-6`,  payload: { action: 'mini_wheel', bet: '1-6', type: 'conversation' }, color: 'secondary' }),
            Keyboard.textButton({ label: `7-12`,  payload: { action: 'mini_wheel', bet: '7-12', type: 'conversation' }, color: 'secondary' })
		],
        [
            Keyboard.textButton({ label: `1-4`,  payload: { action: 'mini_wheel', bet: '1-4', type: 'conversation' }, color: 'secondary' }),
            Keyboard.textButton({ label: `5-8`,  payload: { action: 'mini_wheel', bet: '5-8', type: 'conversation' }, color: 'secondary' }),
            Keyboard.textButton({ label: `9-12`,  payload: { action: 'mini_wheel', bet: '9-12', type: 'conversation' }, color: 'secondary' })      
        ],
        [
            Keyboard.textButton({ label: `Красное`,  payload: { action: 'mini_wheel', bet: 'red', type: 'conversation' }, color: 'positive' }),
            Keyboard.textButton({ label: `0`,  payload: { action: 'mini_wheel', bet: 'zero', type: 'conversation' }, color: 'positive' }),
            Keyboard.textButton({ label: `Черное`, payload: { action: 'mini_wheel', bet: 'black', type: 'conversation' }, color: 'positive' })
        ]
    ]),
    peer_menu: Keyboard.keyboard([
        [
            Keyboard.textButton({ label: `Премиальная (50 000 RD) 1%`, payload: { type: 'conversation', action: 'buy_chat', info: 'premium' }, color: 'positive' })
        ],
        [
        	Keyboard.textButton({ label: `Стандартная (1 000 RD) 0%`, payload: { type: 'conversation', action: 'buy_chat', info: 'standart' }, color: 'positive' })
        ]
    ])
}