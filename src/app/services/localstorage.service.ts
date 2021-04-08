import { Injectable } from '@angular/core';
import { Observable, Subject, Subscriber, forkJoin } from "rxjs";
import { shareReplay, switchMap, startWith, map } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';

interface Note {
  title: string;
  content: string;
  color: string;
  date: Date;
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
    db.createObjectStore("notes", { keyPath: "date" });
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

  public addNote(title: string, content: string, color: string, date: Date): void{

    this.db$.pipe(
      switchMap(
        (db) =>
          new Observable(subscriber => {
            let transaction = db.transaction("notes", "readwrite");
            transaction.objectStore("notes").add({ title: title, content: content, color: color, date: date });

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

  public addInit(): void{

    this.db$.pipe(
      switchMap(
        (db) =>
          new Observable(subscriber => {
            let transaction = db.transaction("notes", "readwrite");
            let title = "first content init"
            let content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            let color = "rgb(200, 200, 200)"
            let date = new Date(2018, 11, 24, 10, 33, 30, 0);
            transaction.objectStore("notes").add({ title: title, content: content, color: color, date: date });
            title = "second content init"
            content = "-"
            color = "rgb(200, 200, 200)"
            date = new Date(2021, 2, 3, 11, 0, 0, 0);
            transaction.objectStore("notes").add({ title: title, content: content, color: color, date: date });
            title = "second content init"
            content = "-"
            color = "rgb(200, 200, 200)"
            date = new Date(2018, 11, 3, 11, 0, 0, 0);
            transaction.objectStore("notes").add({ title: title, content: content, color: color, date: date });


            transaction.oncomplete = () => {
              transaction = null;
              this.update$.next();
              subscriber.complete();
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
