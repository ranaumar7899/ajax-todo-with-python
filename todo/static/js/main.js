    (function($){
'use strict';
$(function(){
var todoListItem = $('.todo-list');
var todoListInput = $('.todo-list-input');

// =====================================add item================================================
$(document).on("submit", '#add_list_form', function(event){
event.preventDefault();
var ru_formdata =  new FormData($('#add_list_form')[0]);
var item = $('.todo-list-input').val();
$.ajax({
        url: ru_ajax_url+"add_item",
        type: "POST",
        data: ru_formdata,
        processData: false,
    	  contentType: false,
        beforeSend: function(){
            jQuery('.ru_ajax_wait').css({display: 'block'});
        },
        success: function (data){
          jQuery('.ru_ajax_wait').css({display: 'none'});
          if(data.item_id)
          {
            var item_id=data.item_id;
            todoListItem.append('<li class="list_item_'+item_id+'"><div class="form-check"><label class="form-check-label"><input class="checkbox mark_complete mark_complete_'+item_id+'" name="mark_complete" type="checkbox" data-itemid="'+item_id+'" />' + item + '<i class="input-helper"></i></label></div><i class="remove mdi mdi-close-circle-outline remove_item mark_complete_'+item_id+'" data-itemid="'+item_id+'"></i></li>');
			      todoListInput.val("");
          }
          else
          {
          	alert('item not created');
          }
        }
      });
});



// ===========================================on change complete=====================================

todoListItem.on('change', '.mark_complete', function(){

var item_id=$(this).data('itemid');
var csrfmiddlewaretoken=$('meta[name="csrfmiddlewaretoken"]').attr('content');
var item_value;
if($(this).is(":checked"))
{
   item_value=true;
}
else
{
   item_value=false;
}

// you can inlude this in ajax request as well
// headers: {
//             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//           },

$.ajax({
    url: ru_ajax_url+"update_item",
    type: "POST",
    data: {
      'item_id':item_id,
      'csrfmiddlewaretoken':csrfmiddlewaretoken,
      'item_value':item_value,
    },
    beforeSend: function(){
        jQuery('.ru_ajax_wait').css({display: 'block'});
    },
    success: function(data){
      jQuery('.ru_ajax_wait').css({display: 'none'});
      if(data.updated)
      {
          if($('.mark_complete_'+item_id).attr('checked'))
          {
            $('.mark_complete_'+item_id).removeAttr('checked');
          }
          else
          {
            $('.mark_complete_'+item_id).attr('checked', 'checked');
          }
          $('.list_item_'+item_id).toggleClass('completed');
      }
      else
      {
        alert("item  can't be updated");
      }
    }
});

});


// =====================================item remove================================================
todoListItem.on('click', '.remove_item', function(){
var item_id=$(this).data('itemid');
var csrfmiddlewaretoken=$('meta[name="csrfmiddlewaretoken"]').attr('content');

// you can inlude this in ajax request as well
// headers: {
//             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//           },

$.ajax({
    url: ru_ajax_url+"delete_item",
    type: "POST",
    data: {
      'item_id':item_id,
      'csrfmiddlewaretoken':csrfmiddlewaretoken, 
    },
    beforeSend: function(){
        jQuery('.ru_ajax_wait').css({display: 'block'});
    },
    success: function(data){
      jQuery('.ru_ajax_wait').css({display: 'none'});
      if(data.deleted)
      {
        $('.list_item_'+item_id).remove();
      }
      else
      {
        alert("item  can't be deleted");
      }
    }
});
});

});
})(jQuery);