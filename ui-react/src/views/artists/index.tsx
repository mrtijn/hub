import React from 'react';
import './artists.scss';
import api from '../../services/api.service';
import ArtistItem from '../../components/artist/artist-item';
const initialState = {
    artists: [],
    searchQuery: '',
    searchResults: []
}
type State = Readonly<typeof initialState>;

class Artists extends React.Component {
    readonly state : State = initialState;
    constructor(props: any){
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){
        this.getArtists();
    }

    onChange = (e: any) => this.setState({ [e.target.name]: e.target.value });

    async getArtists(){
        try {
           const artists = await api.getArtists();
           this.setState({ artists : artists });
        } catch (error) {
            console.error(error);
        }
    }

    renderArtists(){
        return this.state.artists.map((artist: any) => <ArtistItem key={artist.id} artist={artist}></ArtistItem>);
    }

    async handleSearch(e: React.FormEvent){
        e.preventDefault();
        try {
            const artists = await api.searchArtist(this.state.searchQuery);
            this.setState({ searchResults : artists });
         } catch (error) {
             console.error(error);
         }
    }

    render() {
        return(
            <div className="c-artist">
                <div className="c-artist__list">
                    {this.renderArtists()}
                </div>
            </div>
        )
    }
}

export default Artists;