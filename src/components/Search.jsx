import { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import FormStyle from './FormStyle'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        navigate(`/searched/${input}`)
    }
    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch />
                <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
        </FormStyle>
    )
}

export default Search