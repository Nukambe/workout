import { Component, Input } from '@angular/core';
import { Set } from '../../models/Set.model';

@Component({
  selector: 'app-create-set',
  standalone: true,
  imports: [],
  templateUrl: './create-set.component.html',
  styleUrl: './create-set.component.css'
})
export class CreateSetComponent {
  @Input() set!: Set;

}
