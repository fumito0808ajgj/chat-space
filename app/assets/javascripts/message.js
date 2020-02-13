$(function(){ 
  console.log(last_message_id);
  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message-id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
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
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
      .fail(function() {
        console.log('error');
      });
    };   
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 7000);
    }
});