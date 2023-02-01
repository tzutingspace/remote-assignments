const productList = document.getElementById('product');

function ajax(src, callback) {
  // your code here
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };
  xhr.open('GET', src);
  xhr.send();
}

function render(data) {
  // your code here
  // document.createElement() and appendChild() methods are preferred.
  data.forEach((product) => {
    console.log(product);
    const section = document.createElement('section');
    section.innerHTML = `
      <h2>${product.name}</h2> 
      <p>$ ${product.price}</p>
      <p>${product.description}</p>`;
    productList.appendChild(section);
  });
}

ajax(
  'https://appworks-school.github.io/Remote-Assignment-Data/products',
  (response) => {
    render(response);
  }
); // you should get product information in JSON format and render data in the page
