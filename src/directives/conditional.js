// 특정 변수가 인자로 전달된 값에 도달하면 표시되는 디렉티브
// ex) <p v-conditional:[count]="10"></p>
const s = JSON.stringify;

const directive = function(el, binding, vnode) {
  const count = binding.arg;
  const indicator = binding.value;
  console.log(vnode);

  if (count === indicator)
    el.style.display = '';
  else
    el.style.display = 'none';
};

export default directive;

// binding.value로 전달되는 값은 JS 값으로 평가된다. 즉 속성값은 적절한 타입이 부여된다. 따라서 단순 원시값, 객체 모두 전달 가능
// bind와 update의 로직이 동일하다면 하나로 합쳐서 사용해도 된다. 즉, directive 등록시 객체 대신 함수만 전달하는 것
