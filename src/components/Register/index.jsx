import React, { Component } from 'react';
import Header from '../Header/';
import './style.css';
import logoGoogle from '../../imagens/new-google-favicon-logo.png';
import firebase from '../../resource/firebase';

class Register extends Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        messageEmail: '',
        messagePassword: '',
    };

    handlerInput = (event) => {
        let state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    };

    register = (event) => {
        event.preventDefault();
        firebase.register(this.state.email, this.state.senha)
            .then(data => {
                firebase.createUser(data.user.uid, data.user.email, this.state.nome)
            })
            .catch(err => {
                this.verifyMessage(err.code);
            });
    };

    verifyMessage = (error) => {
        console.log(error);
        switch (error) {
            case "auth/weak-password":
                this.setState({
                    messagePassword: "Senha Fraca !"
                });
                let inputPassword = document.querySelector("#input-senha");
                inputPassword.classList.add('is-invalid');
                inputPassword.focus();
                setTimeout(() => {
                    inputPassword.classList.remove('is-invalid');
                    this.setState({
                        messagePassword: ""
                    });
                }, 5000);
                break;
            case "auth/email-already-in-use":
                this.setState({
                    messageEmail: "Email Já Cadastrado Verificar !"
                });
                let inputEmail = document.querySelector("#input-email");
                inputEmail.classList.add('is-invalid');
                inputEmail.focus();
                setTimeout(() => {
                    inputEmail.classList.remove('is-invalid');
                    this.setState({
                        messageEmail: ""
                    });
                }, 5000);
                break;
            default:
                console.log(error);
                break;
        };
    };

    render() {
        return (
            <div>
                <Header
                    way={[
                        { way: '/auth', nameWay: 'Entrar' }
                    ]}
                />
                <div className="form container">
                    <h2>Se Cadastre e Mostre o Seu Melhor</h2>
                    <div className="d-flex align-items-center">
                        <form onSubmit={this.register}>
                            <div className="form-group">
                                <label>Nome:</label>
                                <input id='input-name' type="text" name='nome' onChange={this.handlerInput} value={this.state.nome} className="form-control" placeholder='Primeiro e ultimo nome' required />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input id='input-email' type="email" name='email' onChange={this.handlerInput} value={this.state.email} className="form-control" placeholder='exemplo@exemplo.com.br' required />
                                {this.state.messageEmail}
                            </div>
                            <div className="form-group">
                                <label>Senha:</label>
                                <input id='input-senha' type="password" name='senha' onChange={this.handlerInput} value={this.state.senha} className="form-control" placeholder='***********' required />
                                {this.state.messagePassword}
                            </div>
                            <button type="submit" className="btn form-btn">Cadastrar</button>
                            <button className="btn button-google" onClick={()=>{firebase.registerWithGoogle()}}>
                                <img src={logoGoogle} className='rounded' alt="LOGO GOOGLE" />
                                    Cadastrar com Google
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        );
    };
};

export default Register;