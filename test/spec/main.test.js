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

describe('matching functions', function () {
  describe('usersLikes', function () {
    it('should return the liked user id', function () {
      var data = {"likes": {"x":{"id": "simplelogin:2"}} }
      usersLikes(data)[0].should.equal("simplelogin:2");
    });
  });
  describe('usersDislikes', function () {
    it('should return the disliked user id', function () {
      var data = {"dislikes": {"x":{"id": "simplelogin:3"}}}
      usersDislikes(data)[0].should.equal("simplelogin:3");
    });
  });
  describe('matches', function () {
    it('should return the matches for a user', function () {
      var data = {'simplelogin:2': {'data': {"likes": {"x":{"id": "simplelogin:3"}}}},
        'simplelogin:3': {'data': {"likes": {"y":{"id": "simplelogin:2"}}}}}
      matches(data, 'simplelogin:2')[0].should.equal('simplelogin:3');
    });
  });
  describe('undecided', function () {
    it('should return the undecided users', function () {
      var data = {'simplelogin:4': {'data': {"likes": {"x":{"id": "simplelogin:3"}}}},
        'simplelogin:5': {'data': {"likes": {"y":{"id": "simplelogin:2"}}}}}
      undecided(data, 'simplelogin:4')[0].should.equal('simplelogin:5');
    });
  });
});

describe('createProfile', function () {
  it('should create a profile and append to a div', function () {

    var $container = $('<div id="profile"></div>');

    var $containerContent = $('<div></div><div></div><div></div>')

    $('#profile').append($containerContent);

  });
});

describe('createMatches', function () {
  it('should create a profile of a users match and append to a div', function () {

    var $container = $('<div id="profileMatch"></div>');

    var $containerContent = $('<div></div><div></div><div></div>')

    $('#profileMatch').append($containerContent);

  });
});

