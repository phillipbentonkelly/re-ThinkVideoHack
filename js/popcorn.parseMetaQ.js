(function (Popcorn) {
	Popcorn.parser( "parseMetaQ", function( data ) {
        var events = [];
        var xmlDoc = $(data.xml);
        var xmlMatches = xmlDoc.find('Match');

        for(var i = 0; i < xmlMatches.length; i++){
            try{
                var currMatch = xmlMatches[i];
                var currMatchObj = $(xmlMatches[i]);
                var currObj = {};
                    var atts = currMatchObj.find('Attribute');
                    var typeName = currMatchObj.find('Type').text();
                    currObj[typeName] = {};

                    currObj[typeName]['start'] = currMatchObj.find('StartTime').text();
                    currObj[typeName]['end'] = currMatchObj.find('EndTime').text();

                    for(var g = 0; g < atts.length; g++){
                        currObj[typeName][$(atts[g]).find('Name').text()] = $(atts[g]).find('Value').text();
                    }
                events.push(currObj);
            }catch(err){}
        }

        return { data : events };
    });
})( Popcorn );
