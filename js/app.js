'use strict';
//create MyHorn object by passing an object
function MyHorn(horn){

  this.image_url=horn.image_url;
  this.title=horn.title;
  this.description=horn.description;
  this.keyword=horn.keyword;
  this.horns=horn.horns;

}
//an array to hold all the MyHorn
MyHorn.allMyHorn=[];


MyHorn.prototype.tohtml=function(){
  let $target=$('#handlebar').html();
  let $source=Handlebars.compile($target);
  return $source(this);
};



MyHorn.readJson=(filename)=>{

  $.get(filename,'json')

    .then(data=>{

      data.forEach(horn=>{
        MyHorn.allMyHorn.push(new MyHorn(horn));
      });
    })

    .then (MyHorn.loadMyHorn).then(MyHorn.imgselect);

};

MyHorn.loadMyHorn=()=>
  MyHorn.allMyHorn.forEach(horn=>{$('#photo-template').append(horn.tohtml());});


MyHorn.imgselect=function(){

  let newarr=[];
  MyHorn.allMyHorn.forEach(item=>{
    // add unique keywords to the dropdown list
    if(!newarr.includes(item.keyword)){

      $('select').append('<option class="clone"></option>');
      let opt=$('option[class="clone"]');
      opt.text(item.keyword);
      newarr.push(item.keyword);
      opt.removeClass('clone');
    }
  });

};

MyHorn.prototype.render=function(){

  $('#photo-template').append('<div class="clone"></div>');
  let hornClone=$('div[class="clone"]');
  let hornHtml=$('#template').html();
  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src',this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.find('p').text(this.keyword);
  hornClone.find('p').text(this.MyHorn);
  hornClone.removeClass('clone');
  hornClone.attr('class',this.keyword);

};

$('select').on('change',popimg);
function popimg(){
  //clear all the former images in the div
  $('div').remove();
  let selecteditem=$(this).val();
  //go throught the horns array and find keyword mathes the selected one, render that image
  MyHorn.allMyHorn.forEach(item=>{

    if (selecteditem===item.keyword){
      item.render();
    }
  });
}

$('#sortbytitle').on('change',function(){

  $('div').remove();
  MyHorn.allMyHorn.sort((a,b)=>{
    a=a.title.toUpperCase();
    b=b.title.toUpperCase();
    if(a>b){
      return 1;
    }
    else if(a<b){
      return -1;
    }
    else {
      return 0;
    }
  });
  MyHorn.loadMyHorn();
});

$('#sortbynumber').on('change',function(){
  $('div').remove();
  MyHorn.allMyHorn.sort((a,b)=>{
    return a.horns-b.horns;
  });
  MyHorn.loadMyHorn();
});



$('#one').on('click',function(){
  $('div').remove();
  //clear the dropdown list
  $('option').remove();
  MyHorn.allMyHorn=[];

  //load the page
  $(()=>MyHorn.readJson('data/page-1.json'));
});



$('#two').on('click',function(){
//clear the div
  $('div').remove();
  //clear the dropdown list
  $('option').remove();
  //load the page
  MyHorn.allMyHorn=[];

  $(()=>MyHorn.readJson('data/page-2.json'));
});



$(()=>MyHorn.readJson('data/page-1.json'));
