// JSX: Javascript + XML (HTML)

// CSS
import './styles/main.css'

// Logo
import logoImg from './assets/logo-nlw-esports.svg'

// Components
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import CreateAdModal from './components/CreateAdModal'

// Hooks
import { useEffect, useState } from 'react'

// Radix
import * as Dialog from '@radix-ui/react-dialog'

// Axios
import axios from 'axios'

interface Game {
  id: string,
  title: string,
  bannerURL: string,
  _count: {
    Ad: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => (
          <GameBanner
            key={game.id}
            bannerURL={game.bannerURL}
            title={game.title}
            adsCount={game._count.Ad}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal />
      </Dialog.Root>

    </div>
  )
}

export default App
