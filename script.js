// Function to encrypt a string using the Caesar cipher
function encryptText() {
    var plaintext = document.getElementById('plaintext').value;
    var shift = parseInt(document.getElementById('shift').value);

    var encryptedText = encryptCaesar(plaintext, shift);
    document.getElementById('encrypted').value = encryptedText;

    // Download encrypted text as a file
    downloadTextFile(encryptedText, 'encrypted.txt');
}

// Function to decrypt an encrypted string using the Caesar cipher
function decryptText() {
    var encryptedText = document.getElementById('encrypted').value;
    var shift = parseInt(document.getElementById('shift').value);

    var decryptedText = decryptCaesar(encryptedText, shift);
    document.getElementById('decrypted').value = decryptedText;

    // Download decrypted text as a file
    downloadTextFile(decryptedText, 'decrypted.txt');
}

// Function to encrypt a string using the Caesar cipher with a given shift
function encryptCaesar(plaintext, shift) {
    var encrypted = "";
    for (var i = 0; i < plaintext.length; i++) {
        var charCode = plaintext.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) { // Uppercase letters
            encrypted += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) { // Lowercase letters
            encrypted += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        } else {
            encrypted += plaintext.charAt(i); // Non-alphabetic characters
        }
    }
    return encrypted;
}

// Function to decrypt an encrypted string using the Caesar cipher with a given shift
function decryptCaesar(encryptedText, shift) {
    var decrypted = "";
    for (var i = 0; i < encryptedText.length; i++) {
        var charCode = encryptedText.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) { // Uppercase letters
            decrypted += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) { // Lowercase letters
            decrypted += String.fromCharCode(((charCode - 97 - shift + 26) % 26) + 97);
        } else {
            decrypted += encryptedText.charAt(i); // Non-alphabetic characters
        }
    }
    return decrypted;
}

// Function to download a text file
function downloadTextFile(content, filename) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// Function to handle file selection
function handleFileSelect(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
        var fileContent = event.target.result;
        document.getElementById('plaintext').value = fileContent;
    };

    reader.readAsText(file);
}

// Function to encrypt a file
function encryptFile() {
    var fileInput = document.getElementById('fileInput');
    var shift = parseInt(document.getElementById('shift').value);

    if (fileInput.files.length === 0) {
        alert('Please select a file.');
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
        var fileContent = event.target.result;
        var encryptedText = encryptCaesar(fileContent, shift);
        downloadTextFile(encryptedText, 'encrypted.txt');
    };

    reader.readAsText(file);
}

// Function to decrypt a file
function decryptFile() {
    var fileInput = document.getElementById('fileInput');
    var shift = parseInt(document.getElementById('shift').value);

    if (fileInput.files.length === 0) {
        alert('Please select a file.');
        return;
    }

    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function (event) {
        var fileContent = event.target.result;
        var decryptedText = decryptCaesar(fileContent, shift);
        downloadTextFile(decryptedText, 'decrypted.txt');
    };

    reader.readAsText(file);
}