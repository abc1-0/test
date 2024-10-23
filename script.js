// REMOVE DEFAULT STUFF
// document.addEventListener('contextmenu', event => event.preventDefault());
// document.addEventListener('keydown', (event) => {
//     if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I') || (event.ctrlKey && event.key === 'U')) {
//       event.preventDefault();
//     }
// });
// document.addEventListener('touchstart', (event) => {
//     event.preventDefault();
// });
// CHECK KEY IF VALID 1-25
const key = document.getElementById("key");
key.addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '');
    if (this.value.length > 2) this.value = this.value.slice(0, 2);
    if (this.value) {
        const numValue = Number(this.value);
        if (numValue > 25) this.value = 25;
        else if (numValue < 1) this.value = '';
    }
});
// ERASE BUTTON
const eraseButton = document.getElementById("erase");
const textarea = document.querySelector("#text");
eraseButton.addEventListener('click', function() {
    textarea.value = '';
    key.value = '';
});
// SHOW SCANNER
const scan_button = document.getElementById("scan");
const scan_container = document.querySelector('.scan-container');
const main_container = document.querySelector('.container');
const result_container = document.querySelector('.result-container');
const sub_base = document.querySelector('.sub-base');
scan_button.addEventListener('click', () => {
    main_container.style.display = 'none';
    scan_container.style.display = 'block';
    result_container.style.display = 'none';
});
// HIDE SCANNER
const scan_container_back = document.querySelector('.scan-header-back');
scan_container_back.addEventListener('click', () => {
    scan_container.style.display = 'none';
    main_container.style.display = 'block';
    result_container.style.display = 'none';
});
// DISPLAY RESULT
function DisplayResult(title,text) {
    let i = 0;
    result_container.style.display = 'none';
    document.getElementById("result-type").innerHTML = title;
    document.getElementById("result-text").innerHTML = "";
    result_container.style.display = 'block';
    function typing() {
        if (i < text.length) {
          document.getElementById("result-text").innerHTML += text.charAt(i++);
          setTimeout(typing, 25);
        }
    }
    typing();
}
// ENCRYPT BUTTON
document.getElementById("encrypt").addEventListener('click', () => {
    let text = document.getElementById("text").value;
    let key = document.getElementById("key").value;
    let cc = new CaesarCipher(text,key);
    let error = cc.isError();
    if (!error) {
        DisplayResult("Encrypted Text",cc.Encrypt());
    } else {
        DisplayResult("Error Input",error);
    }
});
// DECRYPT BUTTON
document.getElementById("decrypt").addEventListener('click', () => {
    let text = document.getElementById("text").value;
    let key = document.getElementById("key").value;
    let cc = new CaesarCipher(text,key);
    let error = cc.isError();
    if (!error) {
        DisplayResult("Encrypted Text",cc.Encrypt());
    } else {
        DisplayResult("Error Input",error);
    }
});
// TEXT FILE SCANNER
const fileInput = document.getElementById('fileInput');
const fileButton = document.getElementById('fileButton');
fileButton.addEventListener('click', () => { fileInput.click(); });
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('text').textContent = e.target.result;
            document.getElementById('key').textContent = "";
            scan_container_back.click();
        };
        reader.readAsText(file);
    }
});