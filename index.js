let alphabets=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
"P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i",
"j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

let numbers = ["0","1","2","3","4","5","6","7","8","9"];

let specialChar = ["!","@","#","$","%","^","&","*"];

let alphaNum = alphabets.concat(numbers)

let alphaSpecial = alphabets.concat(specialChar)

let numSpecial = numbers.concat(specialChar)

let characters = alphabets.concat(numbers).concat(specialChar)

let pass1btn = document.getElementById("pass1")
let pass2btn = document.getElementById("pass2")
let arr1 = []
let arr2 = []
let isAvailable = false
let list = document.getElementById("list")
let btn = document.getElementById("btn")
let storage = JSON.parse(localStorage.getItem("myPass"))
let storageApp = JSON.parse(localStorage.getItem("myAppName"))
let arrToStr = ""
let bookmark = []
let para = document.getElementById("copypara")
let clicked1 = false
let clicked2 = false
let inp = document.getElementById("inp")
let alphaChecked = document.getElementById("alpha")
let numberChecked = document.getElementById("num")
let specialCharChecked = document.getElementById("special")
let allChecked = document.getElementById("all")
let passChoices = document.getElementById("passChoices")
let appName = document.getElementById("appName")
let app = ""
let bookmarkApp = []
let saveList = document.getElementById("saveList")

if(storage) {
    bookmark = storage
    render(bookmark)
}

if(storageApp) {
    bookmarkApp = storageApp
    saveRender(bookmarkApp)
}

function check(){
    if(alphaChecked.checked || numberChecked.checked || specialCharChecked.checked){
        if(alphaChecked.checked && numberChecked.checked && specialCharChecked.checked){
            alphaChecked.checked = false
            numberChecked.checked = false
            specialCharChecked.checked = false
            
            alphaChecked.disabled = true
            numberChecked.disabled = true
            specialCharChecked.disabled = true

            allChecked.checked = true
        }else{
            allChecked.disabled = false
        }
    }else{
        allChecked.disabled = false
    }
}

function checkChange() {
    if(allChecked.checked) {
        alphaChecked.checked = false
        numberChecked.checked = false
        specialCharChecked.checked = false

        alphaChecked.disabled = true
        numberChecked.disabled = true
        specialCharChecked.disabled = true
    }else{
        alphaChecked.disabled = false
        numberChecked.disabled = false
        specialCharChecked.disabled = false
    }
}

function rep(size,strength,arr) {
    arr1 = []
    for(let i=0; i<size; i++){
        let ran = Math.floor(Math.random()*strength)
        arr1[i] = arr[ran]
        pass1btn.textContent += arr1[i]
    }
    arr2 = []
    for(let i=0; i<size; i++){
        let ran = Math.floor(Math.random()*strength)
        arr2[i] = arr[ran]
        pass2btn.textContent += arr2[i]
    }

    isAvailable = true
    para.textContent = "Click above to bookmark below"
}

function generate() {
    let size = inp.value
    if(size>=8 && size<=32 && appName.value) {
        if(!isAvailable && alphaChecked.checked && numberChecked.checked && !specialCharChecked.checked){
            rep(size,62,alphaNum)
        }
        else if(!isAvailable && !alphaChecked.checked && numberChecked.checked && specialCharChecked.checked){
            rep(size,18,numSpecial)
        }
        else if(!isAvailable && alphaChecked.checked && !numberChecked.checked && specialCharChecked.checked){
            rep(size,60,alphaSpecial)
        }
        else if(!isAvailable && alphaChecked.checked && !numberChecked.checked && !specialCharChecked.checked){
            rep(size,52,alphabets)
        }
        else if(!isAvailable && !alphaChecked.checked && numberChecked.checked && !specialCharChecked.checked){
            rep(size,10,numbers)
        }
        else if(!isAvailable && !alphaChecked.checked && !numberChecked.checked && specialCharChecked.checked){
            rep(size,8,specialChar)
        }
        else if(!isAvailable && allChecked.checked){
            rep(size,70,characters)
        }
        else if(!isAvailable && !allChecked.checked && !alphaChecked.checked && !numberChecked.checked && !specialCharChecked.checked){
            alert("Choose the pattern of required password")
        }
        else{
            pass1btn.textContent = ""
            pass2btn.textContent = ""
            isAvailable = false
            generate()
        }
    }else{
        alert("Password length must be between 8 to 32 (both inclusive) AND Application name you are going to use this password for must be given")
    }
    clicked1 = false
    clicked2 = false
}

pass1btn.addEventListener("click", function() {
    if(isAvailable) {
        if(!clicked1 && !clicked2) {
            app = appName.value
            bookmarkApp.push(app)
            localStorage.setItem("myAppName", JSON.stringify(bookmarkApp) )
            appName.value = ""
            saveRender(bookmarkApp)

            arrToStr = arr1.join("")
            bookmark.push(arrToStr)
            localStorage.setItem("myPass", JSON.stringify(bookmark) )
            render(bookmark)
            clicked1 = true
        }
        else{
            alert("You can choose only one option & that too once")
        }
    }

    // btn.innerHTML = `<button class="btn btn-danger" id="delBtn">CLEAR ALL</button>`
    // delBtn.addEventListener("click", function() {
    //     localStorage.clear()
    //     bookmark = []
    //     render(bookmark)
    // })
})

pass2btn.addEventListener("click", function() {
    if(isAvailable) {
        if(!clicked2 && !clicked1) {
            app = appName.value
            bookmarkApp.push(app)
            localStorage.setItem("myAppName", JSON.stringify(bookmarkApp) )
            appName.value = ""
            saveRender(bookmarkApp)

            arrToStr = arr2.join("")
            bookmark.push(arrToStr)
            localStorage.setItem("myPass", JSON.stringify(bookmark) )
            render(bookmark)
            
            clicked2 = true
        }
        else{
            alert("You can choose only one option & that too once")
        }
    }
})

function render(pass) {
    let listItems = ""
    for (let i = 0; i < pass.length; i++) {
        listItems += `
            <li>
                ${pass[i]}
            </li>
        `
    }
    list.innerHTML = listItems


    if(listItems) {
        btn.innerHTML = `<button class="btn btn-danger" id="delBtn">CLEAR ALL</button>`
        delBtn.addEventListener("click", function() {
            localStorage.clear()
            bookmark = []
            bookmarkApp = []
            render(bookmark)
            saveRender(bookmarkApp)
        })
    }else{
        inp.value = ""
        pass1btn.textContent = ""
        pass2btn.textContent = ""
        para.textContent = ""
        btn.innerHTML = ``
    }
}

function saveRender(saveCheck) {
    let saveItems = ""
    for (let i = 0; i < saveCheck.length; i++) {
        saveItems += `
            <li>
                <p id="save">${saveCheck[i]}:</p>
            </li>
        `
    }
    saveList.innerHTML = saveItems
}
