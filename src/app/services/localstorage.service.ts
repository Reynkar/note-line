import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber, forkJoin } from "rxjs";
import { shareReplay, switchMap, startWith, map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

interface Note {
  content: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})

export class LocalstorageService {

  constructor() { }

  public db$: Observable<IDBDatabase>;
  public readonly update$ = new Subject<void>();
  public notes$: Observable<Note[]>;

  public init(): void {
    this.db$ = new Observable<IDBDatabase>(subscriber => {
      const openRequest = indexedDB.open("notesDB");
      openRequest.onupgradeneeded = () =>
        this.createDB(openRequest.result);
      openRequest.onsuccess = () => {
        subscriber.next(openRequest.result);
        subscriber.complete();
      };
    }).pipe(shareReplay({ refCount: false, bufferSize: 1 }));
  }

  public createDB(db: IDBDatabase): void {
    db.createObjectStore("notes", { keyPath: "content" });
  }

  public updatingNotes(): void {
    this.notes$ = this.update$.pipe(
      startWith(undefined as any),
      switchMap(() =>
        this.db$.pipe(
          switchMap(
            (db) =>
              new Observable<Note[]>((subscriber) => {
                let transaction = db.transaction("notes", "readonly");
                const request = transaction
                  .objectStore("notes")
                  .getAll();

                transaction.oncomplete = () => {
                  transaction = null;
                  subscriber.next(request.result as Note[]);
                  subscriber.complete();
                };

                return () => transaction?.abort();
              })))));
  }

  public addNote(content: string, color: string): void{

    this.db$.pipe(
      switchMap(
        (db) =>
          new Observable(subscriber => {
            let transaction = db.transaction("notes", "readwrite");
            transaction.objectStore("notes").add({ content: content, color: color });

            transaction.oncomplete = () => {
              transaction = null;
              this.update$.next();
              subscriber.complete();
              alert("Successful upload!");
            };

            transaction.onerror = (error) => {
              transaction = null;
              subscriber.error(error);
              alert("An error has occured, check the console for more detail!");
            };

            return () => transaction?.abort();
          })
      )
    ).subscribe({
        error: (error) =>
          console.log("An error has occured during uploading a note: ", error),
    });
  }
}
