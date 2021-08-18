YYYYMMDD = "(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])";
YYYYMMDDHH = "(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(0[0-9]|1[0-9]|2[0-3])";
YYYYMMDDHHMI = "(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])";
YYYYMMDDHHMISS = "(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])";
HH= "(0[0-9]|1[0-9]|2[0-3])";
MMDD = /(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/
HHMI = /(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])/






const email = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
const url = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w_\.-]*)*\/?$/

// https://codevang.tistory.com/115?category=827591
// ※ 패스워드 규칙검사 예제
// 1. (?=.*[A-Z]) → 대문자 검사
// - 대문자 1개 앞에 아무거나 있거나 없거나 (.*)
// - 앞에 뭐가 있던 상관없고 대문자가 1개라도 있어야 true가 되기 때문에 대문자 검사식이 됨
// 2. (?=.*[a-z]) → 소문자 검사
// 3. (?=.*[0-9]) → 숫자 검사
// 4. (?=.*[\\W^\\s]) → 공백이 아닌 (문자,숫자가 아닌)문자(특수문자) 검사
// 5. [\\S^\\\\]{8,} → 허용 문자 및 최소 횟수 설정
// - 공백이 아니면서 역슬레쉬가 아닌 문자가 8개 이상 연속돼야 함
const vaild = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W^\s])[^\S^\\]{8,}/

const tel = /\(?\d{3}\)?-?\d{3}-\d{4}/
const tel2 = /(\()?\d{3}(?(1)\)|-)\d{3}-\d{4}/

const imgAa = /(<[Aa]\s+[^>]+>\s*)?<[Ii][Mm][Gg]\s+[^>]+>(?(1)\s*</[Aa]>)/
const tel3 = /[\(.]?[2-9]\d\d[\).]?[ -]?[2-9]\d\d[-.]\d{4}/
// ex) 234-333-1234
// ex) (234) 333-1234
// ex) (234)333-1234
// ex) 234.333.1234
const cleanUp = /^.\d-+\*\/]/
const mulDiv = /((?:\+-)?[.\d]+)([*\/])((?:\+-)?[.\d]+)/
const paren = /\(([^()]*)\)/
const rex = /<([a-zA-Z]+)((?:\s+[a-zA-Z-]+(?:\s*=\s*"[^"]*")?)*)\s*\/?/

// 12
const email = /^([a-z\d\.-_])@([a-z\d\.-])\.([a-z\.]{2,6})$/
const url = /^(https?:\/\/)?([a-z\d\.-])\.([a-z\.]{2,6})([\/\w\.-_])*\/?$/
const valid = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W^\s])[^\S^\\]{8,}/
const imgatag = /(<[Aa]\s+[^>]+>)?<[Ii][Mm][Gg]\s+[^>]+>(?(1)<[Aa]>)/
const cleanup = /[^\.\d\+\-\*\/]/
const muldiv = /((?:\+-)?[.\d]+)([*\/])((?:\+-)?[.\d]+)/
const paren = /\(([^()]*)\)/
const rex = /<([a-zA-Z]+)((\s+[a-zA-Z](\s+\s*=\s*"[^"]")?)*)\s*\/?/

const regex = /<a href="(?<url>[\S]+)">(?<text>[\S]+)<\/a>/g;
const matchResult = regex.exec(`
  <a href="https://velog.io">Velog</a>
`);

console.log(matchResult?.groups?.url); // https://velog.io

const htmlString = `
  <a href="https://velog.io">Velog</a>\n
  <a href="https://www.naver.com">Naver</a>
`;
const regex = /<a href="(?<url>[\S]+)">(?<text>[\S]+)<\/a>/g;

const replacedString = htmlString.replace(regex, "[$<text>]($<url>)");

console.log(replacedString);
