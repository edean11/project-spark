'use strict';

function hello() {
  return 'world';
}
////////////////////////
// Selector variables //
////////////////////////

var $tbody = $('#tbody'),
    FIREBASE_URL = 'https://project-spark.firebaseio.com',
    fb           = new Firebase(FIREBASE_URL);

    // Firebase Web Sockets Method
      //usersFb.once('value', function(res){
        //console.log(res.val())
    //});


    //var usersDataFb = new Firebase(FIREBASE_URL+'/users/'+fb.getAuth().uid + 'data');
      //usersFb.once('value', function(res){
        //console.log(res.val())
    //});


////////////////////////////////
// Login/Logout Functionality //
////////////////////////////////
    //


  $('.register').click(function(event){
    event.preventDefault();
    var $form = $($(this).closest('form')),
        email = $form.find('[type="text"]').val(),
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
        email = $form.find('[type="text"]').val(),
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

/////////////////////////////////////////////////////////////////
//////////////////// Profile Setup /////////////////////////////
////////////////////////////////////////////////////////////////


// Profile Picture Addition
var $profilePictureContainer = $('.appendedProfilePic');
var $submitProfilePic = $('#submitProfilePic');
var $profilePicInput = $('.profilePicture');

$submitProfilePic.click(function(){
  $profilePicInput.toggleClass('hidden');
  var $pic = $('#profilePictureUrl').val();
  var $img = $('<img src='+$pic+'></img>');
  $profilePictureContainer.append($img);
});

// Profile Reset

var $resetProfileButton = $('#resetProfileButton');

$resetProfileButton.click(function(){
  location.reload(true);
});

// Profile Save

var $saveProfileButton = $('#saveProfileButton');

$saveProfileButton.click(function(){
  $('.loggedIn').toggleClass('hidden');
  $('.app').toggleClass('hidden');
  saveProfile(fb.getAuth().uid);
});

function saveProfile(uid){
  var usersProfileFb = new Firebase(FIREBASE_URL+'/users/'+uid+'/profile');
  var $img = $('#profilePictureUrl').val();
  var $username = $('#username').val();
  var $gender = $('.genderSelect').val();
  var $description = $('#textarea').val();
  var $email = $('#userEmail').val();
  var profileObject = { ProfilePic: $img, Username: $username, Gender: $gender, Bio: $description, Email: $email }
  usersProfileFb.push(profileObject);
}


///////////////////////////////////////////////////////////////
/////////////////// App Page ///////////////////////////////////
//////////////////////////////////////////////////////////////

// Post//////////////// 

/////////////////////////////////////////////////////////////////////
////////// On Window Load Get and Load Current Address Book //////////
///////////////////////////////////////////////////////////////////

  //if authenticated, get go to app page
  if (fb.getAuth()) {
    var token        = fb.getAuth().token;
        $('.login').toggleClass('hidden');
        $('.loggedIn').toggleClass('hidden');
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
// Find users not liked or disliked

// Find a users matches
//fb.child('users').once('value', function (snap) {
  //var data = snap.val();

  //console.log('Undecided simplelogin:1', undecided(data, 'simplelogin:1'));

  //console.log('Matches simplelogin:1', matches(data, 'simplelogin:1'));
  //console.log('Matches simplelogin:2', matches(data, 'simplelogin:2'));
  //console.log('Matches simplelogin:3', matches(data, 'simplelogin:3'));
  //console.log('Matches simplelogin:4', matches(data, 'simplelogin:4'));
  //console.log('Matches simplelogin:5', matches(data, 'simplelogin:5'));
//})

function undecided(data, uid) {
  var userList = _.keys(data),
      myLikes = usersLikes(data[uid].data),
      myDislikes = usersDislikes(data[uid].data);

  return _.difference(userList, myLikes, myDislikes, [uid]);
}

function matches(data, uid) {
  var myLikes = usersLikes(data[uid].data);

  return _.filter(myLikes, function (user, i) {
    var user = data[user] || {},
        userData = user.data || {},
        userLikes = usersLikes(userData);

    return _.includes(userLikes, uid);
  });
}

function usersLikes(userData) {
  return _(userData.likes)
    .values()
    .map(function (user) {
      return user.id;
    })
    .value();
}

function usersDislikes(userData) {
  return _(userData.dislikes)
    .values()
    .map(function (user) {
      return user.id;
    })
    .value();
}


/*

*/
