let conteneur = document.getElementById("inject");
conteneur.setAttribute("class", "container bg-light");

if (localStorage.length == 0) {
    let message = createNode("p");
    appendNodeClass(conteneur, message, "row h5 p-5");
    message.innerHTML = "Votre panier est vide";
}
else {
    let liste = createNode("ul");
    appendNodeClass(conteneur, liste, "list-group list-group-flush pt-2");

    for (var i=0; i<localStorage.length;i++){
        let objetJSON = getStorage(i);

        let produit = createNode("li");
        appendNodeClass(liste, produit, "list-group-item m-2");

            let texte = createNode("p");
            appendNodeClass(produit, texte, "");
            let custom = typeChoix(objetJSON.product);
            produit.innerHTML = firstMaj(objetJSON.product) +" " +custom +": " +objetJSON.custom +"<br>";
            produit.innerHTML += "ID: " +objetJSON.id +"<br>";
            produit.innerHTML += "Nombre: " +objetJSON.nombre +"<br><br>";

            let groupe = createNode("div");
            appendNodeClass(produit, groupe, "btn-group");

                let plus = createNode("div");
                appendNodeClass(groupe, plus, "btn btn-outline-secondary");
                plus.setAttribute("onClick",`add(${i});`);
                plus.innerHTML = "+";

                let moins = createNode("div");
                appendNodeClass(groupe, moins, "btn btn-outline-secondary");
                moins.setAttribute("onClick",`sub(${i});`);
                moins.innerHTML = "-";

                let suppr = createNode("div");
                appendNodeClass(groupe, suppr, "btn btn-outline-secondary");
                suppr.setAttribute("onClick",`del(${i});`);
                suppr.innerHTML = "x";
    };

    let bouton = createNode("button");
    appendNodeClass(conteneur, bouton, "col-3 btn btn-lg btn-outline-secondary m-2 my-5");
    bouton.innerHTML = "Vider votre panier";
    bouton.setAttribute("onClick","localStorage.clear(); window.location.reload();");
};