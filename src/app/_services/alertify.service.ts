import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }
  //Alertify Confirm, takes a message and a method if an
  // event kicks off (ex. user clicks a button)
  confirm(message: string, okCallback: () => any ){
    // confirm takes the message and an event of type any
    //if theres an event then execute okcallback 
    // if not then do nothing 
    alertify.confirm(message, (e: any) => {
      if (e) {
        //okCallback is something we define within our components
        okCallback();
      } else {}
    });
  }
  //Our success message is passed in and alertify will display
  //the message as successful 
  success(message: string){
    alertify.success(message);
  }

  error(message: string){
    alertify.error(message);
  }

  warning(message: string){
    alertify.warning(message);
  }

  message(message: string){
    alertify.message(message);
  }

}
