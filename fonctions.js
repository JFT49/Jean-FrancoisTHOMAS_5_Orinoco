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

//mise en forme du prix

function prixEuro(price) {
    return  (price/100).toFixed(2)+" Euro";
}

//recuperer un objet JSON dans le localStorage
function getStorage (rang) {
    return JSON.parse(localStorage.getItem(rang));
};

//Mettre le premiere lettre du chaine en majuscule
function firstMaj (chaine) {
    return chaine[0].toUpperCase() + chaine.substr(1);
};

//Stoquage d'un article dans le panier (localstorage)
function ajoutPanier(produit, id, prix) {
    //recuperation du choix du custom
    let nbChoix = document.getElementsByName("flexRadioDefault").length;
    for (var i=0; i < nbChoix; i++){
        if (document.getElementById("flexRadioDefault"+i).checked) {
          custom = document.getElementById("flexRadioDefault"+i).value;
        };
    };

    //creation du produit (en objetJSON) injecter dans local storage avec nb=0
    let nb = 0;
    let objetJSON = {
        product: produit, 
        id: id,
        custom: custom,
        nombre: nb,
        price: prix
    };
    let objetLinea = JSON.stringify(objetJSON);
    let nbArticle = localStorage.length;
    localStorage.setItem(nbArticle, objetLinea);

    //contatenation des produits dans localstorage
    for (var i=0; i<localStorage.length;i++){
         objetJSON = getStorage (i);
        if (id == objetJSON.id && custom == objetJSON.custom) {
            objetJSON.nombre += 1;
            objetLinea = JSON.stringify(objetJSON);
            localStorage.setItem(i, objetLinea);
            break;
        };
    };
    
    //mise à jour de l'affichage
    for (var i=0; i<localStorage.length;i++){
        objetJSON = getStorage(i);
       if (objetJSON.nombre == 0) {
           localStorage.removeItem(i);
       };
   };
};

//Ajoute +1 article identique  

function add(objet) {
    objetJSON = getStorage(objet);
    objetJSON.nombre += 1;
    document.getElementById("nb"+objet).innerHTML = "Nombre: &nbsp&nbsp" +objetJSON.nombre +"<br>";
    document.getElementById("nb"+objet).innerHTML += "Total price : &nbsp&nbsp" +prixEuro(objetJSON.price*objetJSON.nombre);
    localStorage.setItem(objet, JSON.stringify(objetJSON));
    totalCom();
}; 

//Enleve -1 article identique
function sub(objet) {
    objetJSON = getStorage(objet);
    if (objetJSON.nombre > 1) {
        objetJSON.nombre -= 1;
        document.getElementById("nb"+objet).innerHTML = "Nombre: &nbsp&nbsp" +objetJSON.nombre +"<br>";
        document.getElementById("nb"+objet).innerHTML += "Total price : &nbsp&nbsp" +prixEuro(objetJSON.price*objetJSON.nombre);
        localStorage.setItem(objet, JSON.stringify(objetJSON));
        totalCom();
    };
};

//Supprime un type article du panier
function del(objet){
    let stockage = [];
    for (var i=0; i<localStorage.length; i++){
        stockage.push(localStorage.getItem(i));
    };
    stockage.splice(objet, 1);
    localStorage.clear();
    for (var i=0; i<stockage.length;i++){
    localStorage.setItem(i, stockage[i]);
    };
    window.location.reload();
};

//Calcul et affiche le total de la commande
function totalCom(){
    let prixT = 0;
    let articles =0;
    for (var i=0; i<localStorage.length;i++){
        let objetJSON = getStorage(i);
        prixT += objetJSON.nombre*objetJSON.price;
        articles += objetJSON.nombre;
    }
    document.getElementById("total").innerHTML = "Nombre d'articles de votre commande: &nbsp&nbsp" +articles +" articles<br>";
    document.getElementById("total").innerHTML += "Prix total de votre commande: &nbsp&nbsp" +prixEuro(prixT);
};

//Envois les données au server
function sendData() {
    let contact = {
        firstName: document.getElementById("firstName").value, 
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
    };

    let products = [];
    for (var i=0; i<localStorage.length;i++){
        let j = getStorage(i);
        products.push(j);
    };

    let body = {
        contact: JSON.stringify(contact),
        products: JSON.stringify(products)
    };

    let url2 = "http://localhost:3000/api/teddies/order";

    var request = new Request(url2, {
        method: 'POST',
        body: body,
        headers: new Headers()
    });

    console.log(body);

    fetch(request)
        .then(function(res) {
            return res.json();
        })
        .then(function(retour) {
            console.log(retour);
        })   
        .catch(function(error) {
            console.log(error);
        });  
};