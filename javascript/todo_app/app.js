function main() {
    const todos = []

    while (1) {
        let choice = prompt('What do you want to do ?')
        if (choice === 'new') {
            new_todo(todos);
        } else if (choice === 'list') {
            list_todo(todos)
        } else if (choice === 'delete') {
            delete_todo()
        } else if (choice === 'quit') {
            break;
        } else {
            console.log('please choose one of the options')
        }
    }
    console.log('You quit the app.')
    // End of app here
}

function new_todo(todos) {
    const new_todo = prompt('Type in the to-do:')

    todos.push(new_todo)
}

function list_todo(todos) {
    console.log(`*********`)
    for (let todo of todos) {
        console.log(`${todos.indexOf(todo)}: ${todo}`)
    }
    console.log(`*********`)
}

function delete_todo(todos) {
    const to_delete = prompt('Type in the index of the to-do:')

    todos.splice(to_delete, 1)
}

main()