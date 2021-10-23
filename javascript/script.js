

// const goods = [
//     {title: 'Shirt' , price: '150'},
//     {title: 'Socks' , price: '50'},
//     {title: 'Jacket' , price: '350'},
//     {title: 'Shoes' , price: '250'},
// ];

// const $goodsList = document.querySelector('.goods-list');

//  const renderGoodsItems=({title, price}) => {
//      return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
//  };

//  const renderGoodsList = (list = goods) => {
//   let goodsList = list.map(
//   (item) => {
//        return renderGoodsItems(item)
//   }
//   ).join(' ');

//   $goodsList.insertAdjacentHTML("beforeend", goodsList);
//  };

//  renderGoodsList();


/**Задание на урок 2 */

class GoodsItem{
 constructor(title,price){
     this.title = title;
     this.price = price;
 }
 render() {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
 }
}

class GoodsList{
     constructor(goods) {
     this.goods = [];
     
    }
   
     fetchGoods() { 
        this.goods = [
            {title: 'Shirt' , price: '150'},
            {title: 'Socks' , price: '50'},
            {title: 'Jacket' , price: '350'},
            {title: 'Shoes' , price: '250'},
           ];
        }
     render () { 
         let listHtml = '';
         this.goods.forEach(good =>{
             const goodItem = new GoodsItem(good.title, good.price);
             listHtml += goodItem.render();
         });
         document.querySelector('.goods-list').innerHTML = listHtml;
        }

      /**Первый вариант (можете сказать где ошибка?) 
       * Я пыталась попасть через метод fetchGoods ведь там находится массив this.goods 
       * и его перебрать или надо было это делать через метод GoodsList?
       */

        result() {
            function sumGoodsList(fetchGoods){
                let sum = 0;
                for(let goods of Object.values(goods)) {
                    sum += goods;
                }
                return sum;
            }
        }
        
     /**Второй вариант (можете сказать где ошибка?)
     * 
     * 
     */
     //  goodsSum (GoodsList) {
     //     let result = this.goods.reduce(function( price ){
     //         return price + price;
     //     },0);
     //  }
      /**Третий вариант(тоже выдаёт ошибку)
       * 
       */
     // sumGoodsList(fetchGoods) {
     //     return Object.values(fetchGoods).reduce((price) => price + price, 0);
     // }
    
}

//  class bascet{
//     constructor();
// }
//  class addedGoods{
//      constructor();
//  }


 const list = new GoodsList();
 list.fetchGoods();
 list.render();
//  console.log(GoodsItem.goodsSum);
 console.log(GoodsItem.result);

