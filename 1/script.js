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

gl.useProgram(shaderProgram);


var squareBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);
gl.bufferData(
	gl.ARRAY_BUFFER, 
	new Float32Array([
		-0.5, -0.5, 0,
	     0.5, -0.5, 0, 
	     0.5,  0.5, 0,
	    -0.5,  0.5, 0,
	    -0.5, -0.5, 0,
	     0.5,  0.5, 0
	]),
	gl.STATIC_DRAW
);


gl.viewport(0.0, 0.0, canvas.width, canvas.height);

gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);

gl.drawArrays(gl.TRIANGLES, 0, 6);
gl.flush();