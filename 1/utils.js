function getShader(scriptId){

	var element = document.getElementById(scriptId);

	var type;

	if(element.type == 'x-shader/x-vertex'){
		type = gl.VERTEX_SHADER;
	}else if(element.type == 'x-shader/x-fragment'){
		type = gl.FRAGMENT_SHADER;
	}else{
		logError('Invalid shader type');
	}
	
	var shader = gl.createShader(type);
	gl.shaderSource(shader, element.text);
	gl.compileShader(shader);

	if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
		logError("Problem with shader " + gl.getShaderInfoLog(shader));
	}

	return shader;

}

function logError(text){
	console.log('%c ERROR: ' + text + ' ', 'background: #BC1216; color: #fff');
}