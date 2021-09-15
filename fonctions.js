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

// Retourne le choix de customisation en fonction du type de produit
function typeChoix(produit) {
    let i;
    if (produit == 'teddies'){ i = "colors"};
    if (produit == 'cameras'){ i = "lenses"};
    if (produit == 'furniture'){ i = "varnish"};
    return i;
};

//recuperer un objet JSON dans le localStorage
function getStorage (rang) {
    return JSON.parse(localStorage.getItem(rang));
};

//Mettre le premiere lettre du chaine en majuscule
function firstMaj (chaine) {
    return chaine[0].toUpperCase() + chaine.substr(1);
};

//Stoquage d'un article dans le panier (localstorage)
function ajoutPanier(produit, id) {
    let nbChoix = document.getElementsByName("flexRadioDefault").length;
    for (var i=0; i < nbChoix; i++){
        if (document.getElementById("flexRadioDefault"+i).checked) {
          custom = document.getElementById("flexRadioDefault"+i).value;
        };
    };

    let nb = 0;

    let objetJSON = {
        product: produit, 
        id: id,
        custom: custom,
        nombre: nb
    };
    let objetLinea = JSON.stringify(objetJSON);
    let nbArticle = localStorage.length;
    localStorage.setItem(nbArticle, objetLinea);

    for (var i=0; i<localStorage.length;i++){
         objetJSON = getStorage (i);
        if (id == objetJSON.id && custom == objetJSON.custom) {
            objetJSON.nombre += 1;
            objetLinea = JSON.stringify(objetJSON);
            localStorage.setItem(i, objetLinea);
            break;
        };
    };
    
    for (var i=0; i<localStorage.length;i++){
        objetJSON = getStorage (i);
       if (objetJSON.nombre == 0) {
           localStorage.removeItem(i);
       };
   };
};

////////////////////////////////////
function regardePanier() {
    let j = localStorage.length;
    for (var i=0; i<j; i++){
        let objetLinea = localStorage.getItem(i);
        let objetJSON = JSON.parse(objetLinea);
        console.log(objetJSON);
    };
};