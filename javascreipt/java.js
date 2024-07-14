/// <reference types="jquery" />

let searchByNameInput = document.getElementById("searchByName")
let search_meals = document.getElementById("search_meals");
let rowData = document.getElementById("row")
let loding_cont = document.querySelector(".loding_cont");




$('#open_w').on('click', () => {
    $('.container_manu').css({ 'left': '0px' })
    $('#open_w').addClass("d-none")
    $('#icon_close').removeClass("d-none")
    setTimeout(() => {
        for (let i = 0; i < 5; i++) {
            $(".navber ul li").eq(i).animate({
                top: 0
            }, (i + 5) * 100)
        }
    
    }, 500);

   

})
$('#icon_close').on('click', () => {
    $('.container_manu').css({ 'left': '-270px' })
    $('#icon_close').addClass("d-none")
    $('#open_w').removeClass("d-none")
    setTimeout(() => {
        $(".navber ul li").animate({
            top: 300
        }, 500)
    }, 500);
   
})






async function getCategories() {
    search_meals.classList.add("d-none")
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    // displayCategories(response.categories)
    console.log(response.categories)
    displayCategories(response.categories);
    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")

}

// getCategories()

let cartoona = ``;
function displayCategories(arr) {

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
         <div class="col-sm-12 col-md-4 col-lg-3">
                    <div onclick="ditils('${arr[i].strCategory}')" class="image">
                        <img src="${arr[i].strCategoryThumb}" class="img_home w-100" alt="">
                        <div class="conter">
                            <h2 class="wow backInUp">${arr[i].strCategory}</h2>
                             <p>${arr[i].strCategoryDescription}</p>
                        </div>
                    </div>
                </div>
        `
    }

    document.getElementById('row').innerHTML = cartoona
}

async function ditils(category) {
    search_meals.classList.add("d-none")
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    console.log(response.meals)
    displayditils1(response.meals)
    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")
}
function displayditils1(reference) {
    let cartoona = "";
    for (let i = 0; i < reference.length; i++) {
        cartoona += `
             <div class="col-sm-12 col-md-4 col-lg-3">
                    <div onclick="displayditils2(${reference[i].idMeal})" class="image">
                        <img src="${reference[i].strMealThumb}" class="img_home w-100" alt="">
                        <div class="conter d-flex justify-content-center align-items-center">
                            <h2 class="wow backInUp">${reference[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
        
        `

    }
    rowData.innerHTML = cartoona;
}

async function displayditils2(id) {
    search_meals.classList.add("d-none")
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()
    console.log(response.meals[0])
    displayditils3(response.meals[0])
    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")
}

function displayditils3(response) {
    let cartoona = ``;
    cartoona += `
    <div class="col-sm-12 col-md-4">
            <div class="image_ditils">
                <img src="${response.strMealThumb}" class="w-100" alt="">
            </div>
            <h2>${response.strMeal}</h2>
        </div>
         <div class="col-sm-12 col-md-8">
            <div class="cont_text">
                <h2>Instructions</h2>
                <p>
                   ${response.strInstructions}
                </p>
                <span class="d-block">Area : ${response.strArea}</span>
                <span class="d-block">Category : ${response.strCategory}</span>
                <span class="d-block">Recipes :</span>

                 <ul class="list-unstyled d-flex g-3 flex-wrap">
                        <li class="alert alert-info m-2 p-1">${response.strIngredient1}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient2}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient3}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient4}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient5}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient6}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient7}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient8}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient9}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient10}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient11}</li>
                        <li class="alert alert-info m-2 p-1">${response.strIngredient12}</li>

                    </ul>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        <li class="alert alert-danger m-2 p-1">Soup</li>
                    </ul>
                    <a target="_blank" href="${response.strSource}"
                        class="btn btn-success">Source</a>
                    <a target="_blank" href="${response.strYoutube}"
                        class="btn btn-danger">Source</a>


            </div>

