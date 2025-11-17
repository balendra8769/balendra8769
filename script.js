let string = "";
let buttons = document.querySelectorAll('.button');

Array.from(buttons).forEach((button) => {
  button.addEventListener('click', (e) => {
    let btn = e.target.innerHTML;

    if (btn == '=') {
      try {
        string = eval(string);
        document.querySelector('input').value = string;
      } catch {
        document.querySelector('input').value = "Error";
      }
    } 
    else if (btn == 'AC') {
      string = "";  // ✅ sab clear
      document.querySelector('input').value = string;
    } 
    else if (btn == 'DEL') {
      string = string.slice(0, -1);  // ✅ last character delete
      document.querySelector('input').value = string;
    } 
    else {
      string += btn;
      document.querySelector('input').value = string;
    }
  });
});
