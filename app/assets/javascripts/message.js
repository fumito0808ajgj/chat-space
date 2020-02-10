$(function(){ 
     function buildHTML(message){
      if ( message.image ) {
        var html =
         `<div class="post-message" data-message-id=${message.id}>
            <div class="message-info">
              <div class="name">
                ${message.user_name}
              </div>
              <div class="date">
                ${message.created_at}
              </div>
            </div>
            <div class="post">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
         `<div class="post-message" data-message-id=${message.id}>
            <div class="message-info">
              <div class="name">
                ${message.user_name}
              </div>
              <div class="date">
                ${message.created_at}
              </div>
            </div>
            <div class="post">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       console.log(html);
       $('.chat-main__message-list').append(html);
       $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight}); 
       $('.submit-btn').prop("disabled", false);     
       $('form')[0].reset();
     })
})
});