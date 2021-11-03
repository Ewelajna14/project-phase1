



const item = document.querySelector(".search-results-grid")
const searchForm = document.querySelector('form')

document.addEventListener("DOMContentLoaded", fetchRecipes)


// fetch request to display images from local API
function fetchRecipes(){     
fetch("http://localhost:3000/recipes")
.then(response=>response.json())
.then(voteArray =>{voteArray.forEach((results)=>renderMainRecipe(results))} )
//console.log(voteArray)
    
}
// function to add recipes to the DOM 
function renderMainRecipe(results){
        
    let oneRecipe = document.createElement('div')
    oneRecipe.innerHTML=`
    <div class="description">
    <img src="${results.image}">
    <h3> ${results.title}</h3>
    <p class="votes">Votes: ${results.votes}</p>
    <button class="btn-like">Vote</button>
    </div>
    `
    let voteButton = oneRecipe.querySelector('button')
    
    item.appendChild(oneRecipe)

 

    //EventListener to increase number of votes
    voteButton.addEventListener('click', (e)=> {
        let voteCount = (parseInt(e.target.previousElementSibling.innerText.split(" ")[1])) // number from results.votes in <p> tag which going to be increased after 'click' event
        e.target.previousElementSibling.innerText = `Votes: ${voteCount + 1}` // e.target.previousElementSibling.innerText is a content of <p> tag

        fetch(`http://localhost:3000/recipes/${results.id}`, {
            method:"PATCH",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify( {"votes": voteCount+1})    
        })
        .then(response=>response.json())
        .then(data => console.log(data))
    }
)


}



//Fetch data from public API
// EventListener to form to search recipes
// Egz. If user type "pizza" return only pizza

searchForm.addEventListener("submit", searchRecipe)

function searchRecipe(e){
e.preventDefault()
let query = e.target["form-input"].value
//console.log(query)
searchForm.reset()
item.replaceChildren()
fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=####=${query}`)
.then( r=> r.json())
.then(responseObject =>{
    responseObject.results.forEach((results)=>renderRecipe(results))
    //console.log(responseObject.results)
})

}
// function to add recipes to the DOM after search is completed
function renderRecipe(results){
    let oneRecipe = document.createElement('div')
    oneRecipe.innerHTML=`
    <div class="description">
    <img src="${results.image}">
    <h3>${results.title}</h3>
    <button class="btn-like"><span>Like it!<span></button>

    </div>
    `
    item.appendChild(oneRecipe)

    const likeButton = oneRecipe.querySelector('button')

    //EventListener mouseover which shows alert after hover over button
    likeButton.addEventListener('mouseover', (e)=>{
        let title= e.target.previousElementSibling.innerText // e.target.previousElementSibling is <p> tag
        alert(title + ' is an excellent choice! ')
    })

}


















