import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MptNavbar } from './ui/nav/nav';
import { MptDarkModeToggle } from './ui/theming/dark-mode/dark-mode-toggle';
import { MptThemePicker } from './ui/theming/picker/theme-picker';

@Component({
  imports: [ RouterModule,
    RouterOutlet,
    MptDarkModeToggle,
    MptNavbar,
    MptThemePicker],
  selector: 'mpt-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'mpt-test';
}
