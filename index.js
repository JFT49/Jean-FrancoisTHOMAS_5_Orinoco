let url = "http://localhost:3000/api/";
let product = "teddies";
//let product = "cameras";
//let product = "furniture";
url += product;
document.getElementById("produit").innerHTML = product.toUpperCase();

  fetch(url)

  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function(data) {
    
    let conteneur = document.getElementById("inject");
    conteneur.setAttribute("class", "row bg-light px-3 border");

    for (var i=0; i<data.length; i++){  

      let col = createNode("div");  //Creation d'une colonne bootstrap par produit
      appendNodeClass(conteneur, col, "col-sm-6 col-md-4 col-lg-3 col-xl-2");

      let card = createNode("div");  //création d'une carte par produit
      appendNodeClass(col, card, "card my-4 shadow-sm bg-hidden hover-overlay");

        let lien = createNode("a");
        appendNodeClass(card, lien, "stretched-link");
        lien.setAttribute("href", "produit.html"+"?"+"product="+product+"&"+"_id="+data[i]._id);
  
        let img = createNode("img");
        appendNodeClass(card, img, "card-img-top border-bottom");
        img.src = data[i].imageUrl;
        img.setAttribute("alt","Photo du produit "+product+" nommé "+data[i].name);

        let texte = createNode("div");
        appendNodeClass(card, texte, "card-body");

        if (data[i].colors) {
          let couleurs = createNode("p");
          appendNodeClass(texte, couleurs, "couleurs");

          for (var j=0; j<data[i].colors.length; j++){
            let puce = createNode("div");
            appendNodeClass(couleurs, puce, "puce");
            puce.style.backgroundColor = colors(data[i].colors[j]);
          };
        };
          
          let nom = createNode("h1");
          appendNodeClass(texte, nom, "card-title h3 text-center");
          nom.innerHTML = data[i].name;

          let prix = createNode("p");
          appendNodeClass(texte, prix, "card-text text-center");
          prix.innerHTML = prixEuro(data[i].price);
    };
  })

  .catch(function(error) {
    console.log(error);
  });