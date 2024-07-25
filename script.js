const simulatorWindow = document.querySelector(".sim-window");      // svg window
const addParticle = document.querySelector(".Add-Particle");        // add particle button
const particleSettings = document.querySelector(".particle-settings");
const particleSize = document.querySelector(".particle-size-input");    // size of particle input
const colorInput = document.querySelector(".Color-Input-field");    // color input
const closeDialog = document.querySelector(".close-window");
const createParticle = document.querySelector(".create-particle");    // create and render 
const svgNS = "http://www.w3.org/2000/svg";         // svg namespace URL

const window_dim = {
  win_height: Number(simulatorWindow.getAttribute("height").slice(0,-2)),
  win_width: Number(simulatorWindow.getAttribute("width").slice(0, -2))
};

addParticle.onclick = function()  {
  particleSettings.showModal();
}

closeDialog.onclick = function()  {
  particleSettings.close();
} 

function Particle(size=0, color="#fff")   {
  this.size = size;
  this.color = color;
  this.x = 20;
  this.y = 20;
}

Particle.prototype.updatePosition = function(x, y)  {
  this.x = Math.floor(Math.random()*x);
  this.y = Math.floor(Math.random()*y);
};

function $createCircle(circ_object)  {
  if (!circ_object instanceof Particle)  {
    throw new Error("argument must be instance of Particle");
  }
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("r", `${circ_object.size}`);
  setInterval(function() {
    circ_object.updatePosition(
       window_dim.win_width,
       window_dim.win_height
    );
    circle.setAttribute("cx",`${circ_object.x}`);
    circle.setAttribute("cy",`${circ_object.y}`);
  }, 600);
  circle.style.filter = `drop-shadow(0px 0px 20px ${circ_object.color})`;
  circle.setAttribute("fill",`${circ_object.color}`);
  return circle;
}

createParticle.onclick = function()  {
  const circ_object = new Particle(
    Number(particleSize.value),
    colorInput.value
  );
  const circle = $createCircle(circ_object);
  particleSettings.close();
  simulatorWindow.insertAdjacentElement("beforeend", circle);
}
  
