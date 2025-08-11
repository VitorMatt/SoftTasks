import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import padLockOpened from './assets/cadeado-desbloqueado.png';
import padLockClosed from './assets/cadeado.png';
import './Login.css';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [user, setUser] = useState({email: '', password: ''});
    const [stateButton, setStateButton] = useState('Initial');
    const [passwordValid, setPasswordValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const navigate = useNavigate();

    const setStateLoading = (e) => {

        e.preventDefault();

        setStateButton('Loading');

        setTimeout(() => {

            handleLogin();
        }, 3500);
    }

    const handleLogin = () => {

        if (password.length<8 && !email.includes('@softplan.com.br')) {

            setPasswordValid(false);
            setEmailValid(false);
            setStateButton('Initial');
        } else if (password.length<8 && email.includes('@softplan.com.br')) {

            setPasswordValid(false);
            setEmailValid(true);
            setStateButton('Initial');
        } else if (!email.includes('@softplan.com.br') && password.length>=8) {

            setPasswordValid(true);
            setEmailValid(false);
            setStateButton('Initial');
        } else {

            setPasswordValid(true);
            setEmailValid(true);
            let userAux = {
                email: email,
                senha: password
            }
            setUser(userAux);

            setStateButton('Done');
            setTimeout(() => {

                navigate('/tarefas');
            }, 2000);
        }
    }

  return (
    
    <div className="container">
        <div className="container-left">

        <form onSubmit={setStateLoading} className="form-login">
            <div className="text-container">
                <h1>
                    Acesse sua conta.
                </h1>
            </div>
            <div className="input-container">
                <div className="input-space">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        id='email'
                        onChange={(e) => { setEmail(e.target.value) }}
                        type='email'
                        placeholder='Seu email'
                        />
                        {
                            !emailValid
                            &&
                            <p className="emailInvalid">Email inválido (use seu email da SoftPlan).</p>
                        }
                </div>
                <div className="input-space">
                    <label htmlFor="password">Senha</label>
                    <div className="password-container">
                        <input
                            value={password}
                            id='password'
                            onChange={(e) => { setPassword(e.target.value) }}
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder='Sua senha'
                            />
                            {
                                !passwordValid
                                &&
                                <p className="passwordInvalid">Sua senha deve ter no mínimo 8 caracteres.</p>
                            }
                        <button type='button' className="visible-password" onClick={() => { setPasswordVisible(!passwordVisible) }}>                             
                            {
                                password.length>0
                                &&
                                (

                                    <img
                                    src={passwordVisible ? padLockOpened : padLockClosed}
                                    />
                                )
                            }
                        </button>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <div className="button-space">
                    <button type='submit'>
                        {
                            stateButton==='Loading' && <span className="loading"></span>
                        }
                        {
                            stateButton==='Done' && <img className='check' src='check.png' />
                        }
                        {
                            stateButton==='Initial' && 'Entrar'
                        }
                            
                    </button>
                </div>
                <div className="sign-in">
                    <p>Não possui uma conta? Clique<p className="click-signIn">aqui</p></p>
                </div>
            </div>
        </form>
        </div>
        <div className="container-right">
            <div className="text-container">
            <h1>Simplifique sua rotina e amplie seus resultados.</h1>
            </div>
            <img src="Slide8.jpg" alt="" className="logo-softplan" />
        </div>
    </div>
  );
};

export default Login;