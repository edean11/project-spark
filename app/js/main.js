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

// Profile Save/Get

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
  return profileObject;
}

function appendProfile(uid){
  fb.child('users').once('value', function(snap){
    var data = snap.val();
    var user = _.valuesIn(data[uid].profile)[0];
    var dataObject = {Bio: user.Bio, Gender: user.Gender, ProfilePic: user.ProfilePic, Username: user.Username}

    createProfile(dataObject, uid);
  });
}

///////////////////////////////////////////////////////////////
/////////////////// App Page ///////////////////////////////////
//////////////////////////////////////////////////////////////


// Find a users matches
fb.child('users').once('value', function (snap) {
  var data1 = snap.val()[fb.getAuth().uid].data;

  //var undecided = undecided(data, fb.getAuth().uid);
  //console.log(undecided);
  //createProfile(, fb.getAuth().uid);
})

function createProfile(data, uid) {

  $('#target').empty();

  var $container = $('<div class="profileContainer"></div>');

  var $profileImage = $('<div><img src="' + data.ProfilePic + '"></div>'),
      $profileName  = $('<div>' + data.Username + '</div>'),
      $profileDesc  = $('<div>' + data.Bio + '</div>');
  console.log($profileImage);
  console.log($profileName);
  console.log($profileDesc);

  $container.append($profileImage);
  $container.append($profileName);
  $container.append($profileDesc);

  $('#target').append($container);

};

function likeUser(myUid, likedUid) {
  var usersDataFb = new Firebase(FIREBASE_URL+'/users/'+myUid+'/data/likes');
  var likeObject = {id: likedUid};
  usersDataFb.push(likeObject);
}

function dislikeUser(myUid, dislikedUid) {
  var usersDataFb = new Firebase(FIREBASE_URL+'/users/'+myUid+'/data/dislikes');
  var dislikeObject = {id: dislikedUid};
  usersDataFb.push(dislikeObject);
}


/////////////////////////////////////////////////////////////////////
////////// On Window Load Get and Load  ////////////////////////
///////////////////////////////////////////////////////////////////

  //if authenticated, get go to app page
  if (fb.getAuth()) {
    var token        = fb.getAuth().token;
        $('.login').toggleClass('hidden');
        $('.app').toggleClass('hidden');
  }

// Populate First Undecided Profile //

function getAndCreateProfile(){
  fb.child('users').once('value', function (snap) {
    var data = snap.val();
    appendProfile((undecided(data, fb.getAuth().uid))[0]);
  });
}

getAndCreateProfile();

// Click Events for Populating the App Page

$('#dislikeButton').click(function(){
  fb.child('users').once('value', function (snap) {
    var data = snap.val();
    var dislikedUser = (undecided(data, fb.getAuth().uid))[0];
    dislikeUser(fb.getAuth().uid, dislikedUser);
    var nextUser = (undecided(data, fb.getAuth().uid))[1];
    if(nextUser){
      getAndCreateProfile();
    } else {
      $('#target').empty();
      $('#target').append($('<img src"#"></img>'));
    }
  });
});


$('#likeButton').click(function(){
  fb.child('users').once('value', function (snap) {
    var data = snap.val();
    var likedUser = (undecided(data, fb.getAuth().uid))[0];
    likeUser(fb.getAuth().uid, likedUser);
    var nextUser = (undecided(data, fb.getAuth().uid))[1];
    if(nextUser){
      getAndCreateProfile();
    } else {
      $('#target').empty();
      $('#target').append($('<img src"#"></img>'));
    }
  });
});

// Find users not liked or disliked
function undecided(data, uid) {
  var userList   = _.keys(data),
      myLikes    = usersLikes(data[uid].data),
      myDislikes = usersDislikes(data[uid].data),
      self       = [uid];
  // Add an additional filter of users from an desired gender?

  return _.difference(userList, self, myLikes, myDislikes);
}

// Find a users matches
function matches(data, uid) {
  var myLikes = usersLikes(data[uid].data);

  return _.filter(myLikes, function (user, i) {
    var userData  = data[user].data,
        userLikes = usersLikes(userData);

    return _.includes(userLikes, uid);
  });
}

function usersLikes(userData) {
  if (userData && userData.likes) {
    return _(userData.likes)
      .values()
      .map(function (user) {
        return user.id;
      })
      .value();
  } else {
    return [];
  }
}

function usersDislikes(userData) {
  if (userData && userData.dislikes) {
    return _(userData.dislikes)
      .values()
      .map(function (user) {
        return user.id;
      })
      .value();
  } else {
    return [];
  }
}


/*

*/
