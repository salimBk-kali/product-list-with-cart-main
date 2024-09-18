let addToCart = document.querySelectorAll(".add");
let cartQantity = document.querySelector("h3");
let empty = document.querySelector(".empty");
let items = document.querySelector(".items");
let increment = document.querySelectorAll(".increment");
let decrement = document.querySelectorAll(".decrement");

let parentDiv  = document.createElement("div");


let QT = document.querySelector(".QT");

let quantiteCart = document.querySelector(".quantite");

let OrderTotal = document.createElement("div");
let spanOrderTotal = document.createElement("span");
let spanPriceTotal = document.createElement("span");
let total = 0;

let delivry = document.createElement("div");
delivry.classList.add("delivery");
delivry.appendChild(document.createTextNode(`This is a `));
let carbon = document.createElement("span");
carbon.appendChild(document.createTextNode(`carbon-neutral `));
carbon.classList.add("carbon");
delivry.appendChild(carbon);
delivry.appendChild(document.createTextNode(`delivery`));

let confirmOrder = document.createElement("div");
confirmOrder.classList.add("confirm");
confirmOrder.appendChild(document.createTextNode(`Confirm Order`));


let quantite = 0;

let newOrder = document.createElement("div");
newOrder.classList.add("newOrder")
newOrder.appendChild(document.createTextNode("Start New Order"));
increment.forEach(button=>{
    button.addEventListener("click",function(event){
        
        if(quantiteCart.innerHTML){
            quantiteCart.innerHTML = "";
        }
        quantite++;
        quantiteCart.appendChild(document.createTextNode(quantite));
        if (empty) {
            empty.classList.add("emptyJS");
        }
        fetch("data.json")
    .then((result)=>{
        let myData = result.json();
        return myData;
    })
    .then((myData)=>{
        for(let i=0;i<myData.length;i++){
            
            if(parseInt(event.target.id) === i){
                total = total+myData[i].price;
                if(event.target.hasAttribute("data")){
                    
                    let itemQantite = parseInt(event.target.classList.item("1"));
                    itemQantite++;
                    event.target.previousElementSibling.innerHTML = itemQantite;
                    event.target.classList.replace(event.target.classList.item(1),itemQantite.toString()); 
                    let span = document.querySelector(`.my${i}`);
                    let spanQ = document.querySelector(`.mon${i}`);
                    if(span.innerHTML !== ""){
                        span.innerHTML="";
                    }
                    if(spanQ.innerHTML !== ""){
                        spanQ.innerHTML="";
                    }
                    span.appendChild(document.createTextNode(`${itemQantite}x`));

                    let totalPriceItem = myData[i].price * itemQantite;
                    spanQ.appendChild(document.createTextNode(`$${totalPriceItem.toFixed(2)}`));

                }else{
                event.target.classList.add("0");
                event.target.setAttribute("data","marked");
                let div = document.createElement("div");
                let p = document.createElement("p");
                let hr = document.createElement("hr");
                let image = document.createElement("img");
                image.src = myData[i].image.desktop;
                image.classList.add("image");
                let price = document.createElement("p");
                let span = document.createElement("span");
                let spanQ = document.createElement("span");
                let deleteButton = document.createElement("span");
                deleteButton.appendChild(document.createTextNode("X"));
                deleteButton.classList.add("delete");
                span.classList.add(`my${i}`);
                spanQ.classList.add(`mon${i}`);
                price.prepend(span);
                price.appendChild(document.createTextNode(`@ $${(myData[i].price).toFixed(2)}`));
                price.appendChild(spanQ);

                price.appendChild(deleteButton);

                p.appendChild(document.createTextNode(myData[i].name))
                
                div.prepend(p);
                div.prepend(image);
                div.appendChild(price);
                div.appendChild(hr);
                
                parentDiv.appendChild(div)
                items.appendChild(parentDiv);


                let itemQantite = parseInt(event.target.classList.item("1"));
                itemQantite++;
                event.target.previousElementSibling.innerHTML = itemQantite;
                event.target.classList.replace(event.target.classList.item(1),itemQantite.toString()); 
                if(span.innerHTML !== ""){
                    span.innerHTML="";
                }
                if(spanQ.innerHTML !== ""){
                    spanQ.innerHTML="";
                }
                let totalPriceItem = myData[i].price * itemQantite;
                spanQ.appendChild(document.createTextNode(`$${totalPriceItem.toFixed(2)}`));
                span.appendChild(document.createTextNode(`${itemQantite}x`));
                

                deleteButton.addEventListener("click", function() {
                let quantiteItem = parseInt(span.innerHTML);
                quantite = quantite - quantiteItem;
                if(quantiteCart.innerHTML){
                    quantiteCart.innerHTML = "";
                }
                quantiteItem = 0;
                event.target.previousElementSibling.innerHTML = quantiteItem;
                event.target.classList.replace(event.target.classList.item(1),quantiteItem.toString()); 
                if(span.innerHTML !== ""){
                    span.innerHTML="";
                }
                span.appendChild(document.createTextNode(`${quantiteItem}x`));

                quantiteCart.appendChild(document.createTextNode(quantite));
                let totalPriceItem =  parseFloat(spanQ.innerText.slice(1));
                total = total - totalPriceItem;
                if(spanPriceTotal.innerHTML !== ""){
                    spanPriceTotal.innerHTML="";
                }
                spanPriceTotal.appendChild(document.createTextNode(`$${total.toFixed(2)}`));
                div.remove();
                event.target.removeAttribute("data");

                if(quantite === 0){
                    delivry.remove();
                    confirmOrder.remove();
                    OrderTotal.remove();
                    
                    empty.classList.remove('emptyJS');
                }
                
                });
                
                
                }
                
                
            }
        }
        if(spanOrderTotal.innerHTML !== ""){
            spanOrderTotal.innerHTML="";
        }
        if(spanPriceTotal.innerHTML !== ""){
            spanPriceTotal.innerHTML="";
        }
        spanOrderTotal.appendChild(document.createTextNode(`OrderTotal`));
        spanPriceTotal.appendChild(document.createTextNode(`$${total.toFixed(2)}`));
        OrderTotal.appendChild(spanOrderTotal);
        OrderTotal.appendChild(spanPriceTotal)
        OrderTotal.classList.add("total");
        items.appendChild(OrderTotal);
        items.appendChild(delivry);
        items.appendChild(confirmOrder);
        
        
    })
    });
});
        


