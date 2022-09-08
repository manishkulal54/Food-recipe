const errorSpan = document.getElementById('errorSpan')

function showErrorMsg(errMsg) {
    errorSpan.innerText = errMsg
    setTimeout(() => {
        errorSpan.innerText = ""
    }, 4000);
}
// ******************Special Meal****************** 
// ******************Special Meal****************** 
// ******************Special Meal******************
fecthRandomMeal()


// to  get special meal 
async function getRandomMeal() {
    try {
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        let data = await response.json()
        return data.meals[0]
    } catch (error) {
        window.location.reload()
    }
}

// favMeal html function
const specialMeal = document.getElementById('specialMeal')
async function fecthRandomMeal() {
    const randomMeal = document.createElement('div')
    randomMeal.classList.add('spMealContainer')

    const meal = await getRandomMeal() //getting meal here
    const favMeals=getMealIdFromLs()

    randomMeal.innerHTML =
        `
    <div class="sp-text">
        <h2>Special Meal</h2>
    </div>
    <div class="spContainer">
        <div class="spImg_container">
            <img src=${meal.strMealThumb} alt=${meal.strMeal} class="spimg" id=${meal.idMeal}>
        </div>
        <div class="spMealName">
            <p class="randomMealName" id=${meal.idMeal}>${meal.strMeal}</p>
            <button class="likeBtn">
                <i class="${favMeals.includes(meal.idMeal)?"fa-solid":"fa-regular"} fa-heart fa-xl" id=${meal.idMeal}></i>
                <!-- fa-solid  class-->
            </button>
        </div>
    </div>
    `

    const likeBtn = randomMeal.querySelector('.spMealName .likeBtn')
    const likeBtn_i = randomMeal.querySelector('.spMealName .likeBtn .fa-heart')
    likeBtn.addEventListener('click', (e) => {
        if (likeBtn_i.classList.contains('fa-regular')) {
            likeBtn_i.classList.remove('fa-regular')
            likeBtn_i.classList.add('fa-solid')
            addToLS(e.target.id)
        }
        else {
            likeBtn_i.classList.add('fa-regular')
            likeBtn_i.classList.remove('fa-solid')
            removeFromLS(e.target.id)
        }
    })

    const infoImgBtn = randomMeal.querySelector(".spimg")
    const infoNameBtn = randomMeal.querySelector(".randomMealName")
    infoImgBtn.onclick = () => {
        showInfo(meal.idMeal)
    }
    infoNameBtn.onclick = () => {
        showInfo(meal.idMeal)
    }

    specialMeal.appendChild(randomMeal)

}


// ******************search Meal****************** 
// ******************search Meal****************** 
// ******************search Meal****************** 


const searchBar = document.getElementById('searchBar');
const search = document.getElementById('search');
const smText = document.getElementById('smText')

// search using click on mouse
search.onclick = () => {
    if (searchBar.value === '') {
        showErrorMsg("Search field cannot be empty")
    }
    else {
        fetchSearchMeal(searchBar.value)
    }

}

// search using enter on keyboard
document.onkeydown = (e) => {
    if (e.key === 'Enter') {
        if (searchBar.value === '') {
            showErrorMsg("Search field cannot be empty")
        }
        else {
            fetchSearchMeal(searchBar.value)
        }
    }
}

// fetching data using search value 
async function fetchSearchMeal(searchValue) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        const data = await response.json()
        container.innerHTML = " "
        data.meals.forEach(meal => {
            searchdata(meal)
        });

    } catch (error) {
        showErrorMsg("Meal not found try to enter something else")
    }
}


// searchMeal htmlfunction
const container = document.getElementById('smContainer')
const smTextBtn = document.getElementById('smTextBtn')

