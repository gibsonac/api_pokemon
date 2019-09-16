import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    this.getPokemon();
    // this.getDetails();
  }
  getPokemon() {
    let observable = this._http.get('https://pokeapi.co/api/v2/pokemon/1/')
    observable.subscribe(data => {
      console.log("we are subscribed!", data)
      this.getDetails(data);
    })
  }
  getDetails(data) {
    console.log(`I picked ${data['forms'][0]['name']}! His ability is ${data['abilities'][0]['ability']['name']} and also ${data['abilities'][1]['ability']['name']}`)
    this.otherPoke(data);
  }
  otherPoke(data) {
    let thisAbility = data['abilities'][0]['ability']['url'];
    console.log(thisAbility);
    let secondAbility = data['abilities'][1]['slot'];
    //make new API inquiry with the ability number;
    let newObservable = this._http.get(thisAbility);
    newObservable.subscribe(data => {
      console.log(`there are ${data['pokemon'].length} Pokemon with that first ability!`)
      for (var x = 0; x < data['pokemon'].length; x++) {
        // console.log(data['pokemon'][x]['pokemon']['name']);
        let name = data['pokemon'][x]['pokemon']['name'];
        let observable = this._http.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        observable.subscribe(data => {
          console.log(`${data['forms'][0]['name']}! also has the abilities of ${data['abilities'][0]['ability']['name']} and also ${data['abilities'][1]['ability']['name']}`)
        })

      }
    })
  }
}

      //   let secondObservable = this._http.get(`https://pokeapi.co/api/v2/ability/${thisAbility}/`);
      //   secondObservable.subscribe(data => {
        //     console.log(`there are ${data['pokemon'].length} Pokemon with that second ability!`)
        // })

