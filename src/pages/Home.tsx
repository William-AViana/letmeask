import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from './../App';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss'

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useContext(AuthContext)

  async function handleCrateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new');
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo letmeask" />
          <button onClick={handleCrateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}