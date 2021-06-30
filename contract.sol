pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WorkVote is ERC721 {

    mapping(voter_id => address) voter_address;
    mapping(candidate_id => address) candidate_address;

    mapping (uint => address) public owner_of_token;
    mapping (address => uint) owner_token_count;

    voter_id[] public list_voter_id;
    candidate_id[] public list_candidate_id;
    token_id[] public list_token_id;

    uint256[] list;

    mapping (uint => address) voterApprovals;

    constructor() public{
        address creator = msg.sender;
        for(uint j=0; j < list_voter_id.length; j++){
            Transfer(creator, voter_address[list_voter_id[j]], list_token_id[j]);
            list.push(list_token_id[j]);
        }
    }

    uint vote_count = 0;

    function vote(uint256 _candidate_id, uint256 _token_id) public {
        //require(); require que le token id soit dans la liste list_id_token
        require(id_in_list(_token_id, list) == true);
        //require(); require que le id candidate soit dans la lsite list_id_candidate
        require(id_in_list(_candidate_id, list_id_candidate) == true);
        vote_count++;
        transfer(candidate_address[_candidate_id], _token_id);
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
        _winner = list_candidate_id[0];
        for(uint j=0 ; j < list_candidate_id.length ; j++){
            if( balanceOf(candidate_address[list_candidate_id[j]]) > balanceOf(candidate_adsdress[_winner]) ) {
                _winner = list_candidate_id[j];
            }
        }
        if (vote_count <= list_candidate_id.length){
            return _winner;
        }       
    }

    function id_in_list(uint256 _id, uint256[] _list) public returns (bool){
        bool _temp = false;
        for(uint j=0; j < _list.length; j++){
            if (_list[j] == _id){
                _temp = true;
            }
        }
        return _temp;
    }
}