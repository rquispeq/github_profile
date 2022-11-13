import './App.css';
import logo from './logo.svg'

function App() {
  return (
    <div className="App">
      <div className="card">
        <div className="photo-profile">
            <img src={logo} alt="profile" />
        </div>
        <div className="content-profile">
            <div className="name">Rony quispe</div>
            <div className="bio">Bachiller Ingenieria de Computacion y Sistemas en la universidad San Martin de Porres, Lima-Perú</div>
            <div className="recounts">
                <div className="followers">
                    1,500
                </div>
                <div className="repos">
                    20
                </div>
                <div className="twitter">
                    @rquispeq
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
