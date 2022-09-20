import { useEffect, useState } from 'react'
import './main.css'
import logoImg from './assets/logo.svg'
import { GameController, MagnifyingGlassPlus } from 'phosphor-react'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/Form/CreateAdModal'
import axios from 'axios'

export interface Game {
  id: string;
  title: string;
  bannerURL: string;
  _count: {
    ads: number;
  }
}


function App() {


  const [hasUserClickedOnButton, SetHasUserClickedOnButton] = useState(false);
  const [games, setGames] = useState<Game[]>([]);

  function HandleButtonClick() {
    SetHasUserClickedOnButton(true)
  }

  useEffect(() => {
    axios('http://localhost:3000/games')
      .then(response => {
        setGames(response.data)
        console.log(response.data)
      })

  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt=""></img>
      <h1 className="text-6xl text-white font-black mt-20">Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16">

        {games.map(game => {
          return (
            <GameBanner key={game.title} bannerUrl={game.bannerURL} title={game.title} adsCount={game._count.ads} />
          )
        })
        }

      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>


    </div >
  )
}

export default App
