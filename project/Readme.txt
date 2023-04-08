In this assignment i have created code in next.js and firebase.
I have created different different pages which Is : "User", "postpage", "Admin", "Auther"
You can open it by different tabs by localhost:3000/User,  localhost:3000/Auther,   localhost:3000/Admin


1. User ::-

    * This code defines a React component named "User" which is exported as a default export. The component is used to display a 
    list of posts fetched from a Firebase Realtime Database.

    * The component has the following state variables:

    * searchQuery: A string representing the user's search query.
    * filteredProducts: An array of posts that match the user's search query.

    * The handleSearchInputChange function is called whenever the user types in the search input field. 

    * It updates the searchQuery state variable and filters the posts array based on the user's search query. 
     The filtered posts are stored in the filteredProducts state variable.

    * The getServerSideProps function is an asynchronous function that is called by Next.js to fetch data for server-side rendering. 
     It retrieves all the posts from the Firebase Realtime Database and returns them as props to the Create component.

    * The Create component returns a JSX template that contains a search input field and a list of posts. 
    The list of posts is rendered based on the posts array if the searchQuery is empty or based on the filteredProducts array if the searchQuery is not empty.

    * Each post is rendered as a card with the title, image, and content. 
      The Link component from Next.js is used to create a clickable link to the post's individual page.

    * The Firebase Realtime Database is initialized at the beginning of the file using the firebase.initializeApp function with the provided configuration object. 
      The database is then accessed using the firebase.database() function and assigned to the database variable for use in the getServerSideProps function.

2. postpage ::-

       * The code is a React component for displaying a post and its comments, as well as allowing users to add comments to the post. 
        It uses Firebase Realtime Database to store and retrieve data.

    * The component imports the necessary modules, including Firebase, the Next.js router, and React hooks. 
    It also defines the Firebase configuration object, initializes the Firebase app if it hasn't already been initialized, and 
    creates a reference to the Firebase Realtime Database.

    * The component takes a post object as a prop, which contains the post's ID, title, image, and content. 
    The post ID is obtained from the router's query parameter.

    * The component uses the useEffect hook to listen for changes in the comments node of the post. Whenever the comments node is updated, 
    the hook updates the comments state with the new data. The hook also returns a cleanup function that detaches the listener.

    * The component uses the useState hook to manage the comment state. Whenever the user types in the comment input field, the hook 
    updates the comment state with the new value. When the user submits a comment, the cmponent checks if the comment is empty or 
    whitespace and returns early if it is. Otherwise, it creates a new child node under the comments node of the post, with the 
    comment text and a timestamp. It then resets the comment state.

    * The component renders the post's title, image, and content, as well as a form for adding comments. 
    The form includes an input field for the comment text and a submit button. The component also renders a list of comments, 
    if any exist, under the form.

3. Auther ::-

        * This code is a React component named Admin that allows users to add, edit, and delete blog posts. 
        It uses Firebase Realtime Database and Storage to store and retrieve the data.

    * The component imports several dependencies:

    * useState and useEffect from the react library for managing state and side effects, respectively
    * useRouter from the next/router library for managing client-side routing in a Next.js app
    * styles from a CSS module file named auther.module.css for styling the component
    * firebase for interacting with the Firebase services (Realtime Database and Storage)
    * The firebaseConfig object contains the configuration settings for the Firebase project. 
      The if statement checks if the Firebase app has already been initialized and initializes it if it hasn't.

    * The database and storage constants are initialized with the respective Firebase services.

    * The component's state is managed with the useState hook. The page state tracks which page of the component 
     should be displayed. The posts state stores an array of all blog posts fetched from the Firebase database. 
     The title, image, imageUrl, and content states store the values of the input fields in the form used to add/edit posts. 
     The selectedPostId state tracks the ID of the post currently being edited.

     * The useEffect hook is used to fetch all posts from the database when the component mounts.
      It listens for changes to the posts collection in the database and updates the posts state with the new data.

    * The handleSubmit function is called when the user submits the form to add/edit a post. If a post is being edited (i.e., selectedPostId is truthy), the function updates the post's data in the database. Otherwise, it adds a new post to the database. If an image is included in the form, the function uploads it to Firebase Storage and gets the URL of the uploaded image to store in the database. Finally, the function resets the input field values.

    * The handleImageChange function is called when the user selects an image to upload. 
      It updates the image state with the selected file.

    * The handleDelete function is called when the user clicks the "Delete" button on a post. 
     It removes the post from the database.

     * The handleEdit function is called when the user clicks the "Edit" button on a post. It updates the title, 
      content, selectedPostId, and imageUrl states with the data of the selected post, which is used to pre-fill the input 
      fields in the form for editing the post.

     * The component renders a form for adding/editing posts and a list of all blog posts fetched from the Firebase database. 
     The form includes input fields for the post title, image (which is uploaded using a file input), and content, as well as
     a submit button that either adds a new post or updates an existing one depending on the value of selectedPostId.
      The list of posts is rendered as a series of cards, each displaying the post's title, image, and content, along with 
      buttons to edit or delete the post.


4. Admin ::-
        * This is a React component that allows the user to manage blog posts. 
        The component uses Firebase to store and retrieve data from a Realtime Database and Storage bucket. 
        
        The user can add new posts, edit existing ones, and delete posts. 
        
        The component has a sidebar that allows the user to navigate between different pages: a welcome page, an about page, 
        and a blog posts page. 
        
        The blog posts page displays a list of all the posts, and the user can click on a post to edit or delete it. 
        
        The user can also add a new post by filling out a form that includes a title, an image, and content. 
        
        When the user adds a new post, the image is uploaded to Firebase Storage, and the post data is saved in the Realtime Database. 
        
        When the user edits an existing post, the image and post data are updated in the Realtime Database.






