// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

contract SociGlobe {
    struct Post {
        uint id;
        address author;
        string content;
        uint upvotes;
        uint timestamp;
    }

    uint _idCounter;
    Post[] _allPosts;

    // Just to keep track if the user upvoted or not.
    mapping(uint => mapping(address => bool)) _upvotes;

    constructor() {
        _idCounter = 1;
    }

    function getPosts() public view returns (Post[] memory) {
        return _allPosts;
    }

    function createPost(string memory content) public returns (Post memory) {
        require(msg.sender != address(0), "Invalid address");
        require(bytes(content).length > 0, "Content can't be empty");

        Post memory post = Post({
            id: _idCounter++,
            content: content,
            author: msg.sender,
            upvotes: 0,
            timestamp: block.timestamp
        });

        _allPosts.push(post);

        return post;
    }

    function upvote(uint id) public {
        require(msg.sender != address(0), "Invalid address");
        require(!alreadyUpvoted(id), "You already gave an upvote to this post");

        _allPosts[id - 1].upvotes++;
        _upvotes[id - 1][msg.sender] = true;
    }

    function alreadyUpvoted(uint id) public view returns (bool) {
        require((0 < id) && (id < _idCounter), "Post doesn't exist");

        address upvoter = msg.sender;

        if (_upvotes[id - 1][upvoter]) {
            return true;
        }

        return false;
    }
}
