const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

function send(onError, onSuccess, url, method = 'GET', data = null, headers = [], timeout = 15000) {
  let xhr;

  if (window.XMLHttpRequest) {
      // Chrome, Mozilla, Opera, Safari
      xhr = new XMLHttpRequest();
  }  else if (window.ActiveXObject) { 
      // Internet Explorer
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xhr.open(method, url, true);


  headers.forEach((header) => {
      xhr.setRequestHeader(header.key, header.value);
  })
  

  xhr.timeout = timeout;

  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
      if(xhr.status >= 400) {
          onError(xhr.statusText)
      } else {
          onSuccess(xhr.responseText)
      }
      }
  }

  xhr.send(data);
}

 class GoodsItem{
    constructor(title,price,id){
        this.title = title;
        this.price = price;
        this.id = id;
    }

    render() {
       return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
 }


class GoodsList{
    constructor(cart) {
     this.goods = [];
     this._cart = cart;
     this._el =  document.querySelector('.goods-list');
     this._el.addEventListener('click',this._onClick.bind(this));
    }
   
     fetchGoods() { 
        fetch(`${API_URL}catalogData.json`)
        .then((response) => {
          return response.json();
        })
        .then((request) => {
          this.goods = request.map(good => ({title: good.product_name, price: good.price,id: good.id_product}))
          this.render();
        })
        .catch((err) => { 
          console.log(err.text)
        })
        }

    _onClick(e) {
    const id = e.target.getAttribute('data-id')
    if(id) {
        fetch(`${API_URL}addToBasket.json`)
        .then(() =>{
        this._cart.add(this.goods.find((good) => good.id === id))
        })
    }
    }

     render () { 
         let listHtml = '';
         this.goods.forEach(good =>{
             const goodItem = new GoodsItem(good.title, good.price,good.id);
             console.log(goodItem)
             listHtml += goodItem.render();
         });
         this._el.innerHTML = listHtml;
    }
}
class CartItem extends GoodsItem{
    constructor(title,price,id){
        super(title,price,id);
    }
}

 class Cart{
    constructor(){
        this._list = [];
        this.btn = document.querySelector('.cart-button')
        this.el =document.querySelector('.cart')
        this.btn.addEventListener('click', this._onToggleCart.bind(this))
        this._el.addEventListener('click', this._onClick.bind(this))
    }
   add(good){
       this._list.push(good);
       this.render()
   }
 
   _onClick(e){
    const id = e.target.getAttribute('data-id')
  fetch(`${API_URL}deletFromBasket.json `)
  .then(() =>{
      const index = this._list.findIndex((good) => good.id === id )
    this.list.splice(index, 1)
    this.render()
  })
   }

    _onToggleCart(){
    this.el.classList.toggle('active');
    }

    render(){
        let listHtml = '';
         this._list.forEach(good =>{
             const goodItem = new CartItem(good.title, good.price,good.id);
             console.log(goodItem)
             listHtml += goodItem.render();
         });
         this._el.innerHTML = listHtml;
    }
       
    load() {
        fetch(`${API_URL}getBasket.json`)
        .then((response) => {
           return response.json()
        })
        .then((goods) =>{
        this._list = goods.contents.map(good => ({title: good.product_name, price: good.price,  id: good.id_product}))
        this.render ()
        })
    }
}

 
 const cart = new Cart();
 const list = new GoodsList(cart);
 list.fetchGoods();
 cart.load();



