let parent;
let fields;
let table;



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