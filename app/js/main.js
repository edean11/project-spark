'use strict';

//var $ = require('jquery'),
    //_ = require('lodash'),
    //Firebase = require('firebase');

function hello() {
  return 'world';
}
////////////////////////
// Selector variables //
////////////////////////

var $newContactButton = $('.newContactButton'),
    $addContactButton = $('.addContactButton'),
    $tbody = $('#tbody'),
    $hiddenContainer = $('.hiddenContainer'),
    FIREBASE_URL = 'https://address-booking.firebaseio.com',
    fb           = new Firebase(FIREBASE_URL);

    // Firebase Web Sockets Method
    // usersFb = new Firebase(FIREBASE_URL+'/users/'+fb.getAuth().uid + 'data/friends');
    // usersFb.once('value', function(res){
    //  console.log(res.val())
    // })

////////////////////////////////
// Login/Logout Functionality //
////////////////////////////////

  $('.register').click(function(event){
    event.preventDefault();
    var $form = $($(this).closest('form')),
        email = $form.find('[type="email"]').val(),
        pass = $form.find('[type="password"]').val();
    fb.createUser({
        email: email,
        password: pass
      },
      function(err){
        if(!err){
              fb.authWithPassword({
                email: email,
                password: pass
              },
                function(err, auth){
                    location.reload(true);
              }
            );
        } else {}
      }
    );

  });

  $('.loginButton').click(function(event){
    event.preventDefault();

    var $form = $($(this).closest('form')),
        email = $form.find('[type="email"]').val(),
        pass = $form.find('[type="password"]').val();

    fb.authWithPassword({
      email    : email,
      password : pass
      }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        location.reload(true);
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  });

  $('.logout').click(function(){
    fb.unauth();
    location.reload(true);
  });

/////////////////////////////////////////////////////////////////////
////////// On Window Load Get and Load Current Address Book //////////
///////////////////////////////////////////////////////////////////

  //if authenticated, get addresses

  if (fb.getAuth()) {
    var token        = fb.getAuth().token;
    $('.login').remove();
    $('.loggedIn').toggleClass('hidden');

    JSONGetAddresses(fb.getAuth().uid);
  }

  // Get addresses function
  function JSONGetAddresses(uid){
    var token        = fb.getAuth().token;
    $.get(FIREBASE_URL + '/users/' + uid + '/data/friends.json?auth='+token, function(res){
      if(res !== null) {
        Object.keys(res).forEach(function(uuid){
          loadCurrentAddressBook(uuid, res[uuid]);
        });
      }
    });
  }


  // Load Current Address Book
  function loadCurrentAddressBook(uuid, data){
      var $tr = $('<tr class="tableRow"></tr>');
        var $nameTd = $('<td>'+data.name+'</td>');
        var $phoneNumberTd = $('<td>'+data.phonenumber+'</td>');
        var $emailTd = $('<td>'+data.email+'</td>');
        var $twitterTd = $('<td>'+data.twitter+'</td>');
        var $instagramTd = $('<td>'+data.instagram+'</td>');
        var $photoTd = $('<td><img src='+data.photo+'></img></td>');
      var $remove = $('<td><button class="removeButton">Remove</button></td>');

      $tr.append($photoTd);$tr.append($nameTd);$tr.append($phoneNumberTd);$tr.append($emailTd);
      $tr.append($twitterTd);$tr.append($instagramTd);$tr.append($remove);
      $tr.attr('data-uuid', uuid);
      $tbody.append($tr);
  }

/////////////////////////////////////////////////
/////////////// New Contact /////////////////////
/////////////////////////////////////////////////

// On New/Add Contact Click, Create A Table Row

  $newContactButton.click(function(evt){
    evt.preventDefault();
    $hiddenContainer.css('display', 'inline-block');
  });

  $addContactButton.click(function(evt){
    evt.preventDefault();
    addRowToTable();
    $hiddenContainer.css('display', 'none');
    this.form.reset();
  });

  // add row to table function
  function addRowToTable(){
    createTableElementsFromInputs();
    postTableElementsFromInputs();
  }

  function createTableElementsFromInputs(){
    var $tr = $('<tr class="tableRow"></tr>');
    var $nameInput = $('#nameInput').val();
      var $nameTd = $('<td>'+$nameInput+'</td>');
    var $phoneNumberInput = $('#phoneNumberInput').val();
      var $phoneNumberTd = $('<td>'+$phoneNumberInput+'</td>');
    var $emailInput = $('#emailInput').val();
      var $emailTd = $('<td>'+$emailInput+'</td>');
    var $twitterInput = $('#twitterInput').val();
      var $twitterTd = $('<td>'+$twitterInput+'</td>');
    var $instagramInput = $('#instagramInput').val();
      var $instagramTd = $('<td>'+$instagramInput+'</td>');
    var $photoInput = $('#photoInput').val();
      var $photoTd = $('<td><img src='+$photoInput+'></img></td>');
    var $remove = $('<td><button class="removeButton">Remove</button></td>');

    $tr.append($photoTd);$tr.append($nameTd);$tr.append($phoneNumberTd);$tr.append($emailTd);
    $tr.append($twitterTd);$tr.append($instagramTd);$tr.append($remove);
    $('tbody').append($tr);

  }

  function postTableElementsFromInputs(){
    var $tr = $('tr:last-child');
    var token        = fb.getAuth().token;
    var  url = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data/friends.json?auth='+token;
    //var object = {photo: $photoInput, name: $nameInput,  phonenumber: $phoneNumberInput, email: $emailInput, twitter: $twitterInput, instagram: $instagramInput};
    var object = {photo: $('#photoInput').val(), name: $('#nameInput').val(),  phonenumber: $('#phoneNumberInput').val(), 
      email: $('#emailInput').val(), twitter: $('#twitterInput').val(), instagram: $('#instagramInput').val()};

    $.post(url, JSON.stringify(object), function(res){
      $tr.attr('data-uuid', res.name);
    });
  }
////////////////
// Remove Row //
////////////////

  $tbody.on("click", "button", function(){
    var $tr = $(this).closest('tr');
    var token        = fb.getAuth().token;
    var uuid = $tr.data('uuid');
    var url = FIREBASE_URL + '/users/' + fb.getAuth().uid + '/data/friends/'+uuid+'.json?auth='+token;
    $.ajax({url: url, type:'DELETE'});
    removeElement($tr);
  });

  function removeElement(element){
    element.remove();
  }


