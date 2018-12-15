import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { ListaDenunciasProvider } from '../../providers/lista-denuncias/lista-denuncias';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private email :string = 'rafaeldocarmo2010@gmail.com'
  public denuncias :any=[];


  constructor(public navCtrl: NavController,
              public tost: ToastController,
              public ListaDenuncias :ListaDenunciasProvider) {
    this.listar(this.email)
    }

 listar(email){
    this.ListaDenuncias.lista(email).then(date=>{
      this.denuncias = date;
    }).catch(()=> this.mensagemTost('Não foi possível obter lista!',3000));
  }



  mensagemTost(msn:string,time:number){
    return this.tost.create({
         message: msn,
         duration: time,
         position: 'top'
       }).present()
   }
 

 pageCadastro(){
    this.navCtrl.push(CadastroPage.name,{email:this.email})
  }

}
