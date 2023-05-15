import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  constructor(private router: Router) {}

  ngOnInit() {
    this.showSlides();
  }

  goHome() {
    this.router.navigate(['/']);
  }

  showSlides() {
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;

    setInterval(() => {
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      slides[slideIndex - 1].style.display = "block";
    }, 10000);
  }
}
