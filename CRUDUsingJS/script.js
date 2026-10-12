let data = [];
let selectedPost = null;
let isEditMode = false;

const postSection = document.getElementById("postSection");
const createBtn = document.getElementById("create")
const cards = document.getElementById("cards")

const detailSection = document.getElementById("detailSection");
const editBtn = document.getElementById("edit")
const deleteBtn = document.getElementById("delete")
const postId = document.getElementById("postId")
const postTitle = document.getElementById("postTitle")
const postBody = document.getElementById("postBody")
const commentsContainer = document.getElementById("commentsContainer")



const formPage = document.getElementById("formPage");
const formTitle = document.getElementById("formTitle")
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("title")
const bodyInput = document.getElementById("body")
const cancelBtn = document.getElementById("cancelBtn")
const saveBtn = document.getElementById("saveBtn")


const errorMessage=document.getElementById("errorMessage");

async function fetchPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")
        errorMessage.textContent = "";
        if (!response.ok) {
            throw new Error("Failed to fetch posts")
        }

        data = await response.json()
        renderPost();
    } catch (err) {
        errorMessage.textContent=err.message;
    
    }
}
fetchPosts();

function renderPost() {
    cards.innerHTML = ""
    data.forEach(post => {
        const card = document.createElement("div")
        card.classList.add("card");

        card.innerHTML = `
          <p>Posts #${post.id}</p>
           <h3>${post.title}</h3>
           <button class="view-btn">View Post</button>
        `
        const viewBtn = card.querySelector(".view-btn")

        viewBtn.addEventListener("click", () => {
            viewPost(post.id)
        })

        cards.appendChild(card)
    })
}

async function viewPost(id) {
    selectedPost = data.find(post => post.id === id)

    if (!selectedPost) {
        return;
    }

    postSection.classList.add("hidden")
    detailSection.classList.remove("hidden")
    postId.textContent = `Post #${selectedPost.id}`
    postTitle.textContent = selectedPost.title
    postBody.textContent = selectedPost.body

    await fetchComment(id)
}

async function fetchComment(id) {
    try {
        commentsContainer.innerHTML = "Loading...";
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

        if (!response.ok) {
            throw new Error("Failed to fetch comments")
        }

        const comments = await response.json();
        commentsContainer.innerHTML = ""
        errorMessage.textContent = "";
        comments.forEach((comment) => {
            const commentCard = document.createElement("div");
            commentCard.classList.add("comments-card")
            commentCard.innerHTML = `
          <h4>${comment.name}</h4>
          <h5>${comment.email}</h5>
          <p> ${comment.body}</p>
         `
            commentsContainer.appendChild(commentCard);
        })
    } catch (error) {
        commentsContainer.textContent = error.message
    }
}

createBtn.addEventListener("click", () => {
    isEditMode = false;
    selectedPost = null;

    formTitle.textContent = "Create Post"
    saveBtn.textContent = "Create Post"
    titleInput.value = "";
    bodyInput.value = "";
    postSection.classList.add("hidden");
    detailSection.classList.add("hidden")
    formPage.classList.remove("hidden")
})


editBtn.addEventListener("click", () => {
    if (!selectedPost) {
        return;
    }
    isEditMode = true
    formTitle.textContent = "Edit Post";
    saveBtn.textContent = "Save Changes";

    titleInput.value = selectedPost.title;
    bodyInput.value = selectedPost.body;

    detailSection.classList.add("hidden");
    postSection.classList.add("hidden");
    formPage.classList.remove("hidden");


})

postForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();
    if (!title || !body) {
        return;
    }

    if (isEditMode) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: title,
                        body: body
                    })
                })

            if (!response.ok) {
                throw new Error("Failed to update post")
            }

            const updatedPost = await response.json();

            data = data.map((post) => {
                if (post.id === selectedPost.id) {
                    return {
                        ...post,
                        title: updatedPost.title,
                        body: updatedPost.body
                    }
                }
                return post;
            })
             
            selectedPost={
                ...selectedPost,
                title:updatedPost.title,
                body:updatedPost.body
            }
            errorMessage.textContent = "";
            renderPost();
            showPostList();
        } catch (err) {
            errorMessage.textContent=err.message;
        }
        return;
    }

    //create post
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: 1
            })
        })

        if (!response.ok) {
            throw new Error("Failed to post data");
        }
        errorMessage.textContent = "";
        const newPost = await response.json();
        data.push(newPost);
        renderPost();
        showPostList();
    } catch (err) {
        errorMessage.textContent=err.message;
    }
})

// DELETE POST
deleteBtn.addEventListener("click", async () => {
    if (!selectedPost) {
        return;
    }

    const confirmDelete = window.confirm("Do you want to delete this post?");
    if (!confirmDelete) {
        return;
    }

    try {
           
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete post");
        }
         errorMessage.textContent = "";
        data = data.filter((post) => post.id !== selectedPost.id);
        selectedPost = null;
        renderPost();
        showPostList();
    } catch (err) {
        errorMessage.textContent=err.message;
    }
})


cancelBtn.addEventListener("click", () => {
    if (selectedPost) {
        detailSection.classList.remove("hidden");
        formPage.classList.add("hidden");
    } else {
        showPostList();
    }
})

function showPostList() {
    postSection.classList.remove("hidden");
    detailSection.classList.add("hidden")
    formPage.classList.add("hidden");
}
