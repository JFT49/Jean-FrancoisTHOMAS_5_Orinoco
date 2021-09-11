let params = new URLSearchParams(document.location.search.substring(1));
let product = params.get("product");
let _id = params.get("_id");

let url = "http://localhost:3000/api/";
url += product;
url += "/"+_id;

fetch(url)

.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})

.then(function(data) {
    console.log(data)

    let conteneur = document.getElementById("inject");

    let carte = createNode("div");
    appendNodeClass(conteneur, carte, "carte");

        let img = createNode("img");
        appendNodeClass(carte, img, "img");
        img.src = data['imageUrl'];

})

.catch(function(error) {
  console.log(error);
});
