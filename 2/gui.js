var gui = new dat.GUI();
var trans = gui.addFolder("Translate");
trans.add(transformations, 'translateX', -300, 300).name("X");
trans.add(transformations, 'translateY', -300, 300).name("Y");

var rot = gui.addFolder("Rotate");
rot.add(transformations, 'rotateZ', 0, 360).name("Around Z axis");