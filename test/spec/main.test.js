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
  describe('userLikes', function () {
    it('should return the liked user id', function () {
      var user1Data = {id: 1, likes: 2};
      var user2Data = {id: 2, likes: 1};

      usersLikes(user1Data).should.equal(2);
    });
  });
  describe('userDislikes', function () {
    it('should return the disliked user id', function () {
      var user3Data = {id: 3, dislikes: 4};
      var user4Data = {id: 4, dislikes: 3};

      usersDislikes(user3Data).should.equal(4);
    });
  });
});


