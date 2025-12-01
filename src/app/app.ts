import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { MptNavbar } from './ui/nav/nav';
import { MptDarkModeToggle } from './ui/theming/dark-mode/dark-mode-toggle';
import { MptThemePicker } from './ui/theming/picker/theme-picker';

@Component({
  imports: [NxWelcome, RouterModule,
    RouterOutlet,
    MptDarkModeToggle,
    MptNavbar,
    MptThemePicker],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'mpt-test';
}
