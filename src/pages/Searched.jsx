import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from 'styled-components'

const Searched = () => {
    const { search } = useParams()
    const [searched, setSearched] = useState([])
    const getSearched = async (search) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${search}`)
        const recipes = await data.json()
        setSearched(recipes.results)
        localStorage.setItem(`${search}`, JSON.stringify(recipes.results))
    }
    useEffect(() => {
        getSearched(search)
    }, [search])

    return (
        <Grid>
            {searched?.map((item) => (
                <Card key={item.id}>
                    <Link to={`/recipe/${item.id}`}>
                        <img src={item.image} alt='' />
                        <h4>{item.title}</h4>
                    </Link>
                </Card>
            ))}
        </Grid>
    )
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;
`
const Card = styled.div`
img{
    width: 100%;
    border-radius: 2rem;
}
a {
    text-decoration: none;
}
h4 {
    text-align: center;
    padding: 1rem;
}
`

export default Searched