decrement.forEach(button=>{
    button.addEventListener("click",function(event){
        
        if(quantiteCart.innerHTML){
            quantiteCart.innerHTML = "";
        }
        if(quantite>0){
        quantite--;
        }
        quantiteCart.appendChild(document.createTextNode(quantite));
        
        
    fetch("data.json")
    .then((result)=>{
        let myData = result.json();
        return myData;
    })
    .then((myData)=>{
        for(let i=0;i<myData.length;i++){
            
            if(parseInt(event.target.id) === i){
                if(total !== 0 ){
                    total = total-myData[i].price;
                }
                
                
                
                if(spanPriceTotal.innerHTML !== ""){
                    spanPriceTotal.innerHTML="";
                }
                spanPriceTotal.appendChild(document.createTextNode(`$${total.toFixed(2)}`));
                let div = event.target.parentElement;
                let increment = div.lastElementChild;
                let itemQantite = increment.classList.item("1");
                if(itemQantite > 0){
                let img = event.target.nextElementSibling
                itemQantite--;
                img.nextElementSibling.innerHTML = itemQantite;

                }
                increment.classList.replace(increment.classList.item(1),itemQantite.toString());
                let span = document.querySelector(`.my${i}`);
                let spanQ = document.querySelector(`.mon${i}`);
                
                if(spanQ.innerHTML !== ""){
                    spanQ.innerHTML="";
                }
                if(span.innerHTML !== ""){
                    span.innerHTML="";
                }
                span.appendChild(document.createTextNode(`${itemQantite}x`));
                let totalPriceItem = myData[i].price * itemQantite;
                spanQ.appendChild(document.createTextNode(`$${totalPriceItem}`));

                if(itemQantite === 0){
                let p = span.parentElement;
                let removableDiv = p.parentElement;
                removableDiv.remove();
                increment.removeAttribute("data");
                
                if(quantite === 0){
                    delivry.remove();
                    confirmOrder.remove();
                    OrderTotal.remove();
                    
                    empty.classList.remove('emptyJS');
                }

                
                }
                
            }

        }
        
        });
});
});


confirmOrder.addEventListener("click", function(){
	let orderConfirmed = document.createElement("div");
    orderConfirmed.classList.add("orderConfirmed");
    document.body.appendChild(orderConfirmed);
    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode("Order Confirmed"));
    let p = document.createElement("p");
    p.appendChild(document.createTextNode("We hope you enjoy your food!"));
    h3.appendChild(p);
    orderConfirmed.appendChild(h3);
    let menu = document.createElement("div");
    menu.classList.add("menu");
    orderConfirmed.appendChild(menu);
    let children = Array.from(parentDiv.children);

    for (let i = 0; i < children.length; i++) {
    let div = children[i];
    let clone = div.cloneNode(true);
    let image = clone.firstElementChild;
    let p = clone.children[2];
    p.lastElementChild.remove();
    image.classList.remove("image");
    menu.appendChild(clone);
    }
    let OrderTotalClone = OrderTotal.cloneNode(true);
    
    menu.appendChild(OrderTotalClone);

    orderConfirmed.appendChild(newOrder);    
        
        
    newOrder.addEventListener("click",function(){
    orderConfirmed.remove();
    quantite = 0;
    if(quantiteCart.innerHTML){
        quantiteCart.innerHTML = "";
    }
    total = 0;
    if(spanPriceTotal.innerHTML !== ""){
        spanPriceTotal.innerHTML="";
    }
    spanPriceTotal.appendChild(document.createTextNode(`$${total.toFixed(2)}`));
    quantiteCart.appendChild(document.createTextNode(quantite));
    delivry.remove();
    empty.classList.remove('emptyJS');
    confirmOrder.remove();
    OrderTotal.remove();
    for (let i = 0; i < children.length; i++) {
        let div = children[i];
        div.remove();
        

    }
    increment.forEach(button => {
        button.removeAttribute("data");
        itemQantite = 0;
        button.previousElementSibling.innerHTML = itemQantite;
        button.classList.replace(button.classList.item(1),itemQantite.toString()); 
        
    });

});
    
});


