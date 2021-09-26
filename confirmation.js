let conteneur = document.getElementById("inject");
conteneur.setAttribute("class", "container bg-light border");

    let message = createNode("p");
    appendNodeClass(conteneur, message, "row h2 mx-5 mt-5 mb-5");
    message.innerHTML = "Merci pour votre commande !";

    let message2 = createNode("p");
    appendNodeClass(conteneur, message2, "row h4 mx-5 mb-5");
    message2.innerHTML = "N° de commande : &nbsp&nbsp"+sessionStorage.getItem('orderId')+"<br><br>";
    message2.innerHTML += "Total de votre commande : &nbsp&nbsp"+prixEuro(sessionStorage.getItem('prixT'))+"<br><br>";
    message2.innerHTML += "Nombre d'articles commandés : &nbsp&nbsp"+sessionStorage.getItem('articles')+" articles"; 

localStorage.clear();
sessionStorage.clear();