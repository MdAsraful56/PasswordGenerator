import './App.css'
import { useCallback, useEffect, useState } from 'react'

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const handleGeneratePassword = useCallback(() => {
    let pass = ''
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numberAllowed) charset += '0123456789';
    if (charAllowed) charset += '!@#$%^&*()_+{}|:<>?-=[];,./';

    for (let i = 0; i <= length; i++) {
        let char = Math.floor(Math.random() * charset.length + 1);
        pass += charset.charAt(char)
    }
    setPassword(pass);
    // console.log(pass);

    // setPassword(Array(length).fill(charset).map(x => x[Math.floor(Math.random() * x.length)]).join(''));
  } , [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    handleGeneratePassword();
  }, [length, numberAllowed, charAllowed, setPassword, handleGeneratePassword]);

  return (
      <div className="w-full max-w-md pb-10 pt-8 mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-700">
        <h1 className="text-white text-4xl mb-5 text-center font-semibold">Password Generator</h1>
        <div className="flex shadow-lg overflow-hidden mb-4 rounded-lg">
            <input type="text" value={password} className='font-semibold outline-none w-full py-1 px-3 bg-white text-gray-800' placeholder='Password' readOnly />
            <button className='outline-none bg-blue-700 text-white px-3 font-medium py-05 shrink-0'>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={6} max={32} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}} />
            <label className='text-base font-medium' >Length : {length} </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => {
              setNumberAllowed((prev) => !prev)
            }} />
            <label className='text-base font-medium' htmlFor='numberInput'>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox" defaultChecked={charAllowed} id='characterInput' onChange={() => {
              setCharAllowed((prev) => !prev)
            }} />
            <label className='text-base font-medium'  htmlFor='characterInput'>Characters</label>
            
          </div>
        </div>
      </div>
  )
}

export default App
