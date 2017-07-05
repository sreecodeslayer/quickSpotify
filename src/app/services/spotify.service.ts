import {Injectable} from '@angular/core';
import { Http , Headers , Response, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';


@Injectable()

export class SpotifyService{
	private searchUrl:string;

	private client_id ='<HERE>';
	private client_secret = '<HERE>';
	private encoded = btoa(this.client_id + ':' + this.client_secret);
	constructor(private _http:Http){}

	receiveToken(){
		let params = ('grant_type=client_credentials');
		let headers = new Headers();

		headers.append('Authorization', 'Basic ' + this.encoded);
		headers.append('Content-Type' , 'application/x-www-form-urlencoded');
		// headers.append('Access-Control-Allow-Origin','*');
		// headers.append("Access-Control-Allow-Methods", "POST");
		
		// headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		return this._http.post('https://accounts.spotify.com/api/token', params , {headers : headers} ).map(res=> res.json());
	}


	searchMusic(str:string, type='artist', token:string){
		this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=50&type='+type;
		let headers = new Headers();
		headers.append('Authorization' , 'Bearer ' + token);
		headers.append('Access-Control-Allow-Origin','https://spotify.com')

		return this._http.get(this.searchUrl , {headers : headers}).map((res: Response) => res.json())
	}
}