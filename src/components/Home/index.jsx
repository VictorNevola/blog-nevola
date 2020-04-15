import React, { useState, useEffect } from 'react';
import firebase from '../../resource/firebase';
import Header from '../Header';
import './style.css';

const Home = () => {

    const [posts, setPost] = useState([]);

    useEffect(() => {
        let allPosts = [];
        const dbPost = () => {
            firebase.app.ref('posts').once('value', (snapshot) => {
                snapshot.forEach(item => {
                    allPosts.push({
                        key: item.key,
                        titulo: item.val().titulo,
                        imagem: item.val().imagem,
                        descricao: item.val().descricao,
                        autor: item.val().Autor,
                    });
                });
                return setPost(allPosts);
            });
        };
        dbPost();
    }, []);

    return (
        <div>
            <Header
                way={[
                    { way: '/register', nameWay: 'Cadastrar' },
                    { way: '/auth', nameWay: 'Login' }
                ]}
            />
            <div className='container'>
                {
                    posts.length === 0 ? <h1>Carregando</h1> : posts.map((post) => {
                        return (
                            <article className="card posts" key={post.key}>
                                <header className="card-header">
                                    <div className="posts-titles">
                                        <strong className="posts-title">{post.titulo}</strong>
                                        <span className="posts-autor">Autor: {post.autor}</span>
                                    </div>
                                </header>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <img className="figure-img img-fluid rounded posts-image" src={post.imagem} alt="imagem post" title={'imagem ' + post.titulo} />
                                        <figcaption className="figure-caption">{post.descricao}</figcaption>
                                    </blockquote>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Home;