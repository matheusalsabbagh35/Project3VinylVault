# VinylVault

# 1. Project Setup and Instructions

To run the project, you will need Node.js version 21 or higher. The npm package manager, vs code and a web browser. This project uses react with vite and react router to create a Vinyl store.

To download the project from GitHub by running git clone https://github.com/matheusalsabbagh35/Project3VinylVault.git in the terminal. Ater its downloaded, navigate into the project folder using cd. After run npm install to install all the required files.

# Running the project

After installing the dependencies, open the project folder in Visual Studio Code and run npm run dev in the terminal to start. The src folder contains the main React files, including App.jsx and main.jsx. The components folder contains reusable components such as Navbar, CartDrawer, and AlbumCard. The pages folder contains the catalog, album details, and checkout pages, while the data folder stores the provided albums.js file. The project also includes CSS files for styling and configuration files needed to run the application. After running npm run dev, click on the local URL to view the website.

# 2. React Component Hierarchy and State Flow Architecture

The VinylVault application will use React components to separate the website into different sections. The main App component will manage the shopping cart and share information with other components using props and callback functions. React Router will allow users to navigate between the catalog, album details, and checkout pages without reloading the website.

# Component Tree

```
<App> src/App.jsx
  State:
  cart [Array] - stores albums and quantities
   isCartOpen [Boolean] - controls cart visibility

 Functions:
   addToCart(album, quantity)
   updateQuantity(albumId, delta)
   removeFromCart(albumId)
   clearCart()

<Navbar> src/components.Navbar.jsx
  State: None
  Props:
   cartCount [Number]
   onOpenCart [Function]
  Events:
   onOpenCart() - opens the cart

 <Routes> → React Router
  State: None
  Props: None

 <CatalogPage> → src/pages/CatalogPage.jsx
  Route: /
  State:
   selectedGenre [String] - current genre filter
  Props:
   albums [Array]
   onAddToCart [Function]
  Events:
   setSelectedGenre(genre) - changes the filter

 <AlbumCard> → src/components/AlbumCard.jsx
  State: None
  Props:
   album [Object]
   onAddToCart [Function]
  Events:
   onAddToCart(album) - adds an album to the cart
   Link to /album/:albumId - opens album details

 <AlbumPage> → src/pages/AlbumPage.jsx
  Route: /album/:albumId
  State:
  quantity [Number] - stores selected album quantity
  Props:
   albums [Array]
   onAddToCart [Function]
  Events:
   useParams() - reads the album ID from the URL
   onAddToCart(album) - adds the selected album

 <CheckoutPage> → src/pages/CheckoutPage.jsx
  Route: /checkout
  State:
   formData [Object] - stores customer information
   isSubmitted [Boolean] - tracks order confirmation
  Props:
   cart [Array]
   onClearCart [Function]
  Events:
   handleSubmit(event) - validates checkout
   onClearCart() - clears the cart after checkout

 <CartDrawer> → src/components/CartDrawer.jsx
  State: None
  Props:
   cart [Array]
   isOpen [Boolean]
   onClose [Function]
   onUpdateQuantity [Function]
   onRemove [Function]
  Events:
   onClose() - closes the cart
   onUpdateQuantity(albumId, delta) - changes quantity
   onRemove(albumId) - removes an album
   useNavigate() - navigates to checkout
```