async function searchdata(searchMeal) {
    specialMeal.classList.add('dis-none')

    textBlock()

    const smMeals = document.createElement('div')
    smMeals.classList.add('smMeals')

    const favMeals=getMealIdFromLs()

    smMeals.innerHTML = `
    <div class="smMeal">
        <div class="smImg ">
            <img src=${searchMeal.strMealThumb} alt=${searchMeal.strMeal}>
        </div>
        <div class="smOptions">
            <p>${searchMeal.strMeal}</p>
            <div class="smBtns">
                <button class="smlinkBtn getRecipeBtn" id=${searchMeal.idMeal}>Get Recipe</button>
                <button class="likeBtn smlikeBtn" >
                    <i class="${favMeals.includes(searchMeal.idMeal)?"fa-solid":"fa-regular"} fa-heart fa-xl" id=${searchMeal.idMeal}></i>
                </button>
            </div>
            <div class="watchYtBtn">
                <button><a href=${searchMeal.strYoutube} target="_blank">Watch in youtube</a></button>
            </div>
        </div>
    </div>
    `

    const likeBtn = smMeals.querySelector('.smOptions .likeBtn')
    const likeBtn_i = smMeals.querySelector('.smOptions .likeBtn .fa-heart')
    likeBtn.addEventListener('click', (e) => {
        if (likeBtn_i.classList.contains('fa-regular')) {
            likeBtn_i.classList.remove('fa-regular')
            likeBtn_i.classList.add('fa-solid')
            addToLS(e.target.id)
        }
        else {
            likeBtn_i.classList.add('fa-regular')
            likeBtn_i.classList.remove('fa-solid')
            removeFromLS(e.target.id)
        }
    })

    const getRecipeBtn = smMeals.querySelector('.smOptions .getRecipeBtn')
    getRecipeBtn.onclick = (btnId) => {
        showInfo(btnId.target.id)
    }

    container.appendChild(smMeals)

}

function textBlock() {
    smText.innerText = `search result for ${searchBar.value}`
    smTextBtn.classList.remove('dis-none')
    smTextBtn.classList.add('dis-block')
}
function textNone() {
    smText.innerText = ` `
    smTextBtn.classList.add('dis-none')
    smTextBtn.classList.remove('dis-block')
}

smTextBtn.onclick = () => {
    specialMeal.classList.remove('dis-none')
    textNone()
    container.innerHTML = " "
}

// ***************adding meal to fav item***************
// ***************adding meal to fav item***************
// ***************adding meal to fav item***************


addFavMealsToDoc()
const favMeal_container = document.getElementById('favMeal_container')

// adding favMeal to document
function addFavMeal(meal) {
    const favMeal = document.createElement('div')
    favMeal.innerHTML = '';
    favMeal.classList.add('favMeal')
    favMeal.innerHTML = `
    <div class="closeFavMeal">
        <i class="fa-regular fa-circle-xmark closeBtn" id=${meal.idMeal}></i><!-- fa-solid --- for filled-->
    </div>
    <div class="favMealimg_Container" >
        <img src=${meal.strMealThumb} alt=${meal.strMeal} class="favMealimg" id=${meal.idMeal}>
    </div>
    <div class="favMealName">
        <p id=${meal.idMeal}>${meal.strMeal}</p>
    </div>
    `
    const closeBtn = favMeal.querySelector('.closeFavMeal .closeBtn')
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.classList.remove("fa-regular")
        closeBtn.classList.add("fa-solid")
    })
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.classList.add("fa-regular")
        closeBtn.classList.remove("fa-solid")
    })
    closeBtn.onclick = (e) => {
        removeFromLS(e.target.id)
    }
    const infoImgBtn = favMeal.querySelector('.favMealimg_Container')

    infoImgBtn.onclick = (btn) => {
        showInfo(btn.target.id)
    }

    favMeal_container.appendChild(favMeal)
}


// getting mealId from the LS and sending it to fetch using mealid

function addFavMealsToDoc() {
    const favMealContainer = document.getElementById('favMealContainer')
    const favMeal_container = document.getElementById('favMeal_container')
    favMeal_container.innerHTML = " "
    const meals = getMealIdFromLs()
    if (meals.length === 0) {
        favMealContainer.classList.add('dis-none')
        favMealContainer.classList.remove('dis-block')
    }
    else {
        favMealContainer.classList.remove('dis-none')
        favMealContainer.classList.add('dis-block')
    }
    let len = meals.length;
    if (len !== 0) {
        meals.forEach(meal => {
            fetchFavMeals(meal)
        })
    }
}

