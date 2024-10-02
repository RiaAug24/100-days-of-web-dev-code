const loadCommentsBtn = document.getElementById("load-comments-btn");
const commentSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentContentElement = document.getElementById("text");
const statusErrorMsg = document.createElement("p");
statusErrorMsg.style.color = "red";

let createCommentsList = (comments) => {
  if (comments.length === 0) {
    const CommentsNotFoundMsg = document.createElement("p");
    CommentsNotFoundMsg.innerText = "No comments available for this post :(";
    return CommentsNotFoundMsg;
  }

  const commentsListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `<article class="comment-item">
  <h2>${comment.title}</h2>
  <p>${comment.text}</p>
</article>
`;

    commentsListElement.appendChild(commentElement);
  }

  return commentsListElement;
};

async function fetchCommentsForPost() {
  const postId = loadCommentsBtn.dataset.postid;
  const response = await fetch(`/posts/${postId}/comments`);
  const responseData = await response.json();
  // console.log(responseData);
  const commentsListElement = createCommentsList(responseData);
  commentSectionElement.innerHTML = "";
  commentSectionElement.appendChild(commentsListElement);
  loadCommentsBtn.style.display = "none";
}

let saveComment = async (e) => {
  e.preventDefault();
  const enteredTitle = commentTitleElement.value;
  const enteredBody = commentContentElement.value;
  const postId = commentsFormElement.dataset.postid;
  const comment = { title: enteredTitle, text: enteredBody };
  // console.log(enteredTitle + "\n" + enteredBody);

  try {
    const response = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json", //Special header - reserved identifier
      },
    });

    if (response.ok) {
      commentTitleElement.value = "";
      commentContentElement.value = "";
      fetchCommentsForPost();
    } else {
      statusErrorMsg.innerText =
        "Comment could not be added.\nPlease try again later.";
      commentSectionElement.append(statusErrorMsg);
    }
  } catch (err) {
    statusErrorMsg.innerText =
      "Sending request failed! \nPlease try again later.";
    commentSectionElement.append(statusErrorMsg);
  }
};

loadCommentsBtn.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener("submit", saveComment);
