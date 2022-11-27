import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models';
import { FirebaseauthService } from '../services/firebaseauth.service';
import { FirestoreService } from '../services/firestore.service';
import { PopoverController, IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

 
  public newUser: User = {
    uid: '',
    rol:  '',
    nombres: '',
    apellidos: '',
    tipoDocumento: '',
    ndocumento: '',
    email: '',
    telefono: 0,
    programa: '',
    foto: '../../../assets/perfil-defaul.png',
    puntoAcomulado: 0,
    puntoTotal: 0,
  };

  path = 'UserEstudiantes';
  uid='';

  public constructor(public firebaseauthService: FirebaseauthService,
              public firestoreService: FirestoreService,
              public router: Router,
              public popoverController: PopoverController) {

                this.firebaseauthService.stateAuth().subscribe(res =>{
                  if (res !== null) {
                    this.uid =res.uid;
                    this.getInfo(this.uid);
                  }else{
                    this.router.navigate(['/login']);
                  }
                });
              }




  async ngOnInit() {
  }

  private getInfo(uid: string){
    this.firestoreService.getDoc<User>(this.path, uid).subscribe(res =>{
      this.newUser = res;
    });
  } 


  //Aqui comienza el carrusel de imagenes

  /**
   * @private
   * @property slides
   * @type {IonSlides}
   * @memberof HomePage
   */
   @ViewChild('slides') ionSlides: IonSlides;


   /**
    * @public
    * @property disablePreviousSlideButton
    * @type {boolean}
    * @memberof HomePage
    */
   public disablePreviousSlideButton = false;
 
 
   /**
    * @public
    * @property disableNextSlideButton
    * @type {boolean}
    * @memberof HomePage
    */
   public disableNextSlideButton = false;
 
   /**
    * @public
    * @property slideConfig
    * @type {*}
    * @memberof HomePage
    */
   public slideConfig = {
     initialSlide: 0,
     slidesPerView: 1,
     loop: true,
     autoplay:true,
     grabCursor: true,
     allowSlideNext: true,
     allowSlidePrev: true,
     allowTouchMove: true,
     direction: 'horizontal',
     speed: 750,
     scrollbar: true
   };
 
 
   /**
    * @public
    * @property slideDeck
    * @type {Array<{ id: number, image: string, caption: string}>}
    * @memberof HomePage
    */
   public slideDeck: Array<{image: string}> = [
     {
       image: '/assets/slides/image-1.jpeg'
     },
     {
       image: '/assets/slides/image-2.jpeg',
     },
     {
       image: '/assets/slides/image-3.jpeg',
     }
   ];






   //----------------------


  /**
   * @public
   * @method runCheckForStateOfSlideshow
   * @description       Determines the beginning/end slides
   * @returns {none}
   * @memberof HomePage
   */
  public runCheckForStateOfSlideshow(): void {
    this.determineSlideState(this.ionSlides,
                             this.disablePreviousSlideButton,
                             this.disableNextSlideButton);
  }


  /**
   * @public
   * @method advanceToNextSlide
   * @description     Advances to the next slide in the collection within the <ion-slides> collection
   * @returns {none}
   * @memberof HomePage
   */
  public advanceToNextSlide(): void {
    this.ionSlides
    .slideNext(500)
    .then((e) => {
      this.determineSlideState(this.ionSlides, 
                                  this.disablePreviousSlideButton,
                                  this.disableNextSlideButton);
    });
  }


  /**
   * @public
   * @method revertToPreviousSlide
   * @description     Advances to the previous slide in the collection within the <ion-slides> collection
   * @returns {none}
   * @memberof HomePage
   */
  public revertToPreviousSlide(): void {
    this.ionSlides
    .slidePrev(500)
    .then(() => {
      this.determineSlideState(this.ionSlides,
                                  this.disablePreviousSlideButton,
                                  this.disableNextSlideButton);
    });
  }


  /**
   * @public
   * @method determineSlideState
   * @param {IonSlides} ionSlides
   * @param {boolean} disablePreviousSlideButton
   * @param {boolean} disableNextSlideButton
   * @memberof HomePage
   */
  public determineSlideState(ionSlides: IonSlides, 
                             disablePreviousSlideButton: boolean,
                             disableNextSlideButton: boolean): void {
    this.determineIfEndOfSlideshowHasBeenReached(ionSlides, disableNextSlideButton);
    this.determineIfStartOfSlideshowHasBeenReached(ionSlides, disablePreviousSlideButton);
  }


  /**
   * @public
   * @method determineIfEndOfSlideshowHasBeenReached
   * @param {IonSlides} ionSlides
   * @param {boolean} disableNextSlideButton
   * @description   Determines if the <ion-slides> component is currently at the last index of its collection
   *                and disables the next slide button if it is
   * @returns {none}
   * @memberof HomePage
   */
  public determineIfEndOfSlideshowHasBeenReached(ionSlides: IonSlides, 
                                                 disableNextSlideButton: boolean): void {
    ionSlides.isEnd().then((val: boolean) => {
      val ? disableNextSlideButton = true : disableNextSlideButton = false;
    });
  }


  /**
   * @public
   * @method determineIfStartOfSlideshowHasBeenReached
   * @param {IonSlides} ionSlides
   * @param {boolean} disablePreviousSlideButton
   * @description   Determines if the <ion-slides> component is currently at the zero index of its array
   *                and disables the previous slide button if it is
   * @returns {none}
   * @memberof HomePage
   */
  public determineIfStartOfSlideshowHasBeenReached(ionSlides: IonSlides, disablePreviousSlideButton: boolean): void {
    ionSlides.isBeginning().then((val: boolean) => {
      val ? disablePreviousSlideButton = true : disablePreviousSlideButton = false;
    });
  }


}
