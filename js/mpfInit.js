var popcorn = {};
var reThinkVideoHack = {};
var ramp_playlistURLString = "http://api.ramp.com/v1/mp2/playlist?";
var ramp_matchesURLString = "http://api.ramp.com/v1/matches?";
var rampURLApiKey = "n7ELYTrOQllZ0zMM9UJqO6CGy6kT7NOW";
var rampURLItemID = 95186469;
var ramp_playlistURLFull = "";
var ramp_matchesURLFull = "";
var questionSubBtn = {};

var MVC = {};
var questionPopUp = {};

//<![CDATA[
	window.mpf_player = {};

	$(function(){
		questionPopUp = $('.questionPopUp');
		questionSubBtn = $('.questionSubBtn');

		ramp_playlistURLFull = ramp_playlistURLString + "apikey=" + rampURLApiKey + "&e=" + rampURLItemID;
		ramp_matchesURLFull = ramp_matchesURLString + "apikey=" + rampURLApiKey + "&itemId=" + rampURLItemID + "&noCache=true";

		window.mpf_player = MetaPlayer("#vidTarget")
		.controlbar({fullscreen: true, annotations: /*"reThinkVideoHack"*/ ""})
		.carousel("#ez-metaq")
		.captionconfig()
		.captions({})
		.transcript("#transcript")
		.searchbar("#searchbar", { cueType: /*"reThinkVideoHack"*/ "" })
		.endcap({})
		.srt()
		.metaq()
		.ramp(ramp_playlistURLFull)
		.load();

		window.mpf_player.video.autoplay = true;

		MVC = {
			reThinkVideoHackModel: RTVH()
		};

		questionSubBtn.bind('click', function(){
			questionPopUp.hide();
			MVC.reThinkVideoHackModel.registerAnswer( mpf_player );
		});

		initPopCornCues();
	});
//]]>

function initPopCornCues(){
	popcorn = Popcorn("#vidTarget");
	popcorn.video.play();
	popcorn.video.muted = true;

	reThinkVideoHack = {
		start: function( e, options ){
			var parsedOptions = {
				start: options.start,
				end: options.end,
				inherits: options.inherits,
				questionText: options.questionText,
				prePhrase: options.prePhrase,
				answer: options.answer,
				resourceId: rampURLItemID,
				resourceQId: rampURLItemID + "_" + options.start
			};

			/*console.log(options);
			console.log(this);*/
			console.log(options.inherits + ' : ' + options.start);
			console.log(parsedOptions);
			MVC.reThinkVideoHackModel.triggerCue( mpf_player, parsedOptions );
		},
		end: function( e, options ){}
	};

	Popcorn.plugin("plugin_metaQAds", reThinkVideoHack);
	
	popcorn.defaults("plugin_metaQAds", {
		inherits: "reThinkVideoHack",
		target: "#vidTarget"
	});
	
	popcorn.parseMetaQ(ramp_matchesURLFull);
}

