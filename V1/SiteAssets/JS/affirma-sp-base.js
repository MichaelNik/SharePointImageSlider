// Avoid `console` errors in browsers that lack a console. 
// IE has lots of problems with this, especially when the site is Sharepoint
(function(){var e;var t=function(){};var n=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"];var r=n.length;var i=window.console=window.console||{};while(r--){e=n[r];if(!i[e]){i[e]=t}}})()



var affirmasp = {
	urlParams : {},
	inEditMode : false,
	getList : function(id, callback, options){
		if($){
			var settings = $.extend({
				logFields	: false,
				query		: '<Query><OrderBy><FieldRef Name="ID"/></OrderBy></Query>',
			}, options);
			
			$().SPServices({ 
			    operation: "GetListItems",
			    listName: id,
				CAMLViewFields: "<ViewFields Properties='True' />",			    
			    CAMLQuery: settings.query, 
			    async: false,
			    completefunc: function (data, Status) {
			    	var rowData = $(data.responseXML).SPFilterNode("z:row");
			    	if(settings.logFields){
			    		//console.log('Logging List fields ///////////////////////');
						rowData.each(function() {
				            //console.log('New Row ---------------------');
				            $.each(this.attributes, function(i, attrib){
				          	   var name = attrib.name;
						       var value = attrib.value;
						       //console.log(name +': '+value);
						    });
						});
				    }
				    callback(rowData);
				}
			});	
		}
	},
	setUrlParams : function(){
		var me = this;
		
		var paramString = window.location.search.substr(1);
		var paramArray = paramString.split ("&");
		var params = {};
		for ( var i = 0; i < paramArray.length; i++) {
		    var tempArray = paramArray[i].split("=");
		    params[tempArray[0]] = tempArray[1];
		}
		me.urlParams = params;
	}
}

affirmasp.setUrlParams();

$(document).ready(function(){
	var inEditMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;
	if(inEditMode){
		$('body').addClass('edit-mode');
	}
	affirmasp.inEditMode = inEditMode;
});

