$(function() {

    var verbs = [];
    //seperate words into own elements  
    var $div = $('.book');
    var divWords = $div.text().split(' ');
    $div.empty();
    $.each(divWords, function(i,w){
    $('<span class="word"/>').text(w).appendTo($div).append(' ');
    });
    
    //info box variables
    var $word = $('.word');
    var $verticalLine = $('#vertical-line');
    var $infoBox = $('.infoBox');
    $infoBox.css('display','none');
    var $currentWord = $('#currentWord');
    $currentWord.append(' ');
    var $partOfSpeech = $('#partOfSpeech');
    var $infinitive = $('#infinitive');
    var $qualifier = $('#qualifier');
    const $translation = $('#translation')
    //get info box on hover
    
    //index of sample
    arr = ['cat','dog','frog'];
    console.log(arr.indexOf('frog'))
    //
    $word.hover(
      function(e){
      var elem = e.target.getBoundingClientRect();
      $verticalLine.css('top', elem.top - 32 + 'px');
      $verticalLine.css('left', elem.x   - 15 + 'px');
      $verticalLine.css('display','block');
      $infoBox.css('top', elem.top - 300 + 'px');
      $infoBox.css('left', elem.x  - 50 + 'px');
      $infoBox.css('display','flex');
      getWordInfo(e);
    },
      function(){
        $infoBox.css('display','none');
        $verticalLine.css('display','none');
      }
    );

const translations = [];
const words = [];

    getData();
      async function getData() {
        var response = await fetch("VerbList.csv");
        var data = await response.text();
        const table = data.split("\n").slice(1);
        table.forEach((row) => {
          const columns = row.split(",");
           portuguese = columns[0];
           words.push(portuguese)
           english = columns[1];
           translations.push(english)
        });
      }





getWordInfo = (e) => {
    let highlightedWord=e.target.textContent.replace(/[^\w\s]/g,"").trim()
    let wordNumber = words.indexOf(highlightedWord)
    $currentWord.text(highlightedWord)
    if (words.includes(highlightedWord)){
        let highlightedWordTranslation = translations[wordNumber].replace(/[^\w\s]/g,"").trim()
        $translation.text(highlightedWordTranslation)
    }
}

// const Reverso = require('reverso-api')
// const reverso = new Reverso()

// reverso.getContext(
//     'meet me half way',
//     'english',
//     'russian',
//     (err, response) => {
//         if (err) throw new Error(err.message)

//         console.log(response)
//     }
// )

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data)
}

getISS();

    });