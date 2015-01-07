var cssWeb = {

	getHeroSliderImages : function(callback){
		affirmasp.getList('{a8f0eb9c-d784-46ee-86c6-333818fd7a06}',callback, {
			logFields : true,
			query		: '<query><orderby><fieldref name="order0" /></orderby></query>',
		});
	}


};