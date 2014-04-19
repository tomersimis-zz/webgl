var canvas = document.querySelector("canvas");
var gl = canvas.getContext("experimental-webgl");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var vertexShader = getShader("vertex-shader");
var fragmentShader = getShader("fragment-shader");

var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);


if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    logError("Error in program linking:" + gl.getProgramInfoLog (shaderProgram));
}


var vertexPosition = gl.getAttribLocation(shaderProgram, "position");
gl.enableVertexAttribArray(vertexPosition);

var vertexTranslation = gl.getUniformLocation(shaderProgram, "translation");

var vertexRotationZ = gl.getUniformLocation(shaderProgram, "rotationZ");

var vertexResolution = gl.getUniformLocation(shaderProgram, "resolution");

gl.useProgram(shaderProgram);

var squareBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);
gl.bufferData(
	gl.ARRAY_BUFFER, 
	new Float32Array([
		-21, 82, 0,
	    -21, -82, 0,
	    21,-82, 0,
	    21,-82, 0,
	    -21, 82, 0,
	    21,82, 0,
	    -82, 82, 0,
	    83, 46, 0,
	    82, 82, 0,
	    -82, 82, 0,
	    83, 46, 0,
	    -82, 46, 0
	]),
	gl.STATIC_DRAW
);


gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);

gl.uniform4f(vertexResolution, canvas.width, canvas.height, 1, 1);

gl.viewport(0.0, 0.0, canvas.width, canvas.height);

var transformations = {
	translateX: 0,
	translateY: 0,
	translateZ: 0,
	rotateZ: 30
}

function animate(){

	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.uniformMatrix4fv(vertexTranslation, false, translationMatrix(transformations.translateX,transformations.translateY,0));

	gl.uniformMatrix4fv(vertexRotationZ, false, rotationMatrixZ(transformations.rotateZ));

	gl.drawArrays(gl.TRIANGLES, 0, 12);

	gl.flush();

	window.requestAnimationFrame(animate);

};

animate();

