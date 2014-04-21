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

var vertexColor = gl.getAttribLocation(shaderProgram, "color");
gl.enableVertexAttribArray(vertexColor);

var vertexTranslation = gl.getUniformLocation(shaderProgram, "translation");

var vertexRotationZ = gl.getUniformLocation(shaderProgram, "rotationZ");

var vertexResolution = gl.getUniformLocation(shaderProgram, "resolution");

var vertexScale = gl.getUniformLocation(shaderProgram, "scale");

gl.useProgram(shaderProgram);

var squareBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);
gl.bufferData(
	gl.ARRAY_BUFFER, 
	new Float32Array([
		// Vertical
		// Left
		-21,  46, 0, 123,123,123,1,
	    -21, -82, 0, 90,90,90,1,
	     21, -82, 0, 30,30,30,1,
	     // Right
	     21, -82, 0, 30,30,30,1,
	    -21,  46, 0, 123,123,123,1,
	     21,  46, 0, 90,90,90,1,

	     // Horizontal
	     // Upper
	    -82,  82, 0, 200,200,200,1,
	     83,  46, 0, 100,100,100,1,
	     82,  82, 0, 70,70,70,1,
	     // Bottom
	    -82,  82, 0, 200,200,200,1,
	     83,  46, 0, 100,100,100,1,
	    -82,  46, 0, 70,70,70,1
	]),
	gl.STATIC_DRAW
);


gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 28, 0);
gl.vertexAttribPointer(vertexColor, 4, gl.FLOAT, false, 28, 12);

gl.uniform4f(vertexResolution, canvas.width, canvas.height, 1, 1);

gl.viewport(0.0, 0.0, canvas.width, canvas.height);

var transformations = {
	translateX: 0,
	translateY: 0,
	translateZ: 0,
	rotateZ: 0,
	scaleX: 1,
	scaleY: 1
}

function animate(){

	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.uniformMatrix4fv(vertexTranslation, false, translationMatrix(transformations.translateX,transformations.translateY,0));

	gl.uniformMatrix4fv(vertexRotationZ, false, rotationMatrixZ(transformations.rotateZ));

	gl.uniformMatrix4fv(vertexScale, false, scaleMatrix(transformations.scaleX, transformations.scaleY));

	gl.drawArrays(gl.TRIANGLES, 0, 12);

	gl.flush();

	window.requestAnimationFrame(animate);

};

animate();

