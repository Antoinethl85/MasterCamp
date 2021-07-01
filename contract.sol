pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WorkVote is ERC721 {

    struct Voter {
        uint256 voter_id;
        address voter_address;
    }

    Voter[] public voters;

    struct Candidate {
        uint256 candidate_id;
        address candidate_address;
    }

    Candidate[] public candidates;

    //struct Token {uint256 token_id;}
    //Token[] public tokens;

    //mapping(voter_id => address) voter_address;
    //mapping(candidate_id => address) candidate_address;

    mapping (uint => address) public owner_of_token;
    mapping (address => uint) owner_token_count;

    //voter_id[] public list_voter_id;
    //candidate_id[] public list_candidate_id;
    //token_id[] public list_token_id;

    uint256[] tokens_sent;

    mapping (uint => address) voterApprovals;

    constructor(uint256[] storage tokens) public{
        address creator = msg.sender;
        for(uint j=0; j < voters.length; j++){
            Transfer(creator, voters[j].voter_address, tokens[j]);
            tokens_sent.push(tokens[j]);
        }
    }

    uint vote_count = 0;

    function vote(uint256 _candidate_j, uint256 _token_id) public {
        require(id_in_list(_token_id, tokens_sent) == true);
        vote_count++;
        transfer(candidates[_candidate_j].candidate_address, _token_id);
        delete tokens_sent[find_index(_token_id, tokens_sent)];
    }

    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return owner_token_count[_owner];
    }

    function ownerOf(uint256 _tokenId) public view returns (address _owner) { 
        return owner_of_token[_tokenId]; 
    }

    function _transfer(address _from, address _to, uint256 _tokenId) private {
        owner_token_count[_to]++;
        owner_token_count[_from]--;
        owner_of_token[_tokenId] = _to;
        Transfer(_from, _to, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) public {
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(address _to, uint256 _tokenId) public {
        voterApprovals[_tokenId] = _to;
        Approval(msg.sender, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public {
        address owner = ownerOf(_tokenId);
        Transfer(owner, msg.sender, _tokenId);
    }

    function winner_ballot() public returns (uint256){
        uint256 _winner;
        _winner = candidates[0];
        for(uint j=0 ; j < candidates.length ; j++){
            if( balanceOf(candidates[j].candidate_address) > balanceOf(_winner.candidate_address) ) {
                _winner = candidates[j];
            }
        }
        if (vote_count <= voters.length){
            return _winner;
        }       
    }

    function id_in_list(uint256 memory _id, uint256[] memory _list) public returns (bool){
        bool _temp = false;
        for(uint j=0; j < _list.length; j++){
            if (_list[j] == _id){
                _temp = true;
            }
        }
        return _temp;
    }

    function find_index(uint256 memory _token_id, uint256[] memory _tokens) public returns (uint){
        uint index;
        for(uint j=0 ; j < _tokens.length ; j++){
            if(_tokens[j] == _token_id){
                index = j;
            }
        }
        return index;
    }
}