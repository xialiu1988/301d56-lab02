'use strict';

function Horns(horn){

    this.image_url=horn.image_url;
    this.title=horn.title;
    this.description=horn.description;
    this.keyword=horn.keyword;
    this.horns=horn.horns;
  
  }
  
  Horns.allHorns=[];
 
  Horns.readJson=(filename)=>{
    Horns.allHorns=[];
    $.get(filename,'json')
  
      .then(data=>{
  
        data.forEach(horn=>{
          Horns.allHorns.push(new Horns(horn))
        })
      })
  
      .then (Horns.loadHorns).then(Horns.imgselect)
  
  };

  Horns.loadHorns=()=>
  Horns.allHorns.forEach(horn=>{
      
    $('#photo-template').append('<div class="clone"></div>');
    let hornClone=$('div[class="clone"]');
    let hornHtml=$('#template').html();
    hornClone.html(hornHtml);
  
    hornClone.find('h2').text(horn.title);
    hornClone.find('img').attr('src',horn.image_url);
    hornClone.find('p').text(horn.description);
    hornClone.find('p').text(horn.keyword);
    hornClone.find('p').text(horn.horns);
    hornClone.removeClass('clone');
    hornClone.attr('class',horn.keyword);
  });


Horns.imgselect=function(){

  let newarr=[];
  Horns.allHorns.forEach(item=>{

    if(!newarr.includes(item.keyword)){

      $('select').append('<option class="clone"></option>');
      let opt=$('option[class="clone"]');
      opt.text(item.keyword);
      newarr.push(item.keyword);
      opt.removeClass('clone');
    }
  })

}

Horns.prototype.render=function(){

    $('#photo-template').append('<div class="clone"></div>');
    let hornClone=$('div[class="clone"]');
    let hornHtml=$('#template').html();
    hornClone.html(hornHtml);
  
    hornClone.find('h2').text(this.title);
    hornClone.find('img').attr('src',this.image_url);
    hornClone.find('p').text(this.description);
    hornClone.find('p').text(this.keyword);
    hornClone.find('p').text(this.horns);
    hornClone.removeClass('clone');
    hornClone.attr('class',this.keyword);
  
  }
  
  $('select').on('change',popimg);
function popimg(){
  $('div').remove();
  let selecteditem=$(this).val();

  Horns.allHorns.forEach(item=>{

    if (selecteditem===item.keyword){
      item.render();
    
    }
  });

}

$(()=>Horns.readJson('../data/page-1.json'));
