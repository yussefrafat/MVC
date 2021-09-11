//gets the posts id from the url and requests to delete that post from the database
async function deleteFormHandler(event) {
    event.preventDefault();



    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });;

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.delete-btn').addEventListener('click', deleteFormHandler);