import React from 'react'
import './App.css';
import CharacterCard from './components/CharacterCard';
import Loading from './components/Loading';
import Pagination from './components/Pagination';
import CharacterModal from './components/CharacterModal';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      characters:[],
      filteredCharacters:[],
      isLoading:true,
      search:'',
      totalPages: 0,
      currentPage: 1,
      statusCharacter: "",
      totalCharacters: 0,
      selectedCharacter: null
    }
  }
  getCharacters = async (page) => {
    const endpoint = `https://rickandmortyapi.com/api/character?page=${page}`;
    const {results, info} = await fetch(endpoint).then(response => response.json())
    this.setState({isLoading:false, characters:results, filteredCharacters:results, totalPages:info.pages, totalCharacters:info.count})
  }


  componentDidMount(){
    this.getCharacters(1)
  }

  handleOnChange = ({target:{value}}) => {
    this.setState({search:value})
  }

  handleFilterCharacters = () => {
    const { characters, search} = this.state;
    const filteredArray = characters.filter(({name})=> name.toUpperCase().includes(search.toUpperCase()))
    this.setState({filteredCharacters:filteredArray})
  }

  handlePageChange = (currentPage) => {
    this.setState({currentPage});
    this.getCharacters(currentPage);
  }

  handleOnClickFilterStatus = ({target}) => {
    const statusCharacter = target.textContent;
    this.setState({ statusCharacter });
  }

  handleOnClickResetFilter = () => {
    this.setState({ statusCharacter:"" })
  }

  openModal = (character) => {
    this.setState({ selectedCharacter: character });
  };

  closeModal = () => {
    this.setState({ selectedCharacter: null });
  };

  render(){
    const {filteredCharacters, isLoading, totalPages, statusCharacter, totalCharacters, selectedCharacter} = this.state
    return (
      <div className="App">
        <form>
          <input type='text' data-testid="inputSearch" placeholder='Search Character...' onChange={this.handleOnChange}/>
          <button type='button' onClick={this.handleFilterCharacters}>Buscar</button>
        </form>
        <div className='containerStatus'>
          <button className='buttonStatus' onClick={(event) => this.handleOnClickFilterStatus(event)}>Alive</button>
          <button className='buttonStatus' onClick={(event) => this.handleOnClickFilterStatus(event)}>Dead</button>
          <button className='buttonStatus' onClick={(event) => this.handleOnClickFilterStatus(event)}>Unknown</button>
          <button className='buttonStatus' onClick={this.handleOnClickResetFilter}>All</button>
        </div>
        {
          isLoading ? <Loading/> : 
          <section className='card-list'>
            {
              statusCharacter === "" ? filteredCharacters.map(item=> <div className='container-cards' onClick={() => this.openModal(item)}>
                <CharacterCard  character={item} key={Math.random()} />
              </div>) :
              filteredCharacters.filter(({status})=> statusCharacter && status.toLowerCase() === statusCharacter.toLowerCase()).map(item=> <div className='container-cards' onClick={() => this.openModal(item)}>
                <CharacterCard character={item} key={Math.random()} />
              </div>)
            }
          </section>
        }
        <h2 className='totalChar'>Total Characters: {totalCharacters}</h2>
        <div>
          <Pagination
            totalPages={totalPages}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
        {selectedCharacter && (
          <CharacterModal character={selectedCharacter} onClose={this.closeModal} />
        )}
      </div>
    );
  }
}

export default App;
