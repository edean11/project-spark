'use strict';

function hello() {
  return 'world';
}
////////////////////////
// Selector variables //
////////////////////////

var $tbody = $('#tbody'),
    FIREBASE_URL = 'https://address-booking.firebaseio.com',
    fb           = new Firebase(FIREBASE_URL);

    // Firebase Web Sockets Method
    //var usersFb = new Firebase(FIREBASE_URL+'/users/'+fb.getAuth().uid + 'data/friends');
    //usersFb.once('value', function(res){
      //console.log(res.val())
    //});

////////////////////////////////
// Login/Logout Functionality //
////////////////////////////////

  $('.register').click(function(event){
    event.preventDefault();
    var $form = $($(this).closest('form')),
        username = $form.find('[type="url"]').val(),
        pass = $form.find('[type="password"]').val();
    fb.createUser({
        username: username,
        password: pass
      },
      function(err){
        if(!err){
              fb.authWithPassword({
                email: username,
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
        username = $form.find('[type="url"]').val(),
        pass = $form.find('[type="password"]').val();

    fb.authWithPassword({
      email    : username,
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

/////////////////////////////////////////////////////////////////////
////////// On Window Load Get and Load Current Address Book //////////
///////////////////////////////////////////////////////////////////

  //if authenticated, get go to app page
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



