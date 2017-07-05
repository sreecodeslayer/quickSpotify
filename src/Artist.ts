import {Album} from './album'

export class Artist{
	id:number;
	name:string;
	genre:any;
	href:string;
	followers:string;
	popularity:string;
	uri:string;
	albums:Album[]
}
