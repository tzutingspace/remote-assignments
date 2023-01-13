// request 1: Click to Change Text.
const h1Block = document.querySelector('h1');
h1Block.addEventListener('click', () => {
  h1Block.textContent = 'Have a Good Time!';
});

// request 2: Click to Show More Content Boxes.
const buttonMoreContent = document.querySelector('#btn_more_content');
const contentBox = document.querySelector('.section_content_hide');
buttonMoreContent.addEventListener('click', () => {
  console.log(contentBox.style.display);
  if (!contentBox.style.display || contentBox.style.display === 'none') {
    contentBox.style.display = 'flex';
    buttonMoreContent.textContent = 'Hide Content';
  } else {
    contentBox.style.display = 'none';
    buttonMoreContent.textContent = 'Show Content';
  }
});
