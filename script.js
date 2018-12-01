let baseUrl = "https://bonus.ly";
$(document).ready(function(){
  $('.recent_comments').slick({
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoPlaySpeed: 100000,
    cssEase: 'linear',
    centerMode: true
  });
  setTimeout(function(){
    $('.user_tip, .user_tip:before').fadeIn(500);
  }, 5000);
    var $bonuses = $.ajax({
      method: 'GET',
      url: 'https://bonus.ly/api/v1/bonuses?access_token=a944257795730724197edf48bd2fba6d',
      dataType: 'json'
    });
    $bonuses.done(function(data) {
        let bonuses = data.result;
        function loadBonuses () {
          for (let i = 0; i < bonuses.length; i++) {
            $(".feed_list").append(
              '<div class="bonus_item"> <h3>' + bonuses[i].giver.display_name + '<h3><p>' + bonuses[i].reason_html + '</p><span class="points">+'+bonuses[i].amount_with_currency+'!</span></div>'
          );}
        }
        loadBonuses();
        $(".bonus_feed").on("click", function(event){
          event.preventDefault();
          $(".feed_list").empty();
          loadBonuses();
        });
        $(".hashtag_feed").on("click", function(event){
          event.preventDefault();
          $(".feed_list").empty();
          for (let i = 0; i < bonuses.length; i++) {
            console.log(bonuses[i].hashtag);
            if(bonuses[i].hashtag !== null){
              $(".feed_list").append(
                '<div class="hashtag_item"><h2>' + bonuses[i].hashtag + '</h2></div>'
              );
            }
          }
        });
    });
    $bonuses.fail(function(err) {
    console.log(err);
    });

    var $users = $.ajax({
      method: 'GET',
      url: 'https://bonus.ly/api/v1/users?access_token=a944257795730724197edf48bd2fba6d',
      dataType: 'json'
    });
    $users.done(function(usersData){
      let users = usersData.result;
      let statusImg = "";
      for (let i = 0; i < users.length; i++) {
        if(users[i].can_give === true) {
          statusImg = '<i class="fas fa-circle"></i>'
        }else{
          statusImg = '<i class="fas fa-times-circle"></i>'
        }
        $(".user_list").append('<li class="user_item"><img src="'+users[i].profile_pic_url+'" alt="profile picture"/><span>' + users[i].display_name + statusImg +'</span></li>')
      }
      $(".user_feed").on("click", function(event){
        event.preventDefault();
        $(".feed_list").empty();
        for (let i = 0; i < users.length; i++) {
          $(".feed_list").append(
            '<div class="user_feed_item"><a href="'+baseUrl+users[i].path+'"><img src="'+users[i].profile_pic_url+'" alt="profile picture"/></a><h3>'+users[i].full_name+'</h3></div>'
          )
        }
      })
    })
    $users.fail(function(err) {
    console.log(err);
    });
});
