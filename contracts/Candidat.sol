pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MetaCoin is ERC721{
	//Garder la trace des tokens même une fois le vote passé
	using Counters for Counters.Counter;
		Counters.Counter private _tokenIds;
		mapping(string => uint8) hashes;

	//Nom du token et symbole
	constructor() public ERC721 ("Candidat", "CAND") {}

	//Fonction qui va monnayer/creer (mint) le token : "recipient" est l'adresse qui va recevoir le NFT
	function awardItem(address recipient, string memory tokenURI)
  		public  //Permet d'être appelé depuis l'extérieur
  		returns (uint256)
	{
		_tokenIds.increment();

    	uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
		//_setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
	
}