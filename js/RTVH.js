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
    	triggerCue: function( mpfObjRef, data ){
    		mpfObjRef.video.pause();

            $(questionPopUp.find('.questionText')).text(data.questionText);
            $(questionPopUp.find('.prePrase')).text(data.prePhrase);
            $(questionPopUp.find('input[id]')).attr('id', data.resourceQId);

            questionPopUp.show();
    	},
    	registerAnswer: function( mpfObjRef ){
            $(questionPopUp.find('input[id]')).attr('value', "");
    		mpfObjRef.video.play();
    	}
    };
})();