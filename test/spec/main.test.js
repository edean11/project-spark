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
  //describe('matches', function () {
    //it('should return the matches for a user', function () {
      //var data = {{user1Data:{data{id: 1, likes: 'user2Data'},
                      //user2Data:{data{id: 1, likes: 'user1Data'}}}}}
      //user1Data = {id: 1, likes: 'user2Data'};
      //var user2Data = {id: 2, likes: 'user1Data'};

      //usersLikes(user1Data).should.equal(2);
    //});
  //});
  //describe('undecided', function () {
    //it('should return the undecided user id', function () {
      //var user3Data = {id: 3, dislikes: 'user4Data'};
      //var user4Data = {id: 4, dislikes: 'user3Data'};

      //usersDislikes(user3Data).should.equal(4);
    //});
  //});
});



