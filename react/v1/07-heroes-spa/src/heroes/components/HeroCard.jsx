import React from 'react'
import { Link } from 'react-router-dom';

export const HeroCard = ({
  id,
  superhero,
  publisher,
  alter_ego,
  first_appearance,
  characters,
}) => {
  const heroImageUrl = `/assets/heroes/${id}.jpg`;

  // const charactersByHero = (<p> {characters}</p>);

  const CharactersByHero = ({ alter_ego, characters }) => {
    if (alter_ego === characters) return (<></>);
    else return (<p> {characters}</p>);
  }
  return (
    <div className='col animate__animated animate__fadeIn'>
      <div className='card'>
        <div className='row no-gutters'>
          <div className='col-4'>
            <img src={heroImageUrl} className='card-img' alt={superhero}>
            </img>
          </div>
          <div className='col-8'>
            <h5 className='card-title'>{superhero}</h5>
            <p className='card-text'>{alter_ego}</p>
            <CharactersByHero characters={characters} alter_ego={alter_ego} />
            <p className='card-text'>
              <small className='text-muted'> {first_appearance}</small>
            </p>

            <Link to={`/hero/${id}`}> Más...</Link>

          </div>
        </div>
      </div>
    </div>
  )
}
