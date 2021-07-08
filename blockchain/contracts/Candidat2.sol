pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Candidat2 is ERC721 {
    //using SafeMath for uint256;
    //using SafeMath32 for uint32;
    //using SafeMath16 for uint16;

    event NewToken(uint tokenId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Token {
        string name;
        uint dna;
    }

    Token[] public tokens;

    mapping (uint => address) public tokenToOwner;
    mapping (address => uint) ownerTokenCount;

    function _createToken(string memory _name, uint _dna) private {
        uint id = tokens.push(Token(_name, _dna)) - 1;
        tokenToOwner[id] = msg.sender;
        ownerTokenCount[msg.sender] = ownerTokenCount[msg.sender]+1;//  .add(1)
        emit NewToken(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomToken(string memory _name) public {
        require(ownerTokenCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        _createToken(_name, randDna);
    }
}