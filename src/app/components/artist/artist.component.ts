import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service'

import { Artist } from '../../../Artist';
import { Album } from '../../../Album';

import { ActivatedRoute } from '@angular/router'



@Component({
	moduleId:module.id,
	selector: 'artist',
	templateUrl: 'artist.component.html',
	providers:[SpotifyService]
})


export class ArtistComponent implements OnInit {
	id:string;
	artist:Artist[];
	albums:Album[]

	constructor(private _spotifyService:SpotifyService, private _route:ActivatedRoute){

	}

	ngOnInit(){


		this._spotifyService.receiveToken().subscribe(res=> {

			this._route.params.map(params => params['id']).subscribe((id) => {


				this._spotifyService.getArtist(id,res.access_token).subscribe(artist => {
					this.artist = artist;
					console.log(artist)
				})


				this._spotifyService.getAlbums(id,res.access_token).subscribe(albums => {
					this.albums = albums.items;
					console.log(albums)
				})


			})
		}
	}
}
