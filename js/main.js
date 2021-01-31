var cart = {}; //cart


function init(){
  //вывод товара на гравную страницу
  $.getJSON("https://raw.githubusercontent.com/mxblk/json/main/store.json", productsOut);
}
function productsOut(data){
  //вывод товара на гравную страницу
  console.log(data);
  var out = '';
  for(var key in data){
    out+='<div class="cart">';
    out+='<p class="name">'+data[key].name+'</p>';
    out+='<img width="150px" src="img/'+data[key].img+'"alt="">';
    out+='<div class="price">'+data[key].price+'</div>';
    out+='<button class="add-to-cart" data-id="'+key+'">buy now</button>';
    out+='</div>';
  //---------------------------------ES6
  //    out+='<div class="cart">';
  //    out+=`<p class="name">${data[key].name}</p>`;
  //    out+=`<img width="150px" src="img/${data[key].img}"alt="">`;
  //    out+=`<div class="price">${data[key].price}</div>`;
  //    out+='<button class="add-to-cart">buy now</button>';
  //    out+='</div>';
  }
  $('.products-out').html(out);
  $('.add-to-cart').on('click', addToCart);
}

function addToCart(){
  //add item to cart
  var id = $(this).attr('data-id');
  if (cart[id]==undefined){
    cart[id] = 1;
  }
  else{
    cart[id]++;
  }
  showMiniCart();
  saveCart();
};
function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
function showMiniCart(){
  var out = '';
  for(var key in cart){
    out += key +' --- '+ cart[key] +'</br>';
  }
  $('.mini-cart').html(out);
}
function loadCart(){
  //проверяю есть ли в локал сторедж запись cart
  if (localStorage.getItem('cart')){
    //если есть, расшифровываю и отрисовываю
    cart = JSON.parse(localStorage.getItem('cart'));
    showMiniCart();
  }
}
$(document).ready(function(){
  init();
  loadCart();
  console.log('init');

});
