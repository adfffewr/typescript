const { body } = document;
let candidata: number[];
let array: number[] = [];

function chooseNumber() {
  candidata = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  array = [];
  for (let i : number = 0; i < 4; i += 1) {
    const chosen = candidata.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
}

chooseNumber();
console.log(array);

const result = document.createElement('h1');
body.append(result);
const form = document.createElement('form');
document.body.append(form);
const input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;
const button = document.createElement('button');
button.textContent = '입력';
form.append(button);

let wrongCount = 0;
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const answer = input.value;
  if (answer === array.join('')) {
    // 답이 맞으면
    result.textContent = '홈런';
    input.value = '';
    input.focus();
    chooseNumber();
    wrongCount = 0;
  } else {
    // 답이 틀리면
    const answerArray = answer.split('');
    let strike = 0;
    let ball = 0;
    wrongCount += 1;
    if (wrongCount > 10) {
      // 10번 넘게 틀릴경우
      result.textContent = `10번 넘게 들렸습니다. 답은 ${array.join('')} 입니다.`;
      input.value = '';
      input.focus();
      chooseNumber();
      wrongCount = 0;
    } else {
      // 답이 10번 미만으로 틀릴경우
      console.log('답이 틀리면', answerArray);
      for (let i : number = 0; i <= 3; i += 1) {
        if (Number(answerArray[i]) === array[i]) {
          console.log('같은자리');
          strike += 1;
        } else if (array.indexOf(Number(answerArray[i])) > -1) {
          // 같은 자리는 아니지면 숫자가 겹치는지 확인
          console.log('겹치는 숫자');
          ball += 1;
        }
      }
      result.textContent = `${strike} 스트라이크 ${ball} 입니다.`;
      input.value = '';
      input.focus();
    }
  }
});
