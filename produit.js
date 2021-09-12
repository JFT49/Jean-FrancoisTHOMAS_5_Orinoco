let params = new URLSearchParams(document.location.search.substring(1));
let product = params.get("product");
let _id = params.get("_id");

let url = "http://localhost:3000/api/";
url += product;
url += "/"+_id;

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
    conteneur.setAttribute("class", "row bg-light p-4");

      let img = createNode("img");
      appendNodeClass(conteneur, img, "img");
      img.src = data['imageUrl'];
      img.setAttribute("alt","Photo du produit "+product+" nommé "+data['name']);
      img.setAttribute("class", "col-md-5");

      let info = createNode("div");
      appendNodeClass(conteneur, info, "col");

        let nom = createNode("p");
        appendNodeClass(info, nom, "info h4 mt-3");
        nom.innerHTML = "Informations sur le produit <br><br>";
        nom.innerHTML += "ID : "  +data['_id']+"<br><br>"; 
        nom.innerHTML += "Nom : "  +data['name']+"<br><br>";
        nom.innerHTML += "Prix : "  +(data['price']/100).toFixed(2)+" Euro"+"<br><br>";
        nom.innerHTML += "Description : "  +data['description']+"<br><br>";

})

.catch(function(error) {
  console.log(error);
});
