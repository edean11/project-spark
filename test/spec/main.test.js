/* jshint mocha: true, expr: true, strict: false, undef: false */

describe('test suite', function () {
  it('should assert true', function () {
    true.should.be.true;
    false.should.be.false;
  });
});

describe('hello', function () {
  it('should return world', function () {
    hello().should.equal('world');
  });
});

//describe('user authentication', function () {

  //beforeEach(function () {
    //if (window.__karma__) {
      //$('body').append('<form><input id="#nameInput"/><input id="#phoneNumberInput"/><input id="#emailInput"/><input id="#twitterInput"/><input id="#instagramInput"/><input id="#photoInput"/></form>')
      //$('body').append('<table><thead></thead><tbody id="tbody"><tr></tr></tbody></table>');
      //var FIREBASE_URL = 'https://address-booking.firebaseio.com',
          //fb           = new Firebase(FIREBASE_URL);
      //fb.unauth();
      //fb.authWithPassword({
        //email    : 'test@test.com',
        //password : '1234'
        //}, function(error, authData) {
        //if (error) {
          //console.log("Login Failed!", error);
        //} else {
          //console.log("Authenticated successfully with payload:", authData);
        //}
      //});
    //}
  //});

  //describe('login the user', function (){
    //it('should return a logged in user', function () {
      //fb.getAuth().should.not.be.null;
    //});
  //});

  //describe('user data', function () {
    //it('should have a uid', function () {
      //fb.getAuth().uid.should.exist;
    //});
  //});
//});

describe('add/remove address function', function () {
  beforeEach(function () {
    if (window.__karma__) {
      $('body').empty();
      $('body').append('<form><input id="#nameInput"/><input id="#phoneNumberInput"/><input id="#emailInput"/><input id="#twitterInput"/><input id="#instagramInput"/><input id="#photoInput"/></form>');
      $('body').append('<table><thead></thead><tbody id="tbody"></tbody></table>');
    }
  });

  describe('createTableElementsFromInputs', function (){
    it('should add a row to the table', function () {
      createTableElementsFromInputs();
      $('#tbody').children().length.should.equal(1);
    });
  });

  describe('remove row function', function () {
    it('should remove a row from the table', function () {
      var $tbody = $('#tbody');
      var $tr = $('<tr></tr>');
      $tbody.append($tr);
      var length = $tbody.children().length;
      removeElement($tr);
      $tbody.children().length.should.equal(length-1);
    });
  });
});

