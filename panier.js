let conteneur = document.getElementById("inject");
conteneur.setAttribute("class", "container bg-light border");

if (localStorage.length == 0) {
    let message = createNode("p");
    appendNodeClass(conteneur, message, "row h5 p-5");
    message.innerHTML = "Votre panier est vide";
}else{
    //Creation d'une liste composer de chaque articles du panier
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
            img.setAttribute("onClick", `window.location.href="/produit.html?product=${objetJSON.product}&_id=${objetJSON.id}"`);
            img.setAttribute("style", "object-fit: contain; width: 150px; cursor: pointer"); 
    
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
                    suppr.innerHTML = "x";

                    suppr.onclick = function() {
                        createModale(2);
                        document.getElementById('modal').showModal();
                        document.getElementById('textModal').innerHTML = "Voulez vous vraiment supprimer cet article de votre panier ?";
                        document.getElementById("confirmBtn").onclick = function() {
                            del(rang);
                        };
                    };
        })   
        .catch(function(error) {
            console.log(error);
        });
    };

    //creation de la ligne total de la commande 
    let total = createNode("div");
    appendNodeClass(conteneur, total, "row bg-light border p-3 ms-2 me-3 my-2");
    total.setAttribute("id","total");
    totalCom();

    //Creation du bouton pour vider le panier
    let bouton = createNode("button");
    appendNodeClass(conteneur, bouton, "btn btn-lg btn-outline-secondary mx-2 mt-2 mb-5");
    bouton.innerHTML = "Vider votre panier";

    //Action du Boton "Vider votre panier"
    bouton.onclick = function() {
        createModale(2);
        document.getElementById('modal').showModal();
        document.getElementById('textModal').innerHTML = "Voulez vous vraiment vider votre panier ?";
        document.getElementById("confirmBtn").onclick = function() {
            localStorage.clear();
            window.location.reload();
        };
    };
};

//Action du Bouton "valider votre commande" du formulaire 
document.getElementById("commande").onclick = function() {  
    if( document.getElementById("firstName").validity.valid == true &&
        document.getElementById("lastName").validity.valid == true &&
        document.getElementById("address").validity.valid == true &&
        document.getElementById("city").validity.valid == true &&
        document.getElementById("email").validity.valid == true ){
            if (!localStorage.length){
                createModale(1);
                document.getElementById('modal').showModal();
                document.getElementById('textModal').innerHTML = "Votre panier est vide !";
            }else{
                createModale(2);
                document.getElementById('modal').showModal();
                let prix = sessionStorage.getItem('prixT');
                prix = prixEuro(prix);
                document.getElementById('textModal').innerHTML = "Voulez vous vraiment valider votre commande ?<br> Prix total = " +prix;
                document.getElementById("confirmBtn").onclick = function() {
                    sendData();
                };
            };
            return false; //empeche le reload du form
    };
};