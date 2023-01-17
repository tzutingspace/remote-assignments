/* eslint-disable no-undef */

// // request 1: Click to Change Text.
$('h1').on('click', (event) => {
  $('h1').text('Have a Good Time');
  console.log(event);
});

// // request 2: Click to Show More Content Boxes.
$('#btn_more_content').on('click', () => {
  const secondContent = $('.section_content_hide');
  if (
    !secondContent.css('display') ||
    secondContent.css('display') === 'none'
  ) {
    secondContent.css('display', 'flex');
    secondContent[0].scrollIntoView();
  } else {
    secondContent.css('display', 'none');
  }
});

// const buttonMoreContent = document.querySelector('#btn_more_content');
// const contentBox = document.querySelector('.section_content_hide');
// buttonMoreContent.addEventListener('click', () => {
//   console.log(contentBox.style.display);
//   if (!contentBox.style.display || contentBox.style.display === 'none') {
//     contentBox.style.display = 'flex';
//     buttonMoreContent.textContent = 'Hide Content';
//   } else {
//     contentBox.style.display = 'none';
//     buttonMoreContent.textContent = 'Show Content';
//   }
// });
