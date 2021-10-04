BoggleSolverSoultion

// Demetria Mack 
// @02927552
   /**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];
   
   convertToLower(grid,dictionary);
   let trie = CreateTrie(dictionary);
   
  if(grid == null || dictionary == null){
    return solutions;
  }

  let grid_len = grid.length;
   
   
  if(grid_len==0){
    return solutions;
  }
 
  for(let  i=0; i<grid_len;i++){
    if(grid[i].length!= grid_len ){
      return solutions;
    }
  }
   
  let solutionSet= new Set();
   for(let y= 0; y<grid_len ; y++){
     for(let x= 0; x<grid_len ; x++){
      
       let word= "";
       let visited = new Array(grid_len).fill(false).map(() => new Array(grid_len).fill(false));
       findwords(word,x,y,grid,visited,trie,solutionSet);
     }
   }
   
  solutions= Array.from(solutionSet)
  return solutions;
}


var TrieNode = function(value) {
  this.value=value;
  this.children = new Array();
  this.isWord = false;
};

//implementing functionaility of the trie 

var CreateTrie= function(dict) {
  var root = new TrieNode('');
  
  if(dict.length==0){
    return;
  }

  for(let words of dict){
    var node = root;
    for(let  i =0;i<words.length;i++){
      var letter = words[i];
      var ord  = letter.charCodeAt(0) - 97;
      //if a node with that  letter doesnt exist:
      var currentNode = node.children[ord];
      if(node.children[ord]== undefined){
        //create one
        
        var currentNode = new TrieNode(letter);
        node.children[ord]=currentNode;
        
      }
     
      node=currentNode;
      
    }
    node.isWord=true; 
    
  }
  return root;
};

findwords=function(word,x,y,grid,visited,trie,solutionSet){
  let directions=[[0,1],[1,0],[0,-1],[-1,0],[1,1],[-1,1],[1,-1],[-1,-1]];
  
  //Base case:
  //b1:  if x  and y are out of bound
  //b2  already visited y and x
  //-->return immediatly
  
  if(y<0 || x<0 || y>=grid.length || x >=grid.length || visited[x][y]==true){
    return;
  }
  
  //append grid[x][y] to the word
  
  word +=  grid[x][y];
  
  //console.log("Cur word ="+word+"  Grid["+x+"]["+y+"]="+grid[x][y]);
  //1. check if  that word  is a prefix for  any word in the trie
  //1.a. check if that prefix  is an actual word in the dictionnary
  //1.b if true -->  add word to solutionsset and check if the length of the word is at least 3
  // 2.keep searching using the adjacent tiles --> call findword
  //3.if false-->  keep searching using the  adjacent tiles
  if(isprefix(word,trie)){
     visited[x][y]=true;
      if (isword(word,trie)){
       
        if(word.length>2){
          //console.log(word)
          solutionSet.add(word);
        }
   
      }
 
  for(let i=0;i<8;i++){
    findwords(word,x+directions[i][0],y+directions[i][1],grid,visited,trie,solutionSet)  
  }
  
} 
  visited[x][y]=false   
   }

// checking for the prefix in the grid 

isprefix= function(word,trie){
  let subword=''
  let currentNode=trie;
  
  for(let i =0;i<word.length;i++){
    if(currentNode!=undefined){  
      for(let node of currentNode.children){
        if(node!=undefined && node.value==word[i]){
          subword+=word[i];
          currentNode=node;
          break;
        }
      }
    }
  }
  if(word==subword){
    return true;
  }
   return false;
  
}
// verifying that it is a word 

isword= function(word,trie){
  //check if each char in word is in trie
  //for each char in word
  let subword=''
  let currentNode=trie;
  for(let i =0;i<word.length;i++){
    if(currentNode!=undefined){ 
      for(let node of currentNode.children){    
        if(node!=undefined && node.value==word[i]){
          subword+=word[i];
          currentNode=node;
          break;
        }
      }
    }
  }
  if(word==subword && currentNode.isWord==true){  
    return true;
  }  
   return false;
  
}
convertToLower=function(grid,dict){
  for(let i=0;i<grid.length;i++){
    for(let j=0;j<grid.length;j++){
      if(grid[i][j]){
        grid[i][j]= grid[i][j].toLowerCase();
      }  
    }
  }
  
  for(let j=0;j<dict.length;j++){
      dict[j]=dict[j].toLowerCase();
    }
}

var grid = [  ['t', 'w', 'y', 'r'],
              ['e', 'n', 'p', 'h'],
              ['g', 'z', 'qu','r'],
              ['st', 'n', 't', 'a']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];


//console.log(exports.findAllSolutions(grid, dictionary));
