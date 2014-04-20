function translationMatrix(x,y,z){
	return [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		x, y, z, 1
	];
}

function rotationMatrixZ(angle){
	angle = angle*Math.PI/180;
	var cos = Math.cos(angle);
	var sin = Math.sin(angle);
	
	return [
		 cos, sin, 0, 0,
		-sin, cos, 0, 0,
		   0,   0, 1, 0,
		   0,   0, 0, 1
	];
}

function scaleMatrix(x,y,z){
	return [
		x, 0, 0, 0,
		0, y, 0, 0,
		0, 0, z, 0,
		0, 0, 0, 1
	];
}