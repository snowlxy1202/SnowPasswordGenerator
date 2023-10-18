// Fetch the button element
var generateBtn = document.querySelector("#generate");
// Fetch the password text element
var passwordText = document.querySelector("#password");

// Create a character pool for different charater type
var upperCasePool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var lowerCasePool = "abcdefghijklmnopqrstuvwxyz"
var numberPool = "0123456789"
var specialCharacterPool = "@!#*%^&*()"


// Write password to the #password input
function writePassword() {
  // Create a empty chart for passwrod generation
  var chart = ""

  // Create window prompt to ask users to choose password criteria type
  var lowerCase = window.prompt("Do you want your password to include lowercase letter? \n(please enter yes or no)");
  
  // Quit the alert window if the user put in nothing in the input
  if (!lowerCase) {
    return;
  };
  var upperCase = window.prompt("Do you want your password to include uppercase letter? \n(please enter yes or no)");
  if (!upperCase) {
    return;
  };
  var number = window.prompt("Do you want your password to include number? \n(please enter yes or no)");
  if (!number) {
    return;
  };
  var length = window.prompt("Do you want your password to have more than 8 and less than 128 characters? \n(please enter yes or no)");
  if (!length) {
    return;
  };
  var specialCharacter = window.prompt("Do you want your password to include special character? \n(please enter yes or no)");
  if (!specialCharacter) {
    return;
  }

  //Convert all user inputs into all caps to do easier input check
  lowerCase = lowerCase.toUpperCase();
  upperCase = upperCase.toUpperCase();
  number = number.toUpperCase();
  length = length.toUpperCase();
  specialCharacter = specialCharacter.toUpperCase();

  //Validate the user input make sure at least one character type should be selected
  if (lowerCase !== "YES" && upperCase !== "YES" && number !== "YES" && specialCharacter !== "YES") {
    window.alert("This charter type input is not valid, at least one charater type should be sleceted")
  };

  //Generate the chart pool to generate the required password
  if (lowerCase === "YES") {
    chart = chart + lowerCasePool;
  }

  if (upperCase === "YES") {
    chart = chart + upperCasePool;
  }
  if (number === "YES") {
    chart = chart + numberPool;
  }
  if (specialCharacter === "YES") {
    chart = chart + specialCharacterPool;
  }

  // Set the defualt password lenght as 7
  var passwordLength = 7

  // If user choose to have a password length between 8 and 128, set the length as 15 to be consistent
  if (length === "YES") {
    passwordLength = 15;
  }
  // Set the paswwordText with generated random passowrd
  passwordText.value = generatePasswordText(chart, passwordLength, lowerCase, upperCase, specialCharacter, number);

}


function generatePasswordText(chart, passwordLength, lowerCase, upperCase, specialCharacter, number) {
  // if the chart is empty, alert the user with "No Character Pools"
  if (!chart) { 
    window.alert("No Character Pools")
  }

  // Create boolean flag to make sure if desired char type is inserted or not
  // Before checking the user input predefined criteria, setting all boolean to true 
  var lowerCaseInserted = true;
  var upperCaseInserted = true;
  var numberInserted = true;
  var specialCharacterInserted = true;

  // Set boolean flag to false if a certin type of char is desired since no char inserted yet
  if (lowerCase === "YES") {
    lowerCaseInserted = false;
  }
  if (upperCase === "YES") {
    upperCaseInserted = false;

  }
  if (number === "YES") {
    numberInserted = false;
  }
  if (specialCharacter === "YES") {
    specialCharacterInserted = false;
  }


  // Set starting password as an empty string
  var password = "";
  for (var i = 1; i <= passwordLength; i++) {
    // Select a random charater from chart pool to append to the generated password
    var randomIndex = Math.floor(Math.random() * chart.length)
    var randomChar = chart.charAt(randomIndex)
    
    // 
    if (lowerCasePool.includes(randomChar)) {
      lowerCaseInserted = true;
    }
    if (upperCasePool.includes(randomChar)) {
      upperCaseInserted = true;
    }
    if (numberPool.includes(randomChar)) {
      numberInserted = true;
    }
    if (specialCharacterPool.includes(randomChar)) {
      specialCharacterInserted = true;
    }
    password += randomChar
    console.log(password)
  }
  console.log(password)

  // If all charcter type criterias are met, then return the generated random password
  if (lowerCaseInserted && upperCaseInserted && numberInserted && specialCharacterInserted) {
    return password;
  }
  // If one of the criteria is not met, run the password generation algorithm again until met
  return generatePasswordText(chart, passwordLength, lowerCase, upperCase, number, specialCharacter);
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

