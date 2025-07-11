import GameBoard from './components/GameBoard'
import logo from './assets/logo.svg'

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="Prime Number Guessing Game Logo" />
        <h1>Prime Number Guessing Game</h1>
      </header>
      <main>
        <GameBoard />
      </main>
    </div>
  )
}

export default App