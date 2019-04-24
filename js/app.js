'use strict';
//create MyHorn object by passing an object
function MyHorn(horn){

  this.image_url=horn.image_url;
  this.title=horn.title;
  this.description=horn.description;
  this.keyword=horn.keyword;
  this.MyHorn=horn.MyHorn;

}
//an array to hold all the MyHorn
MyHorn.allMyHorn=[];

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
  MyHorn.allMyHorn.forEach(horn=>horn.render());


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

$(()=>MyHorn.readJson('../data/page-1.json'));