// fetching meal using mealID and sending the data to addFavMeal fn
async function fetchFavMeals(meal) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
        const data = await response.json()
        addFavMeal(data.meals[0])
    } catch (error) {

    }
}

// storing in LS and it will add the data in favMeal in document
function addToLS(mealid) {
    const mealIds = getMealIdFromLs()
    if (mealIds.includes(mealid) === false) {
        localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealid]))
        addFavMealsToDoc()
    }
}

// removing from LS
function removeFromLS(mealid) {
    const mealIds = getMealIdFromLs()
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealid)))
    addFavMealsToDoc();
}

// getting all the ids from the LS
function getMealIdFromLs() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'))
    return mealIds === null ? [] : mealIds
}


// ****************info Container ****************
// ****************info Container ****************
// ****************info Container ****************

const infoContainer = document.getElementById('infoContainer')

async function fetchInfoById(mealId) {
    try {
        infoContainer.innerHTML = " "
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        const data = await response.json()
        return data.meals[0]
    }
    catch (err) {

    }

}


async function showInfo(mealid) {
    const meal = await fetchInfoById(mealid)

    const infoDiv = document.createElement('div')
    infoDiv.classList.add('infoWindow')

    infoContainer.classList.remove('dis-none')

    const favMeals = getMealIdFromLs()

    const ingredients = []
    for (let i = 1; i < 30; i++) {
        if (meal["strIngredient" + i]) {
            ingredients.push([meal["strIngredient" + i], meal["strMeasure" + i]])
        } else {
            break
        }
    }


    infoDiv.innerHTML = `
    <i class="fa-regular fa-circle-xmark closeInfoBtn"></i><!-- fa-solid --- for filled-->
            <div class="infoImg">
                <img src=${meal.strMealThumb} alt=${meal.strMeal}>
            </div>
            <p class="info-p">${meal.strMeal}</p>
            <div class="ingredients">
            ${ingredients.map(ingred => {
        return `<p>${ingred[0]} : <span>${ingred[1]}</span> </p>`
    }).join('')}
            </div>
            <div class="proced">
            ${meal.strInstructions}
            </div>
            <i 
            class="${favMeals.includes(meal.idMeal) ? "fa-solid":"fa-regular"} fa-heart fa-xl infoLikeBtn"
            id=${meal.idMeal}></i>  
            <button class="infoClose-btn"> Close </button>
    `
    // ${favMeals.includes(meal.idMeal) ? "fa-solid fa-heart fa-xl infoLikeBtn" : "fa-regular fa-heart fa-xl infoLikeBtn"} 
    
    const closeBtn = infoDiv.querySelector('.closeInfoBtn')
    const infoClose = infoDiv.querySelector('.infoClose-btn')
    const infoLikeBtn = infoDiv.querySelector(".infoLikeBtn")

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.classList.remove("fa-regular")
        closeBtn.classList.add("fa-solid")
    })
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.classList.add("fa-regular")
        closeBtn.classList.remove("fa-solid")
    })

    closeBtn.onclick = () => {
        infoContainer.classList.add('dis-none')
    }
    infoClose.onclick = () => {
        infoContainer.classList.add('dis-none')
    }
    infoLikeBtn.onclick = (e) => {
        if (infoLikeBtn.classList.contains('fa-regular')) {
            infoLikeBtn.classList.remove('fa-regular')
            infoLikeBtn.classList.add('fa-solid')
            addToLS(e.target.id)
        }
        else {
            infoLikeBtn.classList.add('fa-regular')
            infoLikeBtn.classList.remove('fa-solid')
            removeFromLS(e.target.id)
        }
    }
    infoContainer.appendChild(infoDiv)
}

