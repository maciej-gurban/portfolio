### What is this application supposed to do?

This is an ASCII store, which displays the products (ascii faces) in a responsive grid. Here are the functional requirements for the application:

#### Product list
- Load and display initial batch of products
- Prefetch next batch of products each time "More" button is clicked
- When no more products available, display "End of catalogue"
- Display an advertisement (a kitten image) every N elements, but don't repeat the same ad twice in a row

#### Product
- Display each product in its original size
- display product date in "N time ago" format if product was added less than 7 days ago. If added more than 7 days ago, display the date.
- display product price in dollars ($2.50); API sends it in cents

#### Trickier part
The API serves the content as newline-delimeted JSON. This won't work with Angular out of the box, because Angular attempts to parse JSON upon receiving the response. A solution was provided that introduces an interceptor which formats the data into Angular-friendly format - an array of objects.

### Build system
A basic build system was provided that bases on NPM scripts. Here's what's available:

Install dependencies

`
  npm install
`

Build the project and run dev server on localhost:3000

`
  npm run build
`

Start SASS & JS watchers and run dev server on localhost:3000

`
  npm run watch
`

### API
The API is a piece of bad and dirty code that imitates throttled network by adding a random timeout to each request.
