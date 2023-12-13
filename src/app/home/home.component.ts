import { Component, OnInit } from '@angular/core';
import { UserService } from '../serivce/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController  } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  connectionSectionBool: boolean = false;
  inscriptionSectionBool: boolean = false;
  messageConnection!: string;
  messageErreur!: string;
  onLoaded: boolean = false;

  ngOnInit() {
    return true;
  }

  connectionUser = this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })
  clickConnection(){
    this.connectionSectionBool = !this.connectionSectionBool;
  }
  clickInscription(){
    this.inscriptionSectionBool = !this.inscriptionSectionBool;
  }
 
  sendConnectionUser() {
    const loading =  this.presentLoading("Chargement en cours");
    const user = {
      email: this.connectionUser.value.email,
      password: this.connectionUser.value.password,
    }

    if (this.connectionUser.valid && user.email != null && user.password != null) {
      this.user.connexionUser(user.email, user.password).subscribe(data => {

        this.messageConnection = data.message;
        this.alertMessage(data.message);
      }, err => {
        this.onLoaded = false;
        this.messageErreur = err.message;
        this.alertMessage(this.messageErreur);
      });
    }
  }

  async alertMessage(message: string){
    const alert =  this.alertController.create({
      message: message,
      buttons: ['ok'],
      htmlAttributes: {
        'aria-label': 'alert dialog',
      },
    });
    (await alert).present()
  }
  async presentLoading(message: string) {
    const loading = await this.loadingController.create({
      message: message,
      spinner: 'circular', // Vous pouvez choisir un type de spinner différent si nécessaire
      translucent: true,
      cssClass: 'custom-loading-class', // Vous pouvez ajouter des classes CSS personnalisées si nécessaire
    });
  
    await loading.present();
  }


  constructor(private user: UserService, private fb: FormBuilder, private alertController: AlertController, private loadingController: LoadingController) { }
}
