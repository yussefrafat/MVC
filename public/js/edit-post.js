//makes a put request with the data that the users chooses to update the post with
async function editFormHandler(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value.trim()
    const post_content = document.getElementById('post-content').value.trim()

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

}


document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);