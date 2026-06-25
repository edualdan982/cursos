interface Props{
    placeholder?:string;
}

export const SearchHeader = ({placeholder = "Buscar gifs"}:Props) => {
  return (
    <div className="search-container">
        <input type="text" placeholder={placeholder}/>
        <button>Buscar</button>
      </div>
  )
}
