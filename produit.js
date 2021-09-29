let params = new URLSearchParams(document.location.search.substring(1));
let product = params.get("product");
let _id = params.get("_id");

let url = "http://localhost:3000/api/";
url += product;
url += "/"+_id;

let choix = typeChoix(product);
document.getElementById("produit").innerHTML = product.toUpperCase();

fetch(url)

.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(data) {
  console.log(data)

  let conteneur = document.getElementById("inject");
  conteneur.setAttribute("class", "row bg-light p-4 border");

    let img = createNode("img");
    appendNodeClass(conteneur, img, "img");
    img.src = data['imageUrl'];
    img.setAttribute("alt","Photo du produit "+product+" nommé "+data['name']);
    img.setAttribute("class", "col-md-5 d-block m-auto mt-0");

    let info = createNode("div");
    appendNodeClass(conteneur, info, "col");

      let contenu = createNode("p");
      appendNodeClass(info, contenu, "info h4 mt-3");
      contenu.innerHTML = "Informations sur le produit <br><br>";
      contenu.innerHTML += "ID : "+ _id +"<br><br>"; 
      contenu.innerHTML += "Nom : "+ data['name'] +"<br><br>";
      contenu.innerHTML += "Prix : "+ prixEuro(data['price']) +"<br><br>";
      contenu.innerHTML += "Description : "+ data['description'] +"<br><br>";
      contenu.innerHTML += "Choix "+ choix +" :";

      for (var i=0; i<data[choix].length; i++){
        let form = createNode("div");
        appendNodeClass(info, form, "form-check");

          let input = createNode("input");
          appendNodeClass(form, input, "form-check-input");
          input.setAttribute("type","radio");
          input.setAttribute("name","flexRadioDefault");
          input.setAttribute("id","flexRadioDefault"+i);
          input.setAttribute("value", data[choix][i]);
          if (choix == "colors") {
            input.style.backgroundColor = colors(data[choix][i]);
            input.style.width = '30px';
            }; 
              
          let label = createNode("label");
          appendNodeClass(form, label, "form-check-label mx-3");
          label.setAttribute("for","flexRadioDefault"+i);
          label.innerHTML = data[choix][i];
        };
      document.getElementById("flexRadioDefault0").checked = true;

      var bouton = createNode("button");
      appendNodeClass(info, bouton, "btn btn-lg btn-outline-secondary mt-4");
      bouton.innerHTML = "Ajouter au panier";
     
      bouton.onclick = function() {
        createModale(false);
        document.getElementById('textModal').innerHTML = "Cet article à bien été ajouter à votre panier !";
        document.getElementById('modal').showModal();
        ajoutPanier(product, _id, data['price']);
      };
 
    })
.catch(function(error) {
  console.log(error);
});