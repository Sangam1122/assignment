import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { useRouter } from 'next/router';
import  { useState, useEffect } from "react";
import styles from '../styles/post.module.css';

const firebaseConfig = {
    // Firebase configuration object
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

export default function postpage({ post }) {
    const router = useRouter();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState({});

    // Listen for changes in the comments node of the post
    useEffect(() => {
        const commentRef = database.ref(`posts/${post.id}/comments`);
        commentRef.on('value', (snapshot) => {
            setComments(snapshot.val());
        });
        return () => {
            commentRef.off();
        }
    }, [post.id]);

    // Check if the data is still being fetched
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        if (!comment.trim()) {
            return;
        }
        const commentRef = database.ref(`posts/${post.id}/comments`).push();
        commentRef.set({
            text: comment.trim(),
            timestamp: firebase.database.ServerValue.TIMESTAMP,
        });
        setComment('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.updiv}>
                <div className={styles.content}>
                    <div className={styles.cardLayout}>
                        <div className={styles.card} key={post.id}>
                            <div className={styles.cardContent}>
                                <h2>{post.title}</h2>
                            </div>
                            <img src={post.image} alt={post.title} />
                            <p>{post.content}</p>
                        </div>
                        <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
                            <label htmlFor="comment">Leave a comment:</label>
                            <input type="text" id="comment" value={comment} onChange={handleCommentChange} />
                            <button type="submit">Send</button>
                        </form>
                        <div className={styles.comments}>
                            <h3>Comments:</h3>
                            {comments && Object.keys(comments).map((commentId) => (
                                <p key={commentId}>{comments[commentId].text}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const postId = context.query.post;
    let post = {};

    // Fetch the data for the specified post ID
    await database.ref(`posts/${postId}`).once('value')
        .then((snapshot) => {
            post = {
                id: snapshot.key,
                ...snapshot.val()
            }
        });

    // Return the post data as props
    return {
        props: {
            post
        }
    }
}
