import {Injectable} from '@angular/core';
import { Http , Headers , Response, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()

export class SpotifyService{
	private searchUrl:string;
	private artistUrl:string;
	private albumsUrl:string;

	private client_id ='4af3c467ec724f60a42d68ff7ef76e08';
	private client_secret = 'dbea40380c2441f9b75c06a3314328a3';
	private encoded = btoa(this.client_id + ':' + this.client_secret);
	constructor(private _http:Http){}

	receiveToken(){
		let params = ('grant_type=client_credentials');
		let headers = new Headers();

		headers.append('Authorization', 'Basic ' + this.encoded);
		headers.append('Content-Type' , 'application/x-www-form-urlencoded');
		return this._http.post('https://accounts.spotify.com/api/token', params , {headers : headers} ).map(res=> res.json());
	}


	searchMusic(str:string, type='artist', token:string){
		this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=50&type='+type;
		let headers = new Headers();
		headers.append('Authorization' , 'Bearer ' + token);
		headers.append('Access-Control-Allow-Origin','https://spotify.com')

		return this._http.get(this.searchUrl , {headers : headers}).map((res: Response) => res.json())
	}


	getArtist(id:string, token:string){
		this.artistUrl = 'https://api.spotify.com/v1/artists/'+id;
		let headers = new Headers();
		headers.append('Authorization' , 'Bearer ' + token);

		return this._http.get(this.artistUrl , {headers : headers}).map((res: Response) => res.json())
	}


	getAlbums(artistId:string, token:string){
		this.albumsUrl = 'https://api.spotify.com/v1/artists/'+artistId+'/albums';
		let headers = new Headers();
		headers.append('Authorization' , 'Bearer ' + token);

		return this._http.get(this.albumsUrl , {headers : headers}).map((res: Response) => res.json())
	}
}