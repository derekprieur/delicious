import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const Recipe = () => {
    const [details, setDetails] = useState({})
    const [activeButton, setActiveButton] = useState('instructions')
    const { id } = useParams()
    const fetchDetails = async () => {
        const check = localStorage.getItem(`${id}`)
        if (check) {
            setDetails(JSON.parse(check))
        } else {
            const data = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
            const detailData = await data.json()
            setDetails(detailData)
            localStorage.setItem(`${id}`, JSON.stringify(detailData))
            console.log('test')
        }
    }

    useEffect(() => {
        fetchDetails()
    }, [id])

    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt='recipe image' />
            </div>
            <Info>
                <Button className={activeButton === 'instructions' && 'active'} onClick={() => setActiveButton('instructions')}>Instructions</Button>
                <Button className={activeButton === 'ingredients' && 'active'} onClick={() => setActiveButton('ingredients')}>Ingredients</Button>
                {activeButton == 'instructions' ?
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                        <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                    </div> :
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                }
            </Info>
        </DetailWrapper>
    )
}

const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    .active {
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul {
        margin-top: 2rem;
    }
`
const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem;
    font-weight: 600;
    cursor: pointer;
`
const Info = styled.div`
    margin-left: 10rem;
`

export default Recipe