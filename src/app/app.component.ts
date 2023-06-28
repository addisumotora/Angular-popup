import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'popup';
  selectedOption: string = '';
  showPopup = false;
  options: string[] = [];

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const cachedOptions = this.cookieService.get('category');
    if (cachedOptions) {
      this.options = JSON.parse(cachedOptions);
    }
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  openPopup() {
    if (this.options.length === 0) {
      this.fetchCategories();
    }
    this.showPopup = true;
    console.log(this.options)
  }

  closePopup() {
    this.showPopup = false;
  }

  fetchCategories() {
    this.http
      .get<string[]>('https://fakestoreapi.com/products/categories')
      .pipe(
        tap((response) => {
          this.options = response;
          this.cookieService.set(
            'category',
            JSON.stringify(this.options)
          );
        })
      )
      .subscribe((category) => {
        this.options = category
      });
  }  
}
