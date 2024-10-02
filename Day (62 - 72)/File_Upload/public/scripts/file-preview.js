const filePickerElement = document.getElementById("image");
const imagePreviewElement = document.getElementById("preview-img");

function showPreview() {
  const files = filePickerElement.files;

  if (!files || files.length === 0) {
    return;
  }

  const pickedFile = files[0];

  imagePreviewElement.src = URL.createObjectURL(pickedFile); // utility method to create url
  imagePreviewElement.style.display = "block";
}

filePickerElement.addEventListener("change", showPreview);
