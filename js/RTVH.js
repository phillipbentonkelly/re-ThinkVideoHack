var RTVH = {};

(function(){
	RTVH = function(){
        if( ! (this instanceof RTVH ))
            return new RTVH();
    };

    RTVH.prototype = {
    	processCueInfo: function( options ){
    		console.log("processCueInfo");
    		console.log(options);
    	},
    	triggerCue: function( mpfObjRef ){
    		mpfObjRef.video.pause();
    	},
    	registerAnswer: function(){
    		
    	}
    };
})();