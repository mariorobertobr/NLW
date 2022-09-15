import { useState } from 'react'
import './main.css'
import logoImg from './assets/logo.svg'
import { MagnifyingGlassPlus } from 'phosphor-react'

function App() {

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt=""></img>
      <h1 className="text-6xl text-white font-black mt-20">Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href='' className="relative rounded-lg overflow-hidden" >
          <img src="/game-1.png"></img>


          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className="font-bold text-white block">League of Legends</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 Anuncios</span>
          </div>
        </a>
        <a href='' className="relative rounded-lg overflow-hidden" >
          <img src="/game-2.png"></img>
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className="font-bold text-white block">Dota</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 Anuncios</span>
          </div>
        </a>
        <a href='' className="relative rounded-lg overflow-hidden">
          <img src="/game-3.png"></img>
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className="font-bold text-white block">CS GO</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 Anuncios</span>
          </div>
        </a>
        <a href='' className="relative rounded-lg overflow-hidden" >
          <img src="/game-4.png"></img>
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className="font-bold text-white block">Apex</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 Anuncios</span>
          </div>
        </a>
        <a href='' className="relative rounded-lg overflow-hidden">
          <img src="/game-5.png"></img>
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className="font-bold text-white block">Fortnite</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 Anuncios</span>
          </div>
        </a>
        <a href='' className="relative rounded-lg overflow-hidden">
          <img src="/game-6.png"></img>
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className="font-bold text-white block">WoW</strong>
            <span className='text-zinc-300 text-sm block mt-1'>4 Anuncios</span>
          </div>
        </a>





      </div>
      <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
        <div className='bg-[#2A2634] px-8 py-6  flex justify-between items-center'>
          <div>
            <strong className="text-2xl text-white font-black block">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>
          <button className="py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded flex items-center gap-3"><MagnifyingGlassPlus size={24} />Publicar Anúncio</button>
        </div>
      </div>
    </div >
  )
}

export default App
