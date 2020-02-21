$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="post-message" data-message-id=` + message.id + `>` +
        `<div class="message-info">` +
          `<div class="name">` +
            message.user_name +
          `</div>` +
          `<div class="date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="post">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="post-message" data-message-id=` + message.id + `>` +
        `<div class="message-info">` +
          `<div class="name">` +
            message.user_name +
          `</div>` +
          `<div class="date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="post">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="post-message" data-message-id=` + message.id + `>` +
        `<div class="message-info">` +
          `<div class="name">` +
            message.user_name +
          `</div>` +
          `<div class="date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="post">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };
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
  last_message_id = $('.post-message:last').data("message-id");
  console.log(last_message_id);
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

};
  
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);

  };
});