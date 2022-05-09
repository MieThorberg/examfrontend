import React from 'react'
import "../../styles/App.css"
import { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import facade from '../../apiFacade'

const GameSettingsPage = ({ setHeadline }) => {
    //title i topnav
    useEffect(() => {
        setHeadline("Game settings");
    }, []);

    let navigate = useNavigate();

    const [error, setError] = useState("")
    const [data, setData] = useState({ name: "", room: "" })
    const [pin, setPin] = useState("");
    const [game, setGame] = useState('')

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })

    }

    const validation = () => {
        if (!data.name) {
            setError("Please enter your name.")
            return false
        }
        if (!data.room) {
            setError("Please enter pin code.")
            return false
        }
        setError("")
        return true
    }

    const handleSubmit = e => {
        e.preventDefault()
        const isValid = validation()
        if (isValid) {
            navigate(`/join_game/${data.room}`, { state: data });
            facade.createGame('user', 'test123').then(data => setGame(data))
        }

    }

    const generatePin = () => {
        const newPin = Math.floor(100000 + Math.random() * 900000).toString().substring(1);
        // setPin(newPin)
        return setData({...data, room: newPin})
    }
    return (
        <div className='main2'>
            <div className='scroll-container'>
                <div className='full-scroll-section'>
                    <div className='box'>
                        <div className='text-section'>
                            <h2>Type amount of wolves</h2>
                            <input type="text" />
                        </div>
                    </div>

                    <div className='box'>
                        <div className='text-section'>
                            <h2>Time for each day round</h2>
                            <input type="text" />
                        </div>
                    </div>
                    <div className='box'>
                        <div className='text-section'>
                            <h2>Time for each day voting</h2>
                            <input type="text" />
                        </div>
                    </div>
                    <div className='box'>
                        <div className='text-section'>
                            <h2>Time for each night round</h2>
                            <input type="text" />
                        </div>
                    </div>

                    <div className='box'>
                        <form onSubmit={handleSubmit}>
                            <div >
                                <input type="name" name="name" placeholder="Game name" onChange={handleChange} />
                            </div>
                            <div>
                                <input readOnly type="name" name="room" placeholder="Generate pin" value={data.room}  onChange={handleChange} /><br></br>
                                <button onClick={generatePin}>Generate pin</button>
                            </div>
                            <button type="submit">Create game</button>
                            {/* If you dont have type in values for the inputs */}
                            {error ? <small>{error}</small> : ""}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameSettingsPage;