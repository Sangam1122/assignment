import firebase from "firebase/compat/app";
import "firebase/compat/database";
import styles from '../styles/user.module.css';
import React, { useState } from "react";
import Link from 'next/link';

const firebaseConfig = {
  // Add your Firebase configuration here
  apiKey: "AIzaSyBFnyaHDM8PKHBYO4ZPz_BnkjvY_LHQBEc",
  authDomain: "e-com-59460.firebaseapp.com",
  projectId: "e-com-59460",
  storageBucket: "e-com-59460.appspot.com",
  messagingSenderId: "276531225787",
  appId: "1:276531225787:web:9e48ab86e6a7832e87b59e",
  measurementId: "G-Y3WDQVLVVX"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

export default function User({ posts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredProductsArray = posts.filter((post) =>
      (post.title && post.title.toLowerCase().includes(query.toLowerCase())) ||
      (post.content && post.content.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredProducts(filteredProductsArray);
  };

 /* const handleSearchClick = () => {
    const filteredProductsArray = posts.filter((post) =>
      (post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.content && post.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredProducts(filteredProductsArray);
  };*/

  return (
    <>
    <div className={styles.navbar}>
      <nav>
        <div className={styles.searchbar}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button >Search</button>
        </div>
      </nav>
      </div>
      <div className={styles.updiv}>
      <div className={styles.container}>
            {(searchQuery.length > 0 ? filteredProducts : posts).map((post) => (
              <Link href={{ pathname: "/postpage", query: { post: post.id } }} key={post.id}>
                <div className={styles.card} key={post.id}>
                  <div className={styles.cardContent}>
                    <h2>{post.title}</h2>
                  </div>
                  <img src={post.image} alt={post.title} />
                  <p>{post.content}</p>
                </div>
              </Link>
            ))}
      

      </div>
    </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let posts = [];
  const snapshot = await database.ref('posts').once('value');
  snapshot.forEach((childSnapshot) => {
    const post = {
      id: childSnapshot.key,
      ...childSnapshot.val()
    };
    posts.push(post);
  });

  return {
    props: {
      posts
    }
  };
}
