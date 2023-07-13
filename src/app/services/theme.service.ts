import { Injectable, Renderer2, RendererFactory2  } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private white: string = '#ffffff';
  private black: string = '#141313';
  private renderer: Renderer2;
  private _themeDark: Subject<boolean> = new Subject<boolean>();
  isThemeDark = this._themeDark.asObservable();

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  setDarkTheme(isThemeDark: boolean) {
    this._themeDark.next(isThemeDark);

    if (isThemeDark) {
      console.log('Dark Used');
      this.updateThemeColors(this.black, this.white);
      localStorage.setItem('dark', 'true');
    } else {
      console.log('Light Used');
      this.updateThemeColors(this.white, this.black);
      localStorage.setItem('dark', 'false');
    }
  }

  private updateThemeColors(backgroundColor: string, textColor: string) {
    this.renderer.setStyle(document.body, 'background-color', backgroundColor);
    this.renderer.setStyle(document.body, 'color', textColor);
  }
}
