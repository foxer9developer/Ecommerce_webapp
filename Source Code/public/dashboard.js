function logout() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        location.href = "index.html"
    }, function(error) {
        console.error('Sign Out Error', error);
    });
}
var database = firebase.database();
var addToCartButtons = document.getElementsByClassName('cart')
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
}
var buyNowButtons = document.getElementsByClassName('buy')
for (var i = 0; i < buyNowButtons.length; i++) {
    var button = buyNowButtons[i];
    button.addEventListener('click', buyNowClicked);
}
function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('product')[0].innerText;
    var price = shopItem.getElementsByClassName('price')[0].innerText;
    var database = firebase.database();
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/cart').push().set({
        product: title,
        price: price,
    }, function(error) {
        if (error) {
            alert("Failed To Add");
        } else {
            alert("Product Added To Cart")
        }
    });
}
function buyNowClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('product')[0].innerText;
    var price = shopItem.getElementsByClassName('price')[0].innerText;
    var database = firebase.database();
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/buy').push().set({
        product: title,
        price: price,
    }, function(error) {
        if (error) {
            alert("Failed To Add");
        } else {
            location.href = "cart.html";
        }
    });
}