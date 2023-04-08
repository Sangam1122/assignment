import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/auther.module.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';

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
const storage = firebase.storage();

export default function Admin() {
    const router = useRouter();
    const [page, setPage] = useState('welcome');
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');
    const [selectedPostId, setSelectedPostId] = useState(null);

    // fetch all posts from the database when the component mounts
    useEffect(() => {
        database.ref('posts').on('value', (snapshot) => {
            const posts = [];
            snapshot.forEach((childSnapshot) => {
                const post = {
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                };
                posts.push(post);
            });
            setPosts(posts);
        });
    }, []);

    // handle form submit to add new post to the database or update an existing one
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedPostId) {
            // update existing post
            const updatedPost = {
                title,
                content,
                image: imageUrl,
            };
            database.ref(`posts/${selectedPostId}`).update(updatedPost);
            setSelectedPostId(null);
        } else {
            // add new post
            const newPostRef = database.ref('posts').push();
            const newPostKey = newPostRef.key;
            const storageRef = storage.ref(`images/${newPostKey}`);
            storageRef.put(image).then(() => {
                // get the image URL from Firebase Storage and store it in Realtime Database
                storageRef.getDownloadURL().then((url) => {
                    const newPost = {
                        id: newPostKey,
                        title,
                        content,
                        image: url,
                    };
                    newPostRef.set(newPost);
                });
            });
        }
        setTitle('');
        setContent('');
        setImageUrl('');
    };


    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    // handle delete button click to remove post from the database
    const handleDelete = (id) => {
        database.ref('posts/' + id).remove();
    };

    // handle edit button click to update post in the state and display the data in the form
    const handleEdit = (id) => {
        const selectedPost = posts.find((post) => post.id === id);
        setTitle(selectedPost.title);
        setContent(selectedPost.content);
        setSelectedPostId(id);
        setImageUrl(selectedPost.image);
    };

    return (
        <div className={styles.container}>
            <p>Auther page</p>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="file"
                        id="image-upload" accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="content">Content:</label>
                    <textarea id="content" value={content} onChange={e => setContent(e.target.value)} required />
                </div>
                {selectedPostId ? (
                    <button type="submit" className={styles.submitButton} onClick={handleSubmit}>Update Post</button>
                ) : (
                    <button type="submit" className={styles.submitButton}>Add Post</button>
                )}
            </form>
            <div className={styles.cardLayout}>
                {posts.map(post => (
                    <div className={styles.card} key={post.id}>

                        <div className={styles.cardContent}>
                            <h2>{post.title}</h2>
                            <img src={post.image} alt={post.title} />
                            <p>{post.content}</p>
                            <div className={styles.cardButtons}>
                                <button onClick={() => handleEdit(post.id)}>Edit</button>
                                <button onClick={() => handleDelete(post.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
