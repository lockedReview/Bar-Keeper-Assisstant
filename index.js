document.addEventListener("DOMContentLoaded",() => {
    console.log("We good.")
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((res)=> res.json())
    .then((data)=>{
        let randomData = [];
        randomData = data.drinks;

        renderDrink(randomData)
    })
})

const searchButton = document.getElementById('searchButton')
searchButton.addEventListener('click', (e)=>{
    e.preventDefault()
    
    const searchInput = document.getElementById('searchRecipe')
    const input = searchInput.value;
      
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)   
    .then((res)=>res.json())
    .then((data)=> {
        let drinkArray = [];
        drinkArray = data.drinks;
            
        renderDrink(drinkArray);
    })
})

function renderDrink(data){

    if (data.length === 1 ){  
 
        let randomObj = {};
        randomObj = data[0];

        const randomDiv  = document.getElementById('img')
        const randomName = document.createElement('h3');
        
        const randomImg = document.createElement('img');
        randomImg.className = 'rImg';
        const drinkName = randomObj.strDrink;
        randomName.textContent = drinkName;
        const drinkURL = randomObj.strDrinkThumb;
        randomImg.src = drinkURL;
        randomImg.width = 100;

        randomDiv.appendChild(randomName);
        randomDiv.appendChild(randomImg);
        return;

    }else if (data.length > 1) {


        data.forEach((currentDrink)=>{
        const cardDiv = document.getElementById('cards')
        const drinkCard = document.createElement('card');
        drinkCard.className = 'card'
        const cardName = document.createElement('h3');
        const cardImg = document.createElement('img');
        
        cardImg.src = "";
        cardImg.width = 100;
        

        const cardDes = document.createElement('p');
        const cardIngrList = document.createElement('ol')
        const cardIngr1 = document.createElement('li');
        const cardIngr2 = document.createElement('li');
        const cardIngr3 = document.createElement('li');
        const cardIngr4 = document.createElement('li');
       
// creating element for the comment, so when a user writes about the drink its appended as text 
// then append said element to the bottom of the card information.
// add an eventlistener to include what evers written to the drink card.

        const drinkName = currentDrink.strDrink;
        cardName.textContent = drinkName;
        const drinkURL = currentDrink.strDrinkThumb;
        cardImg.src = drinkURL;
        drinkCard.className = `${drinkName}`;
        const drinkDes = currentDrink.strInstructions;
        cardDes.textContent = drinkDes;
        const ingredient1= `${currentDrink.strMeasure1} ${currentDrink.strIngredient1}`;
        cardIngr1.textContent = ingredient1;
        const ingredient2 = `${currentDrink.strMeasure2} ${currentDrink.strIngredient2}`;
        cardIngr2.textContent = ingredient2;
        const ingredient3 = `${currentDrink.strMeasure3} ${currentDrink.strIngredient3}`;
        cardIngr3.textContent = ingredient3;
        const ingredient4 = `${currentDrink.strMeasure4} ${currentDrink.strIngredient4}`;
        cardIngr4.textContent = ingredient4;

        /*const cardComment = document.createElement('input'); 
        cardComment.id = `${drinkName}Comment`;
        cardComment.name = "comments";
        cardComment.type = "text"; 
        const cardCommentLine = document.createElement('p');

        const cardCommentButton = document.createElement('input');
        cardCommentButton.type = "submit";
        cardCommentButton.name = "comments";

        cardCommentButton.addEventListener("click", (event)=>{
            event.preventDefault();
            console.log('click')
            const commentValue = event.target.parentNode;
            const commentDrink = commentValue.children[0];
            const commentDrinkName = commentDrink.innerText
            const commentWord  = document.querySelector(`#${commentDrinkName}Comment`);
            const word = commentWord.value;

            cardCommentLine.textContent = word;
            return
               
        }) */

        cardImg.addEventListener('mouseover', (e)=>{                
            
            const targetCard = e.target.parentNode;


            targetCard.appendChild(cardDes);
            targetCard.appendChild(cardIngrList);       
            targetCard.appendChild(cardComment);   //adding the comment input
            targetCard.appendChild(cardCommentButton);
            targetCard.appendChild(cardCommentLine);

            
            return           

        })
        

        cardIngrList.appendChild(cardIngr1);
        cardIngrList.appendChild(cardIngr2);
        cardIngrList.appendChild(cardIngr3);
        cardIngrList.appendChild(cardIngr4);

        drinkCard.appendChild(cardName);
        drinkCard.appendChild(cardImg);
        //drinkCard.appendChild(cardDes);
        //drinkCard.appendChild(cardIngrList);

        cardDiv.appendChild(drinkCard);
        return;
        })        

    }{
        console.log("error")
    }
}

