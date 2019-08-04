import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

// import { BehaviorSubject } from 'rxjs';

import {
  ISignParams,
} from 'src/interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SignService {

  private isSignedIn = false;
  // private readonly statusChanged$ = new BehaviorSubject<IUser>(null);

  constructor(
    private readonly afAuth: AngularFireAuth,
  ) {}

  public get isUserLoggedIn() {
    return this.isSignedIn;
  }

  public get userStatusChanged$() {
    return this.afAuth.authState;
    // return this.statusChanged$.asObservable();
  }

  public signUser(signParams?: ISignParams) {
    if (this.isSignedIn) {
      this.signOut();
    }

    this.signIn(signParams);
  }

  private signOut() {
    this.afAuth.auth.signOut();
  }

  private signIn({
    email,
    password,
    name,
  }: ISignParams) {
    // this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential) {
          userCredential.user.updateProfile({
            displayName: name,
          });
        }
      });
  }


}
