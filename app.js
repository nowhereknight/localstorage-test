window.onload = function() {
    updateUI();
};


/**
 * Function to generate random unique uuid values
 * @returns uuid 
 */
function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

/**
 * Function to Search by Value in Local Storage
 * @param {*} value 
 * @returns bool - true if found. false if not
 */
function searchInLocalStorage(value) {
    var i = 0;
    let keys = Object.keys(localStorage)
    while (i < keys.length) {
        let key = keys[i];
        let curr_value = localStorage.getItem(key);
        console.log(curr_value, "vs. ", value)
        if (curr_value == value) {
            console.log("Ya existe")
            return true;
        }
        i++;
    }
    return false
}


/**
 * Function to add the language value in the index.html form to localStorage
 */
function addToLocalStorage() {
    var language = document.getElementById('inputLanguage').value;
    console.log(searchInLocalStorage(language))
    if (language == "") {
        alert("Language must be filled out");
        return false;
    } else if (searchInLocalStorage(language)) {
        alert("Language already inserted");
        return false;
    } else {
        console.log("Language in input is", language);
        window.localStorage.setItem(uuidv4(), language);
        updateUI();
    }
}


/**
 * Given a key, it deletes the given key-value pair in localStorage
 * @param {*} key 
 */
function deleteFromLocalStorage(key) {
    window.localStorage.removeItem(key);
    updateUI();
}


/**
 * Function that updates the updates the DOM given the actual state of the LocalStorage
 */
function updateUI() {
    var display_div = document.getElementById("localStorage-curr")
    display_div.innerHTML = '';

    Object.keys(localStorage).forEach(function(key) {
        var tmp_div = document.createElement("div")
        tmp_div.id = key
        tmp_div.className = "language_div"
        tmp_div.innerText = localStorage.getItem(key) + "         "
        var delete_btn = document.createElement("button")
        delete_btn.innerText = "x"
            //var delete_i = document.createElement("i")
            //delete_i.classList.add("bi", "bi-trash")
            //delete_btn.appendChild(delete_i)
        delete_btn.addEventListener("click", function() {
            deleteFromLocalStorage(key)
        })
        tmp_div.appendChild(delete_btn)
        display_div.appendChild(tmp_div)
        display_div.appendChild(document.createElement("br"))
        display_div.appendChild(document.createElement("br"))

    });
}