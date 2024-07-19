import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public now = new Date();
  public date = this.now.getFullYear();
  public datetime = this.now.toLocaleString();
}