`
    rowData.innerHTML = cartoona;
}

//##################### start ***********Area/////////////////

async function getareaData() {
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    search_meals.classList.add("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    console.log(response.meals)
    displayArea(response.meals)
    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")
}

function displayArea(arr) {
    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `

         <div class="col-sm-12 col-md-4 col-lg-3">
                    <div onclick="displayArea1('${arr[i].strArea}')"  class=" icon text-center">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                    </div>
                    <h2 class="text-center">${arr[i].strArea}</h2>
                </div>
        

        `
    }
    rowData.innerHTML = cartoona;
}

async function displayArea1(area) {
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    console.log(response.meals)
    displayArea2(response.meals)
    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")
}

function displayArea2(response) {
    let cartoona = ``;
    for (let i = 0; i < response.length; i++) {
        cartoona += `
        
             <div class="col-sm-12 col-md-4 col-lg-3">
                    <div onclick="displayditils2(${response[i].idMeal})" class="image">
                        <img src="${response[i].strMealThumb}" class="img_home w-100" alt="">
                        <div class="conter d-flex justify-content-center align-items-center">
                            <h2 class="wow backInUp">${response[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
        `

    }
    rowData.innerHTML = cartoona;
}

//##################### end ***********Area/////////////////

//##################### start ***********getIngredients/////////////////

async function getIngredients() {
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    search_meals.classList.add("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    console.log(response.meals)
    displayIngredients(response.meals)
    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")
}

function displayIngredients(arr) {

    let cartoona = ``;
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
             <div onclick="displayIngredients1('${arr[i].strIngredient}')" class="col-sm-12 col-md-4 col-lg-3 displayIngredients">
                    <div  class="icon text-center">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    </div>
                    <h2 class="text-center">${arr[i].strIngredient}</h2>
                    <p class="text-center">${arr[i].strDescription}</p>
                </div>
        `

    }
    rowData.innerHTML = cartoona;

}

