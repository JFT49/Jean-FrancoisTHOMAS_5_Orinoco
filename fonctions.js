//créer un element HTML
function createNode(balise) {
    return document.createElement(balise);
};
  
// créer un noeud enfant avec une classe 
function appendNodeClass (parent, node, className) {
    return parent.appendChild(node).setAttribute("class", className);
};
  
//Table de conversion des couleurs non interpretées par le navigateur
function colors(color) {
    let i = color;
    if (color == 'Pale brown'){ i = "#987654"};
    if (color == 'Dark brown'){ i = "#654321"};
    return i;
};