'use strict';

var horns=[]
function Horn(image_url,title,description,keyword,horns){
this.image_url=image_url;
this.title=title;
this.description=description;
this.keyword=keyword;
this.horns=horns;
}


$.get('../data/page-1.json',data=>{
data.forEach(element => {  
   horns.push( new Horn(element.image_url,element.title,element.description,element.keyword,element.horns));
});

for(let i=0;i<horns.length;i++){
 console.log(horns[0].image_url);

 $('#template').append('<div class="clone"></div>');
 let clone=$('div[class="clone"]');
 let html=$('#photo-template').html();
  clone.html(html);
 clone.find('h2').text(horns[i].title);
  clone.find('img').attr('src',horns[i].image_url);
  clone.removeClass('clone');
}
});


