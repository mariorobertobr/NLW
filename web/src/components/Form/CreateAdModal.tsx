import * as Dialog from "@radix-ui/react-dialog";
import { Check, GameController } from "phosphor-react";
import { Input } from "./input";
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select'
import { FormEvent, useEffect, useState } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Game } from "../../App";
import axios from "axios";
interface propAds {

    name: string;
    discord: string;
    yearsPlaying: number;
    weekDays: [],
    hourStart: string;
    hourEnd: string;
    useInvoiceChannel: boolean;

}


export function CreateAdModal() {


    const [teste, setTeste] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]);
    const [useVoiceChannel, setVoiceChannel] = useState(false)
    const [createUser, setCreateUser] = useState(0)
    const [velho, setVelho] = useState(false);


    useEffect(() => {
        const response = axios('http://localhost:3000/games')
            .then(response => {
                setGames(response.data);
            })

    }, [createUser])

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData)
        try {

            const createAd = await axios.post(`http://localhost:3000/games/${data.game}/ads`, {

                name: data.name,
                discord: data.discord,
                yarsPlaying: Number(data.yearsPlaying),
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useInvoiceChannel: useVoiceChannel,

            }).then(() => {
                setCreateUser(createUser + 1);
            })
            alert('Success')
        }
        catch (error) {
            console.log(error);
            alert('erro')
        }

    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]' >
                <Dialog.Title className='text-4xl text-white font-black'>Publique um Anuncio </Dialog.Title>
                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='game' className='font-semibold'>Qual o Game?</label>
                        <select id="game"
                            name="game"
                            className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                            defaultValue=""
                        >
                            <option disabled >Selecione o game pra jogar</option>
                            {
                                games.map(game => {
                                    return (
                                        <option key={game.id} value={game.id}>{game.title}</option>
                                    )
                                })
                            }
                        </select>

                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome(ou nickname)</label>
                        <Input name="name" id="name" placeholder="como te chamem dentro do game?" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='yarsPlaying'>Joga há quantos anos?</label>
                            <Input name="yearsPlaying" id="yearsPlaying" type="number" min="0" placeholder="tudo bem ser zero"></Input>
                        </div>


                        <div className='flex flex-col gap-2'>
                            <label htmlFor='discord'>Qual seu Discord?</label>
                            <Input name="discord" id="discord" type="text" placeholder="Usuario#0000"></Input>
                        </div>
                    </div>
                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='weekDays'>Quando Costuma jogar?</label>
                            <ToggleGroup.Root type="multiple" className='grid grid-cols-4  gap-2' value={weekDays} onValueChange={setWeekDays}>
                                <ToggleGroup.Item value="0" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') && 'bg-violet-500'}`} title='Domingo'>D</ToggleGroup.Item>
                                <ToggleGroup.Item value="1" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') && 'bg-violet-500'}`} title="Segunda">S</ToggleGroup.Item>
                                <ToggleGroup.Item value="2" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') && 'bg-violet-500'}`} title='Terça'>T</ToggleGroup.Item>
                                <ToggleGroup.Item value="3" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') && 'bg-violet-500'}`} title='Quarta'>Q</ToggleGroup.Item>
                                <ToggleGroup.Item value="4" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') && 'bg-violet-500'}`} title='Quinta'>S</ToggleGroup.Item>
                                <ToggleGroup.Item value="5" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') && 'bg-violet-500'}`} title='Sexta'>S</ToggleGroup.Item>
                                <ToggleGroup.Item value="6" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') && 'bg-violet-500'}`} title='Sábado'>S</ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 flex-1'>
                        <label htmlFor='hourStart'>Quando horário do dia?</label>
                        <div className='grid grid-cols-2 gap-2'>
                            <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                            <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                        </div>
                    </div>
                    <label className='mt-2 flex gap-2 items-center text-sm text-white'>
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setVoiceChannel(true)
                                }
                                else {
                                    setVoiceChannel(false)
                                }
                            }} className="w-6 h-6 p-1 rounded bg-zinc-900">
                            <Checkbox.CheckboxIndicator className="">
                                <Check className="w-4 h-4 text-emerald-500 items-center"></Check>
                            </Checkbox.CheckboxIndicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>
                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close
                            type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-700">
                            Cancelar
                        </Dialog.Close>
                        <button type="submit" className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center justify-between gap-3 hover:bg-violet-700' >
                            <GameController size={24} />
                            Encontrar Duo
                        </button>
                    </footer>
                </form>

            </Dialog.Content>
        </Dialog.Portal>
    )
}