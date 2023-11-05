import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'calculadora-app';
  public actionsHistory: string[] = [];
  public content: string = "";
  public lastEvent = "";

  handleChildEvent(event: MouseEvent | string) {
    this.handleAction(event as string);
  }
  handleAction(event: string){
    //CASO 1: La tecla es una operacion
    if(this.verifyIsOperation(event)){
      //No se permite una operacion como primer item
      if(!Boolean(this.actionsHistory.length)){
        return;
      }
      this.actionsHistory.push(event);
      //CASO 2: La tecla es un número o un punto
    }else if (this.isNumberOrPoint(event)){
      //Se guarda el numero como primer item
      if(!Boolean(this.actionsHistory.length)){
        this.actionsHistory.push(event);
        this.content = event;
        return;
      }
      //Si el ultimo event fue un '=' se resetea el historial de operaciones
      if(this.lastEvent === "="){
        this.actionsHistory = [event];
        this.content = event;
        this.lastEvent = event;
        return;
      }
      let prevVal = this.getLastValue(this.actionsHistory);
      //Si el ultimo item fue una operacion, se guarda el numero como nuevo item
      if(this.verifyIsOperation(prevVal)){
        this.actionsHistory.push(event);
        this.content = event;
        return;
      }
      //No se permite mas de 10 digitos en la visualizacion
      if(prevVal.length >= 10){
        this.lastEvent = event;
        return;
      }
      //Si el ultimo digito es un numero, se concatena el resultado
      prevVal += event;
      this.actionsHistory[this.actionsHistory.length - 1] = prevVal;
      this.content = prevVal;
    //CASO 3: La tecla es la operacion '='
    }else if (event === "="){ 
      //No se permite '=' como primer item
      if(!Boolean(this.actionsHistory)){
        return;
      }
      //Solo se permite "=" si la lista es impar y hay 3 elementos a más
      if(this.actionsHistory.length % 2 == 1 && this.actionsHistory.length > 1){
        const result = this.getResult(this.actionsHistory);
        this.content = this.isIntegerString(result.toString()) ? result.toString() : result.toFixed(2);
      }
    //CASO 1: La tecla es el reset
    }else if (event === "C"){
      this.actionsHistory = [];
      this.content = "";
    }
    this.lastEvent = event;
  }
  getResult(operations: string[]): number {
    let result = Number(operations[0]);
    for(let i = 2; i < operations.length; i+=2){
      const prevOperator = operations[i - 1];
      if(prevOperator === "+"){
        result = result + Number(operations[i]);
      }else if (prevOperator === "-"){
        result = result - Number(operations[i]);
      }else if (prevOperator === "x"){
        result = result * Number(operations[i]);
      }else{
        result = result / Number(operations[i]);
      }
    }
    return result;
  }
  /**
   * Verify key is and operation "+", "-","x" or "÷"
   */
  verifyIsOperation(operation: string) : boolean {
    const operations = ["+", "-", "x", "÷"];
    return operations.includes(operation);
  }
  /**
   * Verify value es a number or a point
   */
  isNumberOrPoint(value: string) : boolean {
    return !isNaN(+value) || value === ".";
  }
  /**
   * Get last element of array
   */
  getLastValue(history: string[]) : string {
    return history[history.length - 1];
  }
  /**
   * Verify a string represents an integer
   */
  isIntegerString(input: string): boolean {
    return /^-?\d+$/.test(input);
  }
}
