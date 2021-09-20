let conteneur = document.getElementById("inject");
conteneur.setAttribute("class", "container bg-light border");

if (localStorage.length == 0) {
    let message = createNode("p");
    appendNodeClass(conteneur, message, "row h5 p-5");
    message.innerHTML = "Votre panier est vide";
}
else {
    let liste = createNode("ul");
    appendNodeClass(conteneur, liste, "list-group list-group-flush pt-2 container");

    for (var i=0; i<localStorage.length;i++){
        let objetJSON = getStorage(i);
    
        let url = "http://localhost:3000/api/";
        url += objetJSON.product;
        url += "/"+objetJSON.id;

        let rang = i;
    
        fetch(url)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            };
        })
        .then(function(data) {
    
        let produit = createNode("li");
        appendNodeClass(liste, produit, " m-2 row bg-light border");
        produit.setAttribute("id","li"+rang);
    
            let img = createNode("img");
            appendNodeClass(produit, img, "col-2");
            img.setAttribute("id","img"+rang);
            img.src = data['imageUrl'];
            img.setAttribute("style", "object-fit: contain; width: 150px"); 
    
            let texte1 = createNode("p");
            appendNodeClass(produit, texte1, "col info");
            let custom = typeChoix(objetJSON.product);
            texte1.innerHTML = firstMaj(objetJSON.product) +" " +custom +" : &nbsp&nbsp" +objetJSON.custom.bold() +"<br>";
            texte1.innerHTML += "ID : &nbsp&nbsp" +objetJSON.id +"<br>";
            texte1.innerHTML += "Price : &nbsp&nbsp" +prixEuro(data['price']);

            let groupe1 = createNode("div");
            appendNodeClass(produit, groupe1, "col");
            
                let texte2 = createNode("p");
                appendNodeClass(groupe1, texte2, "");
                texte2.setAttribute("id","nb"+rang);
                texte2.innerHTML = "Nombre: &nbsp&nbsp" +objetJSON.nombre +"<br>";
                texte2.innerHTML += "Total price : &nbsp&nbsp" +prixEuro(data['price']*objetJSON.nombre);
        
                let groupe2 = createNode("div");
                appendNodeClass(groupe1, groupe2, "btn-group col-1 pb-2");

                    let plus = createNode("div");
                    appendNodeClass(groupe2, plus, "btn btn-outline-secondary");
                    plus.setAttribute("onClick",`add(${rang});`);
                    plus.innerHTML = "+";

                    let moins = createNode("div");
                    appendNodeClass(groupe2, moins, "btn btn-outline-secondary");
                    moins.setAttribute("onClick",`sub(${rang});`);
                    moins.innerHTML = "-";

                    let suppr = createNode("div");
                    appendNodeClass(groupe2, suppr, "btn btn-outline-secondary");
                    suppr.setAttribute("onClick",`del(${rang});`);
                    suppr.innerHTML = "x";
        })   
        .catch(function(error) {
            console.log(error);
        });
    };

    let total = createNode("div");
    appendNodeClass(conteneur, total, "row bg-light border p-3 ms-2 me-3 my-2");
    total.setAttribute("id","total");
    totalCom();

    let bouton = createNode("button");
    appendNodeClass(conteneur, bouton, "btn btn-lg btn-outline-secondary mx-2 my-3");
    bouton.innerHTML = "Vider votre panier";
    bouton.setAttribute("onClick","localStorage.clear(); window.location.reload();");
};