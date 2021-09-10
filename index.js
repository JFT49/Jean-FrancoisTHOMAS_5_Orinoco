const url = "http://localhost:3000/api/teddies/";
//const url = "http://localhost:3000/api/cameras/";
//const url = "http://localhost:3000/api/furniture/";

  fetch(url)

  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function(data) {
    console.log(data);

    for (var i=0; i<data.length; i++){

      let conteneur = document.getElementById("inject");

      let carte = document.createElement("div");
      carte.setAttribute("class", "carte");
      conteneur.appendChild(carte);
      
          let image = document.createElement("div");
          image.setAttribute("class", "image");
          carte.appendChild(image);

              let img = document.createElement("img");
              image.appendChild(img);
              img.setAttribute("class", "img");
              img.src = data[i]['imageUrl'];

          let texte = document.createElement("div");
          carte.appendChild(texte);
          texte.setAttribute("class", "texte");

              let couleurs = document.createElement("div");
              texte.appendChild(couleurs);
              couleurs.setAttribute("class", "couleurs");

              for (var j=0; j<data[i]["colors"].length; j++){
                let puce = document.createElement("div");
                couleurs.appendChild(puce);
                puce.setAttribute("class", "puce");
                puce.style.backgroundColor = data[i]['colors'][j];
              };

              let nom = document.createElement("h1");
              texte.appendChild(nom);
              nom.setAttribute("class", "nom");
              nom.innerHTML = data[i]['name'];

              let prix = document.createElement("p");
              texte.appendChild(prix);
              prix.setAttribute("class", "prix");
              prix.innerHTML = (data[i]['price']/100).toFixed(2) + " Euro";
    };
  })

  .catch(function(error) {
    console.log(error);
  });