async function displayIngredients1(id) {
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`)
    response = await response.json()
    console.log(response.meals)
    displayIngredients2(response.meals)
    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")
}

function displayIngredients2(response) {
    let cartoona = ``;
    for (let i = 0; i < response.length; i++) {
        cartoona += `
             <div class="col-sm-12 col-md-4 col-lg-3">
                    <div onclick="displayditils2(${response[i].idMeal})" class="image">
                        <img src="${response[i].strMealThumb}" class="img_home w-100" alt="">
                        <div class="conter d-flex justify-content-center align-items-center">
                            <h2 class="wow backInUp">${response[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
        `
    }
    rowData.innerHTML = cartoona;
}

//##################### end ***********getIngredients/////////////////
//##################### start ***********Contact Us/////////////////

function displayContactUs() {
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    let cartoona = ``;
    cartoona += `

     <div class="container Contact_Us w-75">
            <div class="row">
                <div class="col-sm-12 col-md-6 ">
                    <div id="NameValid" class="alert alert-danger d-none  w-100"role="alert">name in valid</div>
                    <input oninput="validName(this.value)" id="userName" type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter Your Name">
                </div>
                <div class="col-sm-12 col-md-6 ">
                    <div id="phoneValid" class="alert alert-danger d-none w-100"role="alert">phone in valid</div>
                    <input oninput="validphone(this.value)"  type="number" class="form-control" id="exampleFormControlInput1"
                        placeholder="Enter Your phone">
                </div>
                <div class="col-sm-12 col-md-6 mt-3">
                    <div id="EmailValid" class="alert alert-danger d-none w-100"role="alert">Email in valid</div>
                    <input oninput="validEmail(this.value)"  type="email" class="form-control" id="exampleFormControlInput1"
                        placeholder="Enter Your Email">
                </div>
                <div class="col-sm-12 col-md-6 mt-3">
                    <div id="AgeValid" class="alert alert-danger d-none w-100"role="alert">Age in valid</div>
                    <input oninput="validAge(this.value)"  type="number" class="form-control" id="exampleFormControlInput1"
                        placeholder="Enter Your age">
                </div>
                <div class="col-sm-12 col-md-6 mt-3">
                    <div id="passwordValid" class="alert alert-danger d-none w-100"role="alert">password in valid</div>
                    <input  oninput="validPassword(this.value)"  type="password" class="form-control" id="password"
                        placeholder="Enter Your password">
                </div>
                <div class="col-sm-12 col-md-6 mt-3">
                    <div id="RepasswordVlid" class="alert alert-danger d-none w-75"role="alert">name in valid</div>
                    <input oninput="validRepassword(this.value)"  type="password" class="form-control" id="exampleFormControlInput1"
                        placeholder="Enter Your Repassword">
                </div>
                <div class="col-sm-12 col-md-12 text-center mt-2">
                    <button id="btn_submit"   type="submit" class="btn btn-outline-danger px-2 mt-3">Submit</button>
                </div>
            </div>


        </div>
    
    `
    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")

    rowData.innerHTML = cartoona;

}


function validName(val) {
    let patern = /^[\w'\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/gm;
    if (patern.test(val)) {
        $('#NameValid').addClass("d-none")
        console.log("true")
        return true;
    } else {
        $('#NameValid').removeClass("d-none")
        console.log("false")
        return false;
    }
}

function validEmail(val) {
    parent = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (parent.test(val)) {
        $('#EmailValid').addClass('d-none')
        console.log("true")
        return true;
    } else {

        $('#EmailValid').removeClass('d-none')
        console.log("false")
        return false;
    }
}

function validphone(val) {
    parent = /^01[0-2,5]{1}[0-9]{8}$/gm;
    if (parent.test(val)) {
        $('#phoneValid').addClass('d-none')
        console.log("true")
        return true;
    } else {

        $('#phoneValid').removeClass('d-none')
        console.log("false")
        return false;
    }
}

function validAge(val) {
    parent = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$/gm;
    if (parent.test(val)) {
        $('#AgeValid').addClass('d-none')
        console.log("true")
        return true;
    } else {

        $('#AgeValid').removeClass('d-none')
        console.log("false")
        return false;
    }
}

function validPassword(val) {
    parent = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (parent.test(val)) {
        $('#passwordValid').addClass('d-none')
        console.log("true")
        return true;
    } else {

        $('#passwordValid').removeClass('d-none')
        console.log("false")
        return false;
    }
}

function validRepassword(val) {
    if (val === document.getElementById("password").value) {
        $('#RepasswordVlid').addClass('d-none')
        console.log("true")
        return true;
    } else {

        $('#RepasswordVlid').removeClass('d-none')
        console.log("false")
        return false;
    }
}
//##################### end ***********Contact Us/////////////////
//##################### start ***********Search/////////////////

async function display_home() {
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    search_meals.classList.add("d-none")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    response = await response.json()
    display(response.meals)
    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")
    $('body').removeClass("overflow-hidden")
    console.log(response.meals)
}
display_home();

function display(response) {
    let cartoona = ``;
    for (let i = 0; i < response.length; i++) {
        cartoona += `
        <div class="col-sm-12 col-md-4 col-lg-3">
                      <div onclick="displayditils2(${response[i].idMeal})" class="image">
                          <img src="${response[i].strMealThumb}" class="img_home w-100" alt="">
                          <div class="conter d-flex justify-content-center align-items-center">
                              <h2 class="wow backInUp">${response[i].strMeal}</h2>
                          </div>
                      </div>
                  </div>
      
      `

    }
    rowData.innerHTML = cartoona;
}






async function searchByName(name) {
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")
    if (response.meals == null) {
        window.alert(" No meal found with this name")
        return
    } else {
        console.log(response.meals)
        display(response.meals)
    }
}





async function displaySearch() {
    search_meals.classList.remove("d-none")
    let cartoona = ``;
    search_meals.innerHTML = `
    <div class="container mt-5">
            <div class="row" id="row_search">
                <div class="col-sm-12 col-md-6">
                    <input id="searchByName" onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" placeholder="Search By Name" type="text">
                </div>
                <div class="col-sm-12 col-md-6">
                    <input  onkeyup="searchByFLetter(this.value)"maxlength="1"class="form-control bg-transparent text-white" placeholder="Search By First Letter" type="text">
                </div>
            </div>
   
   `


    rowData.innerHTML = cartoona;
}

async function searchByFLetter(term) {
    $('.loding_cont').removeClass("d-none")
    $('.loding_cont').addClass("d-flex")
    let reference = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    reference = await reference.json()
    term == "" ? display(reference.meals) : displaySearch();

    $('.loding_cont').removeClass("d-flex")
    $('.loding_cont').addClass("d-none")
    console.log(reference.meals)
    display(reference.meals)
}





