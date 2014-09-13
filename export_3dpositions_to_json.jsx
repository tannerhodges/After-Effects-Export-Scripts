
function getAndWriteData(comp, layer)
{
	
	// open the file
	var file = new File("positions.json");
    
    var numEffects = layer.Effects.numProperties;    
    
	if (file.open("w"))
	{
        file.writeln('/* 3D positions exported from Export 3DPositions to JSON');		
		file.writeln('Written by Silvere Marechal for personal AE to CSS 3D Transform workflow');
		file.writeln('https://github.com/turbodrive');
        file.writeln('');
        file.writeln('Based on the exporter by Thomas Apodaca https://github.com/tmaybe */');
        file.writeln('');
        file.writeln('{"targets":[');
        
        for(var i = 1; i<=numEffects; i++){
            
            var effectLayer = layer.Effects.property(i);
            var name = effectLayer.name;
            var pX = effectLayer.property("Position XY").value[0];
            var pY = effectLayer.property("Position XY").value[1];
            var pZ = effectLayer.property("Position Z").value;
            var rX = effectLayer.property("Rotation XY").value[0];
            var rY = effectLayer.property("Rotation XY").value[1];
            var rZ = effectLayer.property("Rotation Z").value;
                        
            if(pX != null && pY != null && pZ != null && rX != null && rY != null && rZ != null){
                var jsonObject = '{"name":"'+name+'","x":'+pX+',"y":'+pY+',"z":'+pZ+',"rotationX":'+rX+',"rotationY":'+rY+',"rotationZ":'+rZ+'}';
                if(i < numEffects) jsonObject += ',';
            
                    file.writeln(jsonObject);
            }
            
        }
        file.writeln(']}');
		file.close();
	}
    
    alert("Export complete");
}

var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];

getAndWriteData(comp, layer);