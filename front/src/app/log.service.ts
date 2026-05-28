import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type LogLevel = 'INFO' | 'WARN' | 'ERROR';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private readonly apiUrl = 'http://localhost:8080/api/logs';

  constructor(private http: HttpClient) { }

  /**
   * Envoie un log au backend Spring Boot.
   * @param level Le niveau d'importance
   * @param message La description de l'événement ou de l'erreur
   */
  sendLogToBackend(level: LogLevel, message: string): void {
    const payload = {
      level: level,
      message: message
    };

    this.http.post(this.apiUrl, payload).subscribe({
      error: (err) => {
        console.error("Échec de l'envoi du log au serveur", err);
      }
    });
  }
}