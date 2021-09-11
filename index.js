let product = "teddies";
//let product = "cameras";
//let product = "furniture";

let url = "http://localhost:3000/api/";
url += product;

  fetch(url)

  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function(data) {
    console.log(data)

    // création d'une carte par article
    for (var i=0; i<data.length; i++){

      let conteneur = document.getElementById("inject");

      let lien = createNode("a");
      appendNodeClass(conteneur, lien, "lien");

      lien.setAttribute("href", "produit.html"+"?"+"product="+product+"&"+"_id="+data[i]['_id']);

        let carte = createNode("div");
        appendNodeClass(lien, carte, "carte");

          let image = createNode("div");
          appendNodeClass(carte, image, "image");

            let img = createNode("img");
            appendNodeClass(image, img, "img");
            img.src = data[i]['imageUrl'];

          let texte = createNode("div");
          appendNodeClass(carte, texte, "texte");

            if (data[i]['colors']) {
              let couleurs = createNode("div");
              appendNodeClass(texte, couleurs, "couleurs");

                for (var j=0; j<data[i]["colors"].length; j++){
                  let puce = createNode("div");
                  appendNodeClass(couleurs, puce, "puce");
                  puce.style.backgroundColor = colors(data[i]['colors'][j]);
                };
            };

            let nom = createNode("h1");
            appendNodeClass(texte, nom, "nom");
            nom.innerHTML = data[i]['name'];

            let prix = createNode("p");
            appendNodeClass(texte, prix, "prix");
            prix.innerHTML = (data[i]['price']/100).toFixed(2) + " Euro";
    };
  })

  .catch(function(error) {
    console.log(error);
  });