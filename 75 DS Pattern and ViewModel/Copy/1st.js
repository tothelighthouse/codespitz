let parent;
let table;
let fields;
parent.appendChild(
    fields.items.reduce((table, row)=>{
        table.appendChild(
            row.reduce((tr, data)=>{
                const td = document.createElement('td')
                td.innerHTML = data
                tr.appendChild(td)
                return tr
            }, document.createElement("tr"))
        )
        return table
    }, table)
)


parent.appendChild(
    fields.items.reduce((table, row)=>{
        table.appendChild(
            row.reduce((tr, data)=>{
                const td = document.createElement('td')
                td.innerHTML = data
                tr.appendChild(td)
                return tr
            }, document.createElement("tr"))
        )
        return table
    }, table)
)
let table1; // 시작 루프 ACC
for(let i = 0;i < fields.items.length;i++){ // 2. 시작 루프
    const row = fields.items[i] // 이전 루프 원소
    const td = document.createElement('td') // 내부루프 ACC
    for(let i = 0;i < row.length;i++){ // 3. 마지막 루프
        let data = row[i]
        td.innerHTML = data
        row.appendChild(td) //
    }
    table1.appendChild(row) // 마지막 루프를 모을 대상
}
parent.appendChild(table1) // 1. 가장 마지막 연산이 제일 먼저 위치

// 1. 가장 마지막 연산 인자 부붙 삭제
// 2. 첫번째 루프 복사
// 3. 진행 조건의 length 삭제 하고 추출
// 4. reduce 작성
// 5. 루프문 바깥의 acc를 reduce 함수의 초기값 인자로 설정
// 6. 루프문 바깥의 acc를 reduce 함수의 Acc 인자로 설정
// 7. 각 [i] 인자롤 사용할 item 을 next 인자로 설정

// 2. 두번째 루프 복사
// 3. 진행 조건의 length 삭제 하고 추출 (이전 reduce의 next 인자)
// 4. 이전 for 문의 각 [i] 인자롤 삭제
// 5. 루프문 바깥의 acc를 reduce 함수의 초기값 인자로 설정
// 6. 루프문 바깥의 acc를 reduce 함수의 Acc 인자로 설정
// 7. 각 [i] 인자롤 사용할 item 을 next 인자로 설정

parent.appendChild(
// for(let i = 0;i < fields.items.length;i++){ // 2. 시작 루프
    fields.items.reduce((table1, row)=>{
        row.reduce(()=>{

        })

        }, table1)
)
















