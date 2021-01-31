var cart = {};
function loadCart(){
  //проверяю есть ли в локал сторедж запись cart
    if (localStorage.getItem('cart')){
      //если есть, расшифровываю и отрисовываю
      cart = JSON.parse(localStorage.getItem('cart'));
      showCart();
    }
    else{
      $('.main-cart').html('Cart is empty. Please choose <a href="index.html">product</a>');
    }
}
function showCart(){
  if (!isEmpty(cart)){
    $('.main-cart').html('Cart is empty. Please choose <a href="index.html">product</a>');
  }
  else{
    $.getJSON('https://raw.githubusercontent.com/mxblk/json/main/store.json',function( data){
        var products = data;
        var out ='';
        for( var id in cart){
          out+='<button data-id="'+id+'" class="delete">X</button>';
          out+='<img width="50px" src="../app/img/'+products[id].img+'"alt="">';
          out+='<h4>'+products[id].name+'</h4>';
          out+='<button data-id="'+id+'" class="minus">-</button>';
          out+='<span>'+cart[id]+'</span>' //колличество
          out+='<button data-id="'+id+'" class="plus">+</button>';
          out+='<span>'+cart[id]*products[id].price+'</span>';
          out+='</br>';
        }
        $('.main-cart').html(out);
        $('.delete').on('click', deleteItem);
        $('.plus').on('click', plusItem);
        $('.minus').on('click', minusItem);
    });
  }

}
function deleteItem() {
  var id = $(this).attr('data-id');
  delete cart[id];
  saveCart();
  showCart();
}
function plusItem() {
  var id = $(this).attr('data-id');
  cart[id]++;
  saveCart();
  showCart();
}
function minusItem() {
  var id = $(this).attr('data-id');
  if(cart[id]>1){
    cart[id]--;
  }else{
    delete cart[id];
  }
  saveCart();
  showCart();
}
function saveCart(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
function isEmpty(object){
  for( var key in object){
    if(object.hasOwnProperty(key)) return true;
    return false;
  }
}

function sendEmail(){
  var ename = $('#ename').val();
  var email = $('#email').val();
  var ephone = $('#ephone').val();
  if(ename!=''&&email!=''&ephone!=''){
      if(isEmpty(cart)){
          $.post(
            "../core/mail.php",
            {
              "ename" : ename,
              "email" : email,
              "ephone" : ephone,
              "cart"  : cart
            },
            function(data){
              console.log(data)
            }
          )
      }
      else {
        alert('Cart is empty!')
      }
  }
  else{
    alert('fill out all fields')
  }
}
$(document).ready(function(){
    loadCart();
    $('.send__email').on('click', sendEmail);
});
