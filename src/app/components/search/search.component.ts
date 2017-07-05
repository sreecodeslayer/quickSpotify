import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service'
import { Album } from '../../../Album'
import { Artist } from '../../../Artist'

@Component({
	moduleId:module.id,
	selector: 'search',
	templateUrl: 'search.component.html',
	providers:[SpotifyService]
})


export class SearchComponent  {

	searchStr:string;
	searchResults:Artist[];

	constructor(private _spotifyService:SpotifyService){}
	searchMusic(){

		this._spotifyService.receiveToken().subscribe(res=> {
			// console.log(this.searchStr)
			console.log(res.access_token)
			this._spotifyService.searchMusic(this.searchStr,'artist',res.access_token).subscribe(res=> {
				this.searchResults = res.artists.items
			})
		})
	}

}
