import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { database } from '../services/firebase';
import { useAuth } from './../hooks/useAuth';
import { Button } from '../components/Button';

import '../styles/auth.scss'
import { useTheme } from './../hooks/useTheme';

export function Home() {
  const { theme, toggleTheme } = useTheme();
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState('')
  async function handleCrateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists');
      return;
    }

    if (roomRef.exists()) {
      alert('Room already close.');
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }


  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <h1>{theme}</h1>
          {/* <button onClick={toggleTheme}>Toggle</button> */}
          <img src={logoImg} alt="Logo letmeask" />
          <button onClick={handleCrateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
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