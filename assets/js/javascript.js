
//A list of basic words that are used if a file is not loaded.
var defaultPhrases =
[
    "tiger cub",      "bottlenose dolphin",   "giraffe neck",    "elephant tusk",
    "kangaroo pouch", "rabbit skin",          "aardvark snout",  "wolverine", 
    "koala",          "alligator skin boots", "crocodile teeth", "balloon", 
    "hammer",         "basketball",           "soccer",          "trousers",
    "flower petals",  "castle",               "apartment",       "computer monitor"
];

var userPhrases = [];

//Game status messages.
const gameMessages =
{
    PLAY: "Press a letter key to make a guess",
    PAUSE: " ",
    WIN: "You win! Press any key to play again",
    LOSE: "You lose! Press any key to play again"
};

//Gate state enumeration.
const gameStates =
{
    PLAY:  0,
    PAUSE: 1,
    WIN:   2,
    LOSE:  3
};

var state = gameStates.PLAY;
var phraseIndex = 0;
var wins = 0;
var losses = 0;
var phrase = "";
var misses = "";
var hits = "";

//Set up key listener.
document.onkeyup = function(event)
{
    var key = event.key;

    switch(state)
    {
        case gameStates.PLAY:
            
            break;

        case gameStates.PAUSE:
            //Nothing to process. Ignore the input.
            break;

        case gameStates.WIN:
            break;

        case gameStates.LOSE:
            break;

        //Reset game if something goes wrong.
        default:
            init();
            break;
    }
};

function displayPhrase()
{
    document.getElementById("phrase").innerHTML = phrase;
}

function updatePhrase()
{

}

function initPhrase()
{
    for(let i = 0; i < userPhrases[phraseIndex].length; i++)
    {
        if(userPhrases[phraseIndex][i].match(/ /))
        {
            phrase = phrase.concat(" ");
        }
        else
        {
            phrase = phrase.concat("-");
        }
    }
    console.log(phrase);
    console.log(userPhrases[phraseIndex]);
}

function init()
{
    //Reset and log the user phrases to the default.
    userPhrases = defaultPhrases;
    console.log(userPhrases);

    //Randomly choose a phrase.
    phraseIndex = Math.floor(Math.random() * userPhrases.length);
    initPhrase();
    displayPhrase();

    //Reset the game variables.
    state = gameStates.PLAY;
    wins = 0;
    losses = 0;
    phrase = "";
    misses = "";
    hits = "";

    //Reset the opacity of the images.
    document.getElementById("img-hangman0").style.opacity = 1;
    for(let i = 1; i <= 10; i++)
    {
        document.getElementById("img-hangman" + i).style.opacity = 0;
    }

    //Clear the user selected file box.
    document.getElementById('file-input').value = ''

    //Set the default message in the status box.
    document.getElementById('status').innerHTML = gameMessages.PLAY;

    //Update the layout.
    resize();  
}

function resize()
{
    //This is required to make the website look right with the xs media query.
    var imgBackground = document.getElementById("img-hangman0");
    var bkgHeightWidth = imgBackground.clientHeight;
    var imgContainer = document.getElementById("img-container");
    imgContainer.style.minHeight = bkgHeightWidth + "px";
}

//Takes the user supplied file and validates each phrase.
var openFile = function(event)
{
    var input = event.target;
    var reader = new FileReader();
    userPhrases = [];

    //Read the contents of the file uploaded by the user.
    reader.onload = function()
    {
        //Get the contents of the file.
        var text = reader.result;

        //Separate the contents by newlines.
        text = text.split('\n');
        
        //Loop through the text array and format the results.
        text.forEach(readLines);
        function readLines(line, index)
        {
            //Trim whitespaces of the front and end.
            line = line.trim();

            //Log commented lines.
            if(line[0] === '/' && line[1] === '/')
            {
                console.log("*** Comment at line " + index + 1 +" ***");
            }
            //Log blank lines.
            else if(line === "")
            {
                console.log("*** Blank at line " + index + 1 +" ***");
            }
            else
            {
                //Look for invalid characters.
                var isValidPhrase = true;
                for(let i = 0; i < line.length; i++)
                {
                    if(!line[i].match(/[a-z ]/i))
                    {
                        isValidPhrase = false;
                    }
                }

                if(isValidPhrase)
                {
                    console.log(line + " ---Valid---");
                    userPhrases.push(line.toLowerCase());
                }
                else
                {
                    console.log(line + " !!!INVALID!!!");
                }
            }
        }

        //Reset userArray to valid values if the entered file is invalid.
        if(userPhrases.length === 0)
        {
            userPhrases = defaultPhrases;

            //Clear the user selected file box.
            document.getElementById('file-input').value = '';
        }

        console.log(userPhrases);  
    };

    reader.readAsText(input.files[0]);
    init();
};