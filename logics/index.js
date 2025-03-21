const keyboards = require('../another/keyboards')
module.exports = async function(db, game, player, vk, context, limits) {
    if(context.text == 'Начать' && !context.isChat || context.text == 'начать' && !context.isChat) {
        return context.send({
            message: `Мы ждали тебя, тыкай кнопки:`,
            keyboard: keyboards.main_menu
        })
    }
    // Частные беседы +
    require('./chat/change') (game, context)
	require('./chat/panel') (game, context, player)
	
    // Общие игровые команды +
    require('./games/bank') (db, game, player, context, vk)
    require('./games/balance') (game, player, context)
	require('./games/transactions') (db, player, vk, context)
    require('./games/day') (db, player, context)
    require('./games/week') (db, player, context)
    require('./games/history') (game, player, context)
	
	// Wheel +
    require('./games/wheel/red') (db, game, player, context, limits);
    require('./games/wheel/black') (db, game, player, context, limits);
    require('./games/wheel/even') (db, game, player, context, limits);
    require('./games/wheel/noteven') (db, game, player, context, limits);
    require('./games/wheel/int112') (db, game, player, context, limits);
    require('./games/wheel/int1324') (db, game, player, context, limits);
    require('./games/wheel/int2536') (db, game, player, context, limits);
    require('./games/wheel/int118') (db, game, player, context, limits);
    require('./games/wheel/int1936') (db, game, player, context, limits);
    require('./games/wheel/zero') (db, game, player, context, limits);
    require('./games/wheel/numbers') (db, game, player, context, limits);
	
	// Dream Catcher +
	require('./games/dreamcatcher/x1') (db, game, player, context, limits)
    require('./games/dreamcatcher/x2') (db, game, player, context, limits)
    require('./games/dreamcatcher/x5') (db, game, player, context, limits)
    require('./games/dreamcatcher/x10') (db, game, player, context, limits)
    require('./games/dreamcatcher/x20') (db, game, player, context, limits)
    require('./games/dreamcatcher/x40') (db, game, player, context, limits)
    
    // Double +
    require('./games/double/x2') (db, game, player, context, limits)
    require('./games/double/x3') (db, game, player, context, limits)
    require('./games/double/x5') (db, game, player, context, limits)
    require('./games/double/x50') (db, game, player, context, limits)
    
    // D7U + 
    require('./games/down7up/down') (db, game, player, context, limits)
    require('./games/down7up/seven') (db, game, player, context, limits)
    require('./games/down7up/up') (db, game, player, context, limits)
    
    // Fortune + 
    require('./games/fortune/fortune') (db, game, player, context, limits)
    
    // Private commands +
	require('./users/changer') (player, context);
	require('./users/games') (context);
	require('./users/dayTop') (db, player, context);
	require('./users/sellerCoins') (player, context, vk);
	require('./users/settings') (player, context);
    require('./users/transfer') (db, player, vk, context);
    require('./users/weekTop') (db, player, context);
    require('./users/project') (context);
    require('./users/how_play') (context);
	
	// Mini Wheel
	require('./games/mini_wheel/red') (db, game, player, context, limits);
    require('./games/mini_wheel/black') (db, game, player, context, limits);
    require('./games/mini_wheel/even') (db, game, player, context, limits);
    require('./games/mini_wheel/noteven') (db, game, player, context, limits);
    require('./games/mini_wheel/int14') (db, game, player, context, limits);
    require('./games/mini_wheel/int58') (db, game, player, context, limits);
    require('./games/mini_wheel/int912') (db, game, player, context, limits);
    require('./games/mini_wheel/int16') (db, game, player, context, limits);
    require('./games/mini_wheel/int712') (db, game, player, context, limits);
    require('./games/mini_wheel/zero') (db, game, player, context, limits);
    require('./games/mini_wheel/numbers') (db, game, player, context, limits);
    
    // Admin +
   require('./manager')(db, player, game, vk, context);
   require('./admin/banUser.js') (player, vk, context)
   require('./admin/giveUser.js') (player, vk, context)
   require('./admin/main') (db, player, game, vk, context)
   require('./admin/statistic') (db, player, vk, context)
   require('./admin/mail') (player, vk, context)
}