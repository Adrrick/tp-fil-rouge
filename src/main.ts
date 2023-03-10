import { importProvidersFrom, isDevMode } from "@angular/core";
import { provideFirebaseApp } from "@angular/fire/app";
import { provideAuth } from "@angular/fire/auth";
import { provideFirestore } from "@angular/fire/firestore";
import { provideStorage } from "@angular/fire/storage";
import { bootstrapApplication } from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { AppComponent } from "./app/app.component";
import { environment } from "./environments/environment";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000',
      })
    ),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
}).catch((err) => console.error(err));