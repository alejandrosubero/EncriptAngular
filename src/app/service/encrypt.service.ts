import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  key = '';
  keyEncryptkey = '8439db0f0c86d30e9bc6d43743e73b605008160b9af9cf973ead223644a3fa5c';

  constructor(private http: HttpClient) {
    this.getKey();
  }


  decryptKey(cryptMessage: string): string {
    const bytes = CryptoJS.AES.decrypt(cryptMessage, this.keyEncryptkey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }


  // encrypt message
  async encrypt(message: string): Promise<string> {
    let key = '';
    await this.get().subscribe((x: string) => key = x);
    let keyPhase = this.decryptKey(this.key);

    if (keyPhase !== '') {
      const ciphertext = CryptoJS.AES.encrypt(message, keyPhase).toString();
      return ciphertext;
    }
  }

  // decrypt message
  async decrypt(cryptMessage: string): Promise<string> {
    let key = '';
    await this.get().subscribe((x: string) => key = x);
    let keyPhase = this.decryptKey(this.key);
    if (keyPhase !== '') {
      const bytes = CryptoJS.AES.decrypt(cryptMessage, keyPhase);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText;
    }
  }

  // encrypt Object
  async encryptObject(data): Promise<string> {
    let key = '';
    await this.get().subscribe((x: string) => key = x);
    let keyPhase = this.decryptKey(this.key);
    if (keyPhase !== '') {
      const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), keyPhase).toString();
      return ciphertext;
    }
  }

  // decrypt Object
  async decryptObject(cryptMessage: string): Promise<string> {
    let key = '';
    await this.get().subscribe((x: string) => key = x);
    let keyPhase = this.decryptKey(this.key);
    if (keyPhase !== '') {
      const bytes = CryptoJS.AES.decrypt(cryptMessage, keyPhase);
      const originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return originalText;
    }
  }


  enviarMensaje(body: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8888/api/valor', body, { headers, observe: 'response' });
  }


  getKey(): void {
    this.get().subscribe((x: string) => {
      this.key = x;
      console.log('key', this.key);
    });
  }


  get(): Observable<any> {
    //  return this.http.get('http://localhost:8888/api/passphrase');
    return this.http.post('http://localhost:8888/api/passphrase', null);
  }


}
