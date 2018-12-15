import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, LoadingController, NavController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ListaDenunciasProvider } from '../../providers/lista-denuncias/lista-denuncias';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';


/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({ 
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  //form value
  public email: string;
  public motivo: string;


  // photo config
  public fotobase64: string = "";
  public file_content: Object;
  public file_json: Blob;


  // Form config
  public  form: FormGroup;
  public  formData : FormData = new FormData();


  constructor(
    private  ListaDenuncias: ListaDenunciasProvider,
    private  camera: Camera,
    private  tost: ToastController,
    private  alertCtrl: AlertController,
    private  navCtrl : NavController,
    private  loading : LoadingController,
    private  formBuilder: FormBuilder,
    private  navParams: NavParams) {

      this.createForm();
      this.email = this.navParams.get('email');
     
  }

  capturaFoto() {
 
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit:true
        }
 return this.camera.getPicture(options).then(imageData =>{
        this.fotobase64 = 'data:image/jpeg;base64,'+imageData;

    }).catch(() => this.mensagemTost('Erro ao tentar acessar camera!',3000))
  }



createForm(){
  this.form = this.formBuilder.group({
    email: [this.email, Validators.required],
    motivo_ocorrencia: [this.motivo,Validators.required]
  });
}


createFomData(){

  this.file_content = {data_de_envio: new Date().getTime(),imagem: this.fotobase64}
  this.file_json = new Blob([JSON.stringify(this.file_content)], {type :'application/json'}) 
  
  // settar valores no formulario 
  this.formData.append("email", this.email);
  this.formData.append("motivo_ocorrencia", this.motivo);
  this.formData.append('imagem', this.file_json ,'foto1.json');

}



enviar(){

  if(this.fotobase64===""){
    this.mensagemTost('você deve tirar uma foto',3000)
    return;
  }

 let loading = this.loading.create({  
      content: 'Aguarde um momento...',
      spinner:'crescent'})
      loading.present();
    
      this.createFomData()

this.ListaDenuncias.adiciona(this.formData).then(()=> {
      loading.dismiss();
      this.navCtrl.setRoot(HomePage)
      this.mensagemAlert('Sucesso!','Sua ocorrencia foi registrada!')
    })
    .catch(()=>  {
      loading.dismiss();
      this.mensagemTost('Sua ocorrencia Não foi registrada',3000)
    })
}



  mensagemTost(msn:string,time:number){
   return this.tost.create({
        message: msn,
        duration: time,
        position: 'top'
      }).present()
  }


  mensagemAlert(titulo: string,mensagem:string){
   this.alertCtrl.create({
    title: titulo,
    message:mensagem,
    buttons: ['ok']
    }).present()
  }

}
