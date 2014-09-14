/* TODO 
// trouver un moyen de chopper le nom interne des custom controls (MatchName ?) pour pouvoir filtrer efficacement les effets ajoutés.

*/


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
        
        var effectLayer;
        var matchName;
        
        var listTransformEffectsToExport = [];
        var i;
        
        for(i = 1; i<=numEffects; i++){
            effectLayer = layer.Effects.property(i);
            matchName = effectLayer.matchName;
            if(matchName == "Transform_P-RZ-RY-RX" && effectLayer.property("Export").value == 1){
                listTransformEffectsToExport.push(effectLayer);
            }
        }
        
        for(i = 0; i<listTransformEffectsToExport.length; i++){         
                var control = listTransformEffectsToExport[i];
                
                var name = control.name;
                var pX = control.property("Position XY").value[0];
                var pY = control.property("Position XY").value[1];
                var pZ = control.property("Position Z").value;
                var rX = control.property("Rotation XY").value[0];
                var rY = control.property("Rotation XY").value[1];
                var rZ = control.property("Rotation Z").value;
                
                var jsonObject = '{"name":"'+name+'","x":'+pX+',"y":'+pY+',"z":'+pZ+',"rotationX":'+rX+',"rotationY":'+rY+',"rotationZ":'+rZ+'}';
                    
                if(i < listTransformEffectsToExport.length-1){
                    jsonObject += ',';
                }

                file.writeln(jsonObject);
        }
            
        file.writeln(']}');
		file.close();
	}
    
    alert("Export complete");
}

var comp = app.project.activeItem;
var layer = comp.selectedLayers[0];

getAndWriteData(comp, layer);