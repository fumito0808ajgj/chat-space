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
       $('.chat-main__message-list').append(html);
       $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight}); 
       $('.submit-btn').prop("disabled", false);     
       $('form')[0].reset();
     })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
     });
 })
 var reloadMessages = function() {
  last_message_id = $('.message:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat-main__message-list').append(insertHTML);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    }
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);

  };

 };
});