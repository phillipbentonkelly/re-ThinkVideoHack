//<![CDATA[
	var popcorn = {};
	var reThinkVideoHack = {};
	var ramp_playlistURLString = "http://api.ramp.com/v1/mp2/playlist?";
	var ramp_matchesURLString = "http://api.ramp.com/v1/matches?";
	var rampURLApiKey = "n7ELYTrOQllZ0zMM9UJqO6CGy6kT7NOW";
	var rampURLItemID = 95186469;
	var ramp_playlistURLFull = "";
	var ramp_matchesURLFull = "";
	
	window.mpf_player = {};

	$(function(){
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

		window.mpf_player.video.autoplay = false;

		initPopCornCues();
	});
//]]>

function initPopCornCues(){
	popcorn = Popcorn("#vidTarget");
	popcorn.video.play();
	popcorn.video.muted = true;

	reThinkVideoHack = {
		start: function( e, options ){
			console.log(options);
			console.log(options.inherits + ' : ' + options.start);
			reThinkVideoHack.triggerCue(options);
		},
		end: function( e, options ){
			metaQAds_ObjExtension.releaseLock();
		}
	};

	Popcorn.plugin("plugin_metaQAds", reThinkVideoHack);
	
	popcorn.defaults("plugin_metaQAds", {
		inherits: "reThinkVideoHack",
		target: "#vidTarget"
	});
	
	popcorn.parseMetaQ(ramp_matchesURLFull);
}